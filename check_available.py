import sys
import psycopg2
try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse
import os


url=urlparse(os.environ['DATABASE_URL'])
#url = urlparse("postgres://vteynwmfbgkmrk:4c42cad3159fafc6dafb1e14f1c8654e60ea6097284e8e2cd60418cd0fdf26c7@ec2-54-83-27-162.compute-1.amazonaws.com:5432/dce9rsp8t7n6cm")
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

sql_string="SELECT machine_id FROM machines"
cursor.execute(sql_string)
rows=cursor.fetchall()
return_str=""
for row in rows:
    return_str+=str(row[0])+","

print(return_str[:-1])
sys.stdout.flush()