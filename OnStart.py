import sys
import sqlite3
import datetime

conn=sqlite3.connect("tasks.db")
cursor=conn.cursor()


machine_ID=int(sys.argv[1])
duration=int(sys.argv[2])
uid=sys.argv[3]

sql_string="INSERT INTO `Machines` VALUES (?,?,?,?)"
now_dt=datetime.datetime.utcnow()
cursor.execute(sql_string,(machine_ID,str(now_dt),now_dt+datetime.timedelta(minutes=duration),uid))
conn.commit()
print("Done")
