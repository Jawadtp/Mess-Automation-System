import psycopg2
from datetime import datetime, timezone


conn = psycopg2.connect("dbname=mess user=Jawadtp")

def getUserInfoFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT rollno, username, email, role FROM students WHERE email=%s limit 1",(email,))        
    res = cur.fetchone()
    return res


def getUserInfo(rollno):
    cur = conn.cursor()       
    cur.execute("SELECT rollno, username, email from students where rollno=%s)",(rollno,))        
    res = cur.fetchone()
    
    if(cur.rowcount):
        return res[0]

    return False

def doesUserExist(email, password):

    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(select 1 from students where email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    return res[0]


def areUsernameAndEmailUnique(email, username):
    
    cur = conn.cursor()       
    cur.execute("SELECT username, email FROM students WHERE username=%s OR email=%s limit 1",(username, email))        
    res = cur.fetchone()
    
    if(cur.rowcount):
        if res[0]==username:
            return ['error','username']
        if res[1]==email:
            return ['error','email']
    
    return True


def createAccount(email, username, password):

    try:
        current_time = datetime.now(timezone.utc) 
        cur = conn.cursor()       
        cur.execute("INSERT INTO students (username, password, email, createdon) VALUES (%s,%s,%s, %s)",(username, password, email, current_time))
        cur.close()
        conn.commit()
        return True
    except Exception as e:
        return str(e)


def getUseridFromUseremail(email):

    cur = conn.cursor()       
    cur.execute("SELECT id FROM students WHERE email=%s",( email,))
    res = cur.fetchone()
    return res[0]


def createPoll(pollName, pollDesc, startTime, expiryTime, email):

    current_time = datetime.now() 
    creatorid = getUseridFromUseremail(email)

    try:        
        cur = conn.cursor()   
        cur.execute("INSERT INTO polls (pollname, polldesc, creator, createdon, starttime, expirytime) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",( pollName, pollDesc, creatorid, current_time, startTime, expiryTime))
        res = cur.fetchone()
        cur.close()
        conn.commit()
        return res[0]

    except Exception as e:
        return str(e)


def addQuestion(question, pollId):
    try:        
        cur = conn.cursor()   
        cur.execute("INSERT INTO questions (question, pollid) VALUES (%s, %s) RETURNING id",(question, pollId))
        res = cur.fetchone()
        cur.close()
        conn.commit()
        return res[0]

    except Exception as e:
        return str(e)

def addOptions(options, questionId):
    for option in options:
        try:
            cur = conn.cursor()   
            cur.execute("INSERT INTO options (optiontext, questionid) VALUES (%s, %s) RETURNING id",(option, questionId))
            cur.close()
            conn.commit()
        except Exception as e:
            return str(e)

def addPollQuestions(pollId, questions):
    for question in questions:
        options = question['options']
        questionText = question['question']
        questionId = addQuestion(questionText, pollId)
        if(isinstance(questionId, int) is False):
            raise ValueError('Question addition failed')
        addOptions(options, questionId)
    return True