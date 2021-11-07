import getpass
import psycopg2
from datetime import datetime, timezone

conn = psycopg2.connect(f"dbname=mess user={getpass.getuser()}")


def getUserInfoFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT rollno, username, email, role FROM users WHERE email=%s LIMIT 1",(email,))        
    res = cur.fetchone()
    return res

def getUserMessFromEmail(email):
    cur = conn.cursor() 
    cur.execute("SELECT messname, messid FROM mess WHERE messid = (SELECT messid FROM user_mess WHERE rollno = (SELECT rollno FROM users WHERE email=%s))",(email,))        
    res = cur.fetchone()
    return res

def getMessDetails(messId):
    cur = conn.cursor() 
    cur.execute("SELECT name, dayofweek, time FROM mess_meals WHERE messid=%s ORDER BY dayofweek;",(messId,))        
    res = cur.fetchall()
    return res

def getAnnouncements(messId):
    cur = conn.cursor() 
    cur.execute("SELECT u.username, u.role, a.announcement FROM users u, announcements a WHERE a.rollno IN (SELECT rollno FROM user_mess WHERE messid=%s) AND a.rollno=u.rollno",(messId,))        
    res = cur.fetchall()
    return res

def doesUserExist(email, password):

    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(SELECT 1 FROM users WHERE email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    return res[0]

