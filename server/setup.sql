
/* Create student table */

CREATE TABLE users(rollno VARCHAR(10) PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR(50) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(10));


INSERT INTO users (rollno, username, password, email, role) VALUES ('B190441CS', 'Mohammed Jawad TP', 'admin', 'mohammedjawad_b190441cs@nitc.ac.in', 'student');

INSERT INTO users (rollno, username, password, email, role) VALUES ('B190837CS', 'Shehzad Pazheri', 'admin', 'shehzad_b190837cs@nitc.ac.in', 'student');

INSERT INTO users (rollno, username, password, email, role) VALUES ('B190534CS', 'Sinadin Shan', 'admin', 'sinadin_b190534cs@nitc.ac.in', 'student');

INSERT INTO users (rollno, username, password, email, role) VALUES ('B190468CS', 'Celestine Joy', 'admin', 'celestine_b190468cs@nitc.ac.in', 'student');

INSERT INTO users (rollno, username, password, email, role) VALUES ('B190439CS', 'KA Midhun Kumar', 'admin', 'midhunkumar_b190439cs@nitc.ac.in', 'student');

INSERT INTO users (rollno, username, password, email, role) VALUES ('W190100', 'Tom Cruise', 'admin', 'tomcruise@nitc.ac.in', 'manager');

INSERT INTO users (rollno, username, password, email, role) VALUES ('W190101', 'Mammootty', 'admin', 'mammootty@nitc.ac.in', 'manager');


/* Create mess table */

CREATE TABLE mess(messid SERIAL PRIMARY KEY, messname VARCHAR(30) NOT NULL, rate SERIAL NOT NULL, rollno VARCHAR(10) references users(rollno));

INSERT INTO mess(messname, rate, rollno) VALUES ('A', 200, 'W190100');

INSERT INTO mess(messname, rate, rollno) VALUES ('B', 150, 'W190101');


/* Create user_mess table */

CREATE TABLE user_mess(messid INTEGER references mess(messid), rollno VARCHAR(10) references users(rollno));

INSERT INTO user_mess (messid, rollno) VALUES (2, 'B190441CS'); /* Jawad is registered to B mess */

INSERT INTO user_mess (messid, rollno) VALUES (1, 'B190837CS'); /* Shehzad is registered to A mess */

INSERT INTO user_mess (messid, rollno) VALUES (2, 'W190100'); /* Tom Cruise manages B mess */


/* Create mess_meals table */

CREATE TABLE mess_meals(messid INTEGER references mess(messid), name VARCHAR(30), dayOfWeek SMALLINT, "time" time without time zone);

/* Adding mess meals for B mess */

INSERT INTO mess_meals VALUES(2, 'Appam', 0, '7:30');     /* Day 0 - Monday */
INSERT INTO mess_meals VALUES (2, 'Ghee rice', 0, '13:00');
INSERT INTO mess_meals VALUES(2, 'Kerala rice', 0, '20:30');

INSERT INTO mess_meals VALUES(2, 'Puttu', 1, '7:30');  
INSERT INTO mess_meals VALUES (2, 'Chapathi', 1, '13:00');
INSERT INTO mess_meals VALUES(2, 'Porotta', 1, '20:30');

INSERT INTO mess_meals VALUES(2, 'Noolputtu', 2, '7:30');  
INSERT INTO mess_meals VALUES (2, 'Fried rice', 2, '13:00');
INSERT INTO mess_meals VALUES(2, 'Masala dosa', 2, '20:30');


INSERT INTO mess_meals VALUES(2, 'Uppuma', 3, '7:30');  
INSERT INTO mess_meals VALUES (2, 'Noodles', 3, '13:00');
INSERT INTO mess_meals VALUES(2, 'Pizza', 3, '20:30');

INSERT INTO mess_meals VALUES(2, 'Dosa', 4, '7:30');  
INSERT INTO mess_meals VALUES (2, 'Chapathi', 4, '13:00');
INSERT INTO mess_meals VALUES(2, 'Pasta', 4, '20:30');

/* Create announcements table */

CREATE TABLE announcements(rollno VARCHAR(10) references users(rollno), announcement VARCHAR(100), postedat TIMESTAMP DEFAULT NOW());

INSERT INTO announcements VALUES('W190100', 'Hey there! It is your manager here. I hope you are all having a good day :)');

INSERT INTO announcements VALUES('W190100', 'Hola folks. Lunch is going to be delayed by an hour tomorrow. My apologies');