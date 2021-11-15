import getpass
import psycopg2
from datetime import datetime, timezone

conn = psycopg2.connect(f"dbname=mess user={getpass.getuser()}")


def getUserInfoFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT rollno, username, email, role FROM users WHERE email=%s LIMIT 1",(email,))        
    res = cur.fetchone()
    cur.close()
    return res

def getUserMessFromEmail(email, role):
    cur = conn.cursor() 

    if role=='student':
        cur.execute("SELECT messname, messid FROM mess WHERE messid = (SELECT messid FROM student_mess WHERE rollno = (SELECT rollno FROM users WHERE email=%s))",(email,))        
    else:
        cur.execute("SELECT messname, messid FROM mess WHERE messid = (SELECT messid FROM managers WHERE managerid = (SELECT rollno FROM users WHERE email=%s))",(email,))        

    res = cur.fetchone()
    return res

def getMessDetails(messId):
    cur = conn.cursor() 
    cur.execute("select ms.mealname, m.dayofweek, m.time from meals ms, mess_meals m where m.mealid = ms.id AND m.messid=%s",(messId,))        
    res = cur.fetchall()
    return res

def getAnnouncements(messId):
    cur = conn.cursor() 
    cur.execute("SELECT u.username, u.role, a.announcement, a.postedat FROM users u, announcements a WHERE a.rollno IN (SELECT managerid FROM managers WHERE messid=%s) AND a.rollno=u.rollno",(messId,))        
    res = cur.fetchall()
    cur.close()
    return res

def doesUserExist(email, password):

    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(SELECT 1 FROM users WHERE email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    cur.close()
    return res[0]

def updateMenu(meal,mess_id):
    cur = conn.cursor()       
    cur.execute("UPDATE MESS_MEALS SET name=%s where messid=%s and dayofweek=%s and time=%s",(meal[0],mess_id,meal[1],meal[2]))
    conn.commit()
    cur.close()