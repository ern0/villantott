#!/usr/bin/python3

import datetime
import sqlite3
from urllib.request import urlopen

DB = "vill.db"
URL = "https://origo.hu/"
CACHE = "data/"


class Vill:

    def main(self):

        conn = sqlite3.connect(DB)
        self.cursor = conn.cursor()
        self.create_table()
        
        self.session = str(datetime.date.today())
        
        self.load_page_from_cache()
        if self.page is None:
            self.fetch_page()
            self.save_page_to_cache()
            
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
        
        lines = self.page.split("\n")
        for i in range(2):
            print(lines[i])

if __name__ == "__main__":
    (Vill()).main()
