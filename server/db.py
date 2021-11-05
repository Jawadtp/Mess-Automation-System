import psycopg2
from datetime import datetime, timezone

conn = psycopg2.connect("dbname=mess user=Jawadtp")


def getUserInfoFromEmail(email):
    cur = conn.cursor()      
    cur.execute("SELECT rollno, username, email, role FROM students WHERE email=%s limit 1",(email,))        
    res = cur.fetchone()
    return res


def doesUserExist(email, password):

    cur = conn.cursor()       
    cur.execute("SELECT EXISTS(select 1 from students where email=%s AND password=%s)",(email, password))        
    res = cur.fetchone()
    return res[0]

