import sys
machine_ID=sys.argv[1]
duration=sys.argv[2]
uid=sys.argv[3]

sql_string="INSERT INTO `Machines` VALUES (?,?,?,?)"
now_dt=datetime.datetime.utcnow()
cursor.execute(sql_string,(machine_ID,str(now_dt),now_dt+datetime.timedelta(minutes=duration),uid))
conn.commit()
