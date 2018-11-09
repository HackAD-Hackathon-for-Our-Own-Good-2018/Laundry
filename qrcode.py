# Python 2.x program to generate QR code 
from qrtools import QR 

import os 

def write(building,washer):
    string = building+" : "+washer
    u = unicode(string, "utf-8")

    my_QR = QR(data = u, pixel_size=10) 
    my_QR.encode() 

# command to move the QR code to the desktop 
    os.system("sudo mv " + my_QR.filename + " ~/Desktop") 

def read():
    # Python 2.x program to Scan and Read a QR code 
    my_QR = QR(filename = "/home/jumana/Desktop/first.png") 

    # decodes the QR code and returns True if successful 
    my_QR.decode() 

    val = my_QR.data

    # prints the data 
    print val  


write("A6A","Washer 1")
read()