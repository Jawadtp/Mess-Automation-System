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

def getMessDetails(messId):
    cur = conn.cursor() 
    cur.execute("select ms.mealname, m.dayofweek, m.time from meals ms, mess_meals m where m.mealid = ms.id AND m.mess_ID=%s",(messId,))        
    res = cur.fetchall()
    return res

def getAnnouncements(messId):
    cur = conn.cursor() 
    cur.execute("SELECT u.username, u.role, a.announcement, a.posted_at FROM users u, announcements a WHERE a.roll_no IN (SELECT manager_ID FROM managers WHERE mess_ID=%s) AND a.roll_no=u.roll_no",(messId,))        
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

def get_complaints(mess_id):
    cur = conn.cursor()
    try:     
        cur.execute('SELECT complaint_id, complaint_description,roll_no FROM complaints WHERE mess_id = %s',(mess_id,))
        res = cur.fetchall()
        cur.close()
        return res
    except:
        cur.close()
        return 'Failed'

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

def update_complaint(complaint_id):
    cur = conn.cursor()
    try:
        cur.execute('UPDATE complaints SET status=1 where complaint_id = %s',(complaint_id,))
        conn.commit()
        cur.close()
        return 'Success'
    except:
        cur.close()
        return 'Failed'