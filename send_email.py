import smtplib
import sys

email_recieve=sys.argv[1]
msg=sys.argv[2]

email_send="taoprajjwal@gmail.com"
password="climacteric2@"

server=smtplib.SMTP('smtp.gmail.com',587)
server.starttls()
server.login(email_send,password)

server.sendmail(email_send,email_recieve,msg)
print("Done")
server.quit()