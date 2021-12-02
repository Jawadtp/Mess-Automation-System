import getpass
from flask.globals import request
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
    cur.execute("select m.messname, u.username, u.email, m.feeslastcalculated from mess m, users u, managers mn where mn.manager_id=u.roll_no and mn.mess_id=m.mess_id and m.mess_id=%s",(messId,))        
    res = cur.fetchall()
    return res

def getMessStudentCount(messId):
    cur = conn.cursor() 
    cur.execute("select count(roll_no) from students where mess_id=%s",(messId,))        
    res = cur.fetchall()
    return res[0]

def addRegRequest(messId, rollno):
    cur = conn.cursor() 
    cur.execute("INSERT INTO reg_requests(roll_no, mess_id) VALUES (%s,%s)",(rollno, messId))        
    conn.commit()
    cur.close()
    return True

def getRegRequest(rollno):
    cur = conn.cursor() 
    cur.execute("select messname from mess where mess_id = (select mess_id from reg_requests where roll_no=%s)",(rollno,))        
    res = cur.fetchone()
    return res

def getAnnouncements(messId):
    cur = conn.cursor() 
    cur.execute("SELECT u.username, u.role, a.announcement, a.posted_at FROM users u, announcements a WHERE a.roll_no IN (SELECT manager_ID FROM managers WHERE mess_ID=%s) AND a.roll_no=u.roll_no ORDER BY posted_at DESC",(messId,))        
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

def get_complaints(mess_id):
    cur = conn.cursor()
    try:     
        cur.execute('SELECT complaint_id, complaint_description,roll_no,status FROM complaints WHERE mess_id = %s',(mess_id,))
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

def post_announcement(announcement,manager_id):
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO announcements (roll_no,announcement) VALUES (%s,%s)',(manager_id,announcement))
        conn.commit()
        cur.close()
        return 'Success'
    except:
        cur.close()
        return 'Failed'

def insert_leave_req(roll_no,start_date,end_date,reason):
    cur = conn.cursor()
    try:
        cur.execute('SELECT manager_id FROM managers where mess_id = (SELECT mess_id FROM students WHERE roll_no = %s)',(roll_no,))

        manager_id = cur.fetchone()
        # print(manager_id[0])

        cur.execute('INSERT INTO leave_requests (start_date,end_date,reason,roll_no,manager_id) VALUES (%s,%s,%s,%s,%s)',(start_date,end_date,reason,roll_no,manager_id[0]))

        conn.commit()
        cur.close()
        print('Success')
        return 'Success'
    except:
        cur.close()
        print('Failed')
        return 'Failed'

def get_leave_requests(manager_id):
    cur = conn.cursor()
    try:
        cur.execute('SELECT roll_no,start_date,end_date,reason,status FROM leave_requests WHERE manager_id = %s',(manager_id,))
        requests = cur.fetchall()
        conn.commit()
        cur.close()
        return requests
    except:
        cur.close()
        return 'Failed'

def update_leave_requests(roll_no,start_date,status):
    cur = conn.cursor()
    try:
        cur.execute('UPDATE leave_requests SET status = %s WHERE roll_no = %s and start_date = %s',(status,roll_no,start_date))
        conn.commit()
        cur.close()
        return 'Success'
    except Exception as e:
        print(e)
        cur.close()
        return 'Failed'

def add_extras(roll_no,extras,manager_id):
    cur = conn.cursor()
    try:
        cur.execute('SELECT mess_id from managers where manager_id=%s',(manager_id,))

        mess_id = cur.fetchone()

        cur.execute('SELECT mess_id from students where roll_no=upper(%s)',(roll_no,))

        student_mess_id = cur.fetchone()
        print(mess_id,student_mess_id)
        if (mess_id != student_mess_id):
            return 'Invalid roll number'

        cur.execute('UPDATE fees SET extras=extras+%s where roll_no=upper(%s)',(extras,roll_no))

        conn.commit()
        cur.close()
        return 'Added Rs.'+extras+' for '+roll_no
    except Exception as e:
        print(e)
        cur.close()
        return 'Error'

def get_student_info(manager_id):
    cur = conn.cursor()
    try:
        cur.execute('SELECT mess_id from managers where manager_id=%s',(manager_id,))
        mess_id = cur.fetchone()

        cur.execute('SELECT u.roll_no,username,email FROM users u,students s WHERE u.roll_no = s.roll_no AND s.mess_id = %s',(mess_id,))
    
        info = cur.fetchall()
        return info
    except:
        return 'Error'

def get_fees_last_calculated(mess_id):
    cur = conn.cursor()
    try:
        cur.execute('SELECT feeslastcalculated FROM mess WHERE mess_id = %s',(mess_id,))
    
        info = cur.fetchall()
        return info
    except:
        return 'Error'   

def get_mess_rate(mess_id):
    cur = conn.cursor()
    try:
        cur.execute('SELECT rate FROM mess where mess_id = %s',(mess_id,))
        info = cur.fetchone()
        return info
    except:
        return 'Error' 

def get_fees_details(roll_no):
    cur = conn.cursor()
    try:
        cur.execute('SELECT f.pending_fees, f.extras, s.noofleaves FROM fees f, students s WHERE s.roll_no = %s and s.roll_no = f.roll_no',(roll_no,))
        
        info = cur.fetchone()

        return info
    except:
        return 'Error'    