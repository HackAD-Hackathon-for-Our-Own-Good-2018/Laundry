import smtplib
import sys
import email.utils
from email.mime.text import MIMEText

email_recieve=sys.argv[1]

msg=MIMEText("This is a reminder that your laundry has been completed. Please go pick it up.")
msg['From']=email.utils.formataddr(("Laundry","laundrynyuad@gmail.com"))
msg['Subject']="Laundry Notification"

email_send="laundrynyuad@gmail.com"
password="<~{z)s@H6k.aMh!b"

server=smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login(email_send,password)

server.sendmail(email_send,email_recieve,msg.as_string())
print("Done")
server.quit()