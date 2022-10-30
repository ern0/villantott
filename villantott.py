#!/usr/bin/python3

import sqlite3

DB="vill.db"

class Vill:
  
  def main(self):
    
    conn = sqlite3.connect(DB)
    self.cursor = conn.cursor()
    self.cursor.execute("""
        create table items (
						session integer,
						title text
				);  
		""")
    


if __name__ == "__main__":
  (Vill()).main()