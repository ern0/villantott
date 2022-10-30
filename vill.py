#!/usr/bin/env python3

import sys
import datetime
import sqlite3
from urllib.request import urlopen
import re

DB = "vill.db"
URL = "https://origo.hu/"
CACHE = "data/"


class Vill:

    PATTERNS = [
        "melleit",
        "meztelenül", "félmeztelenül",
        "mutatjuk.meztelen",
        "mutatjuk.a.meztelen",
        "szexi", "szuperszexi",
        "meztelenül.mutatta",
        "meztelenül.pózolt",
        "tökéletes.combját",
        "tökéletes.combjait",
        "tökéletes.alakját",
        "tökéletes.melleit",
    ]

    def main(self):

        conn = sqlite3.connect(DB)
        self.cursor = conn.cursor()
        self.create_table()

        if len(sys.argv) < 2:
            self.session = str(datetime.date.today())
            download = True
        else:
            self.session = sys.argv[1]
            self.session = self.session.replace(CACHE, "")
            self.session = self.session.replace(".html", "")
            download = False

        self.load_page_from_cache()
        if self.page is None and download:
            self.fetch_page()
            self.save_page_to_cache()
        
        if self.page is None:
            print("fail")
            quit()

        print(self.session + ":")
        self.proc_page()

    def create_table(self):

        try:
            self.cursor.execute("""
          		create table items (
              		session text,
              		title text
          		);  
      		""")
        except sqlite3.OperationalError:
            pass

    def get_cache_filename(self):

        fnam = CACHE + "/" + self.session + ".html"
        fnam = fnam.replace("//", "/")

        return fnam

    def load_page_from_cache(self):

        fnam = self.get_cache_filename()

        try:
            file = open(fnam, "r")
        except FileNotFoundError:
            self.page = None
            return

        self.page = file.read()
        file.close()

    def save_page_to_cache(self):

        fnam = self.get_cache_filename()

        file = open(fnam, "wt")
        file.write(self.page)
        file.close()

    def fetch_page(self):

        response = urlopen(URL)
        bytes = response.read()
        self.page = bytes.decode("utf-8")

    def proc_page(self):
    
        self.regexp = re.compile(r'(<!--.*?-->|<[^>]*>)')

        lines = self.page.split("\n")
        for line in lines:

            result = self.split_line(line)
            if result is None:
                continue
            (prepared, text,) = result

            for pattern in self.PATTERNS:
                pattern = "." + pattern + "."
                if pattern not in prepared:
                    continue

                print(" - " + text)
                break

    def split_line(self, line):

        if "{{" in line:
            return None

        text = self.regexp.sub("", line).strip()
        if text == "":
            return None

        prepared = "." + text.replace(" ", ".") + "."
        prepared = prepared.lower()
        
        return (prepared, text,)

if __name__ == "__main__":
    (Vill()).main()
