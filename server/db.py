import getpass
import psycopg2
from datetime import datetime, timezone

conn = psycopg2.connect(f"dbname=mess user={getpass.getuser()}")


def getUserInfoFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT roll_no, username, email, role FROM users WHERE email=%s LIMIT 1",(email,))        
    res = cur.fetchone()
    cur.close()
    return res

def getUserMessFromEmail(email, role):
    cur = conn.cursor() 

    if role=='student':
        cur.execute("SELECT messname, mess_ID FROM mess WHERE mess_ID = (SELECT mess_ID FROM students WHERE roll_no = (SELECT roll_no FROM users WHERE email=%s))",(email,))        
    else:
        cur.execute("SELECT messname, mess_ID FROM mess WHERE mess_ID = (SELECT mess_ID FROM managers WHERE manager_ID = (SELECT roll_no FROM users WHERE email=%s))",(email,))        

    res = cur.fetchone()
    return res

def getMessMealDetails(messId):
    cur = conn.cursor() 
    cur.execute("select ms.mealname, m.dayofweek, m.time from meals ms, mess_meals m where m.mealid = ms.id AND m.mess_ID=%s",(messId,))        
    res = cur.fetchall()
    return res

def getMessDetails(messId):
    cur = conn.cursor() 
    cur.execute("select m.messname, u.username from mess m, users u, managers mn where mn.manager_id=u.roll_no and mn.mess_id=m.mess_id and m.mess_id=%s",(messId,))        
    res = cur.fetchall()
    return res

def getMessStudentCount(messId):
    cur = conn.cursor() 
    cur.execute("select count(roll_no) from students where mess_id=%s",(messId,))        
    res = cur.fetchall()
    return res[0]

def getAnnouncements(messId):
    cur = conn.cursor() 
    cur.execute("SELECT u.username, u.role, a.announcement, a.posted_at FROM users u, announcements a WHERE a.roll_no IN (SELECT manager_ID FROM managers WHERE mess_ID=%s) AND a.roll_no=u.roll_no",(messId,))        
    res = cur.fetchall()
    cur.close()
    return res


def getMesses():
    cur = conn.cursor() 
    cur.execute("select mess_id, messname from mess where mess_id in (select mess_id from managers)") #Return all messes that currently have managers.
    res = cur.fetchall()
    cur.close()
    return res

def doesUserExist(email, password):

    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(SELECT 1 FROM users WHERE email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    cur.close()
    return res[0]

# to be updated
def updateMenu(meal,mess_id):
    cur = conn.cursor()       
    # cur.execute("UPDATE MESS_MEALS SET name=%s where mess_ID=%s and dayofweek=%s and time=%s",(meal[0],mess_id,meal[1],meal[2]))
    # conn.commit()
    cur.close()

def add_complaint(roll_no,mess_id,complaint):
    cur = conn.cursor()
    try:     
        cur.execute('INSERT INTO complaints(complaint_description,mess_ID,roll_no) values(%s,%s,%s)',(complaint,mess_id,roll_no))
        conn.commit()
        cur.close()
        return 'Success'
    except:
        cur.close()
        return 'Failed'