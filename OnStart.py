import sys
import psycopg2
import urllib.parse as urlparse
# try:
#     from urllib.parse import urlparse
# except ImportError:
     # from urlparse import urlparse
import datetime
import os
<<<<<<< HEAD
url = urlparse.urlparse(os.environ['DATABASE_URL'])
# url = urlparse.urlparse("postgres://vteynwmfbgkmrk:4c42cad3159fafc6dafb1e14f1c8654e60ea6097284e8e2cd60418cd0fdf26c7@ec2-54-83-27-162.compute-1.amazonaws.com:5432/dce9rsp8t7n6cm")
=======

print("We are now in python")

url=urlparse.urlparse(os.environ['DATABASE_URL'])
#url = urlparse.urlparse("postgres://vteynwmfbgkmrk:4c42cad3159fafc6dafb1e14f1c8654e60ea6097284e8e2cd60418cd0fdf26c7@ec2-54-83-27-162.compute-1.amazonaws.com:5432/dce9rsp8t7n6cm")
>>>>>>> 46839e8d5b9d85f8e90460e9f1630568208d8ff2
dbname = url.path[1:]
user = url.username
password = url.password
host = url.hostname
port = url.port


conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
            )

cursor=conn.cursor()


machine_ID=int(sys.argv[1])
duration=int(sys.argv[2])
uid=sys.argv[3]
print(machine_ID, duration, uid)

print(str(machine_ID)+"MACHINE ID")
print(str(duration)+"This is the duration")

sql_string="INSERT INTO machines VALUES (%s,%s,%s,%s)"
now_dt=datetime.datetime.utcnow()
cursor.execute(sql_string,(machine_ID,str(now_dt),now_dt+datetime.timedelta(minutes=duration),uid))
conn.commit()

print("Recieved data")
sys.stdout.flush()
