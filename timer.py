import sqlite3
import datetime
import smtplib
import email.utils
from email.mime.text import MIMEText


conn=sqlite3.connect("tasks.db")
cursor=conn.cursor()

def send_email(email_recieve):

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

def onstart(machine_ID,duration,uid):
    sql_string="INSERT INTO `Machines` VALUES (?,?,?,?)"
    now_dt=datetime.datetime.now()
    cursor.execute(sql_string,(machine_ID,str(now_dt),now_dt+datetime.timedelta(minutes=duration),uid))
    conn.commit()


def delete_row(Machine_ID):
    cursor.execute("DELETE FROM `Machines` WHERE `MachineID`=?", str(Machine_ID))
    conn.commit()

def scheduler_check():
    sql_string="SELECT * FROM `Machines`"
    cursor.execute(sql_string)
    rows=cursor.fetchall()
    for row in rows:
        if datetime.datetime.strptime(row[2],"%Y-%m-%d %H:%M:%S.%f")<datetime.datetime.now():
            send_email(row[3])
            delete_row(row[0])

scheduler_check()