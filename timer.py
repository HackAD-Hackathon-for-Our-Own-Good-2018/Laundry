import psycopg2
import urllib.parse as urlparse
import datetime
import smtplib
import email.utils
from email.mime.text import MIMEText
import sys
import os

#url=urlparse.urlparse(os.environ['DATABASE_URL'])
url = urlparse.urlparse("postgres://vteynwmfbgkmrk:4c42cad3159fafc6dafb1e14f1c8654e60ea6097284e8e2cd60418cd0fdf26c7@ec2-54-83-27-162.compute-1.amazonaws.com:5432/dce9rsp8t7n6cm")
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

def send_email(email_recieve):
    print("Sending email to "+ email_recieve)
    msg = MIMEText("This is a reminder that your laundry has been completed. Please go pick it up.")
    msg['From'] = email.utils.formataddr(("Laundry", "laundrynyuad@gmail.com"))
    msg['Subject'] = "Laundry Notification"

    email_send = "laundrynyuad@gmail.com"
    password = "<~{z)s@H6k.aMh!b"

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_send, password)

    server.sendmail(email_send, email_recieve, msg.as_string())
    print("Done")
    server.quit()


def delete_row(Machine_ID):
    print(str(Machine_ID)+"Is getting deleted")
    cursor.execute("DELETE FROM machines WHERE machine_id=%s", str(Machine_ID))
    conn.commit()
    conn.close()

def scheduler_check():
    sql_string="SELECT machine_id, date_added, date_ended, user_id FROM public.machines"
    cursor.execute(sql_string)
    print(cursor)
    rows=cursor.fetchall()
    print(rows)
    for row in rows:
        print(row)
        if datetime.datetime.strptime(row[2],"%Y-%m-%d %H:%M:%S.%f")<datetime.datetime.utcnow():
            print("Getting deleted")
            send_email(row[3])
            delete_row(row[0])

scheduler_check()