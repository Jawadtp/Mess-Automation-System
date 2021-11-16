
/* Create users table */

CREATE TABLE users(roll_no VARCHAR(10) PRIMARY KEY, username VARCHAR(30) NOT NULL, password VARCHAR(50) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(10));


/* Insert users into users table */

INSERT INTO users (roll_no, username, password, email, role) VALUES ('B190441CS', 'Mohammed Jawad TP', 'admin', 'mohammedjawad_b190441cs@nitc.ac.in', 'student');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('B190837CS', 'Shehzad Pazheri', 'admin', 'shehzad_b190837cs@nitc.ac.in', 'student');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('B190534CS', 'Sinadin Shan', 'admin', 'sinadin_b190534cs@nitc.ac.in', 'student');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('B190468CS', 'Celestine Joy', 'admin', 'celestine_b190468cs@nitc.ac.in', 'student');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('B190439CS', 'KA Midhun Kumar', 'admin', 'midhunkumar_b190439cs@nitc.ac.in', 'student');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('W190100', 'Tom Cruise', 'admin', 'tomcruise@nitc.ac.in', 'manager');

INSERT INTO users (roll_no, username, password, email, role) VALUES ('W190101', 'Mammootty', 'admin', 'mammootty@nitc.ac.in', 'manager');


/* Create mess table */

CREATE TABLE mess(mess_ID SERIAL PRIMARY KEY, messname VARCHAR(30) NOT NULL, rate SERIAL NOT NULL, feeslastcalculated TIMESTAMP DEFAULT NOW());

INSERT INTO mess(messname, rate) VALUES ('A', 200);

INSERT INTO mess(messname, rate) VALUES ('B', 150);


/* Create managers table */

CREATE TABLE managers(mess_ID INTEGER references mess(mess_ID), manager_ID VARCHAR(10) PRIMARY KEY references users(roll_no));

INSERT INTO managers VALUES (2, 'W190100'); /* Tom Cruise manages mess B */


/* Create students table */

CREATE TABLE students(mess_ID INTEGER references mess(mess_ID), roll_no VARCHAR(10) PRIMARY KEY references users(roll_no), noOfLeaves INTEGER DEFAULT 0);

INSERT INTO students (mess_ID, roll_no) VALUES (2, 'B190441CS'); /* Jawad is registered to B mess */

INSERT INTO students (mess_ID, roll_no) VALUES (1, 'B190837CS'); /* Shehzad is registered to A mess */

INSERT INTO students (mess_ID, roll_no) VALUES (1, 'B190534CS'); /* Shan is registered to A mess */

/* Create announcements table */

CREATE TABLE announcements(id SERIAL PRIMARY KEY, roll_no VARCHAR(10) references users(roll_no), announcement VARCHAR(100), posted_at TIMESTAMP DEFAULT NOW());

INSERT INTO announcements(roll_no, announcement) VALUES('W190100', 'Hey there! It is your manager here. I hope you are all having a good day :)');

INSERT INTO announcements(roll_no, announcement) VALUES('W190100', 'Hola folks. Lunch is going to be delayed by an hour tomorrow. My apologies');


/* Create meals table */

CREATE TABLE meals(id SERIAL PRIMARY KEY, mealname VARCHAR(30) NOT NULL, "type" INTEGER NOT NULL); /* Type: 0 -> veg, 1 -> non-veg */

/* Adding meals to meals table */

INSERT INTO meals(mealname, type) VALUES('Appam', 0);
INSERT INTO meals(mealname, type) VALUES('Ghee rice', 0);
INSERT INTO meals(mealname, type) VALUES('Kerala rice', 0);
INSERT INTO meals(mealname, type) VALUES('Puttu', 0);
INSERT INTO meals(mealname, type) VALUES('Chapathi', 0);
INSERT INTO meals(mealname, type) VALUES('Porotta', 0);
INSERT INTO meals(mealname, type) VALUES('Noolputtu', 0);
INSERT INTO meals(mealname, type) VALUES('Fried rice', 1);
INSERT INTO meals(mealname, type) VALUES('Masala Dosa', 0);
INSERT INTO meals(mealname, type) VALUES('Uppuma', 0);
INSERT INTO meals(mealname, type) VALUES('Noodles', 0);
INSERT INTO meals(mealname, type) VALUES('Pizza', 1);
INSERT INTO meals(mealname, type) VALUES('Dosa', 0);
INSERT INTO meals(mealname, type) VALUES('Chapathi', 0);
INSERT INTO meals(mealname, type) VALUES('Pasta', 0);
INSERT INTO meals(mealname, type) VALUES('Chicken Biriyani', 1);
INSERT INTO meals(mealname, type) VALUES('Mandi', 1);



/* Create mess_meals table */

CREATE TABLE mess_meals(mess_ID INTEGER references mess(mess_ID), mealid INTEGER references meals(id), dayOfWeek SMALLINT, "time" time without time zone);

/* Adding meals to mess B */

INSERT INTO mess_meals VALUES(2, 1, 0, '7:30');     /* Day 0 - Monday */
INSERT INTO mess_meals VALUES (2, 2, 0, '13:00');
INSERT INTO mess_meals VALUES(2, 3, 0, '20:30');

INSERT INTO mess_meals VALUES(2, 4, 1, '7:30');  
INSERT INTO mess_meals VALUES (2, 5, 1, '13:00');
INSERT INTO mess_meals VALUES(2, 6, 1, '20:30');

INSERT INTO mess_meals VALUES(2, 7, 2, '7:30');  
INSERT INTO mess_meals VALUES (2, 8, 2, '13:00');
INSERT INTO mess_meals VALUES(2, 9, 2, '20:30');


INSERT INTO mess_meals VALUES(2, 10, 3, '7:30');  
INSERT INTO mess_meals VALUES (2, 11, 3, '13:00');
INSERT INTO mess_meals VALUES(2, 12, 3, '20:30');

INSERT INTO mess_meals VALUES(2, 13, 4, '7:30');  
INSERT INTO mess_meals VALUES (2, 14, 4, '13:00');
INSERT INTO mess_meals VALUES(2, 15, 4, '20:30');

INSERT INTO mess_meals VALUES(1, 1, 0, '7:30');     /* Day 0 - Monday */
INSERT INTO mess_meals VALUES (1, 2, 0, '13:00');
INSERT INTO mess_meals VALUES(1, 3, 0, '20:30');

INSERT INTO mess_meals VALUES(1, 4, 1, '7:30');  
INSERT INTO mess_meals VALUES (1, 5, 1, '13:00');
INSERT INTO mess_meals VALUES(1, 6, 1, '20:30');

INSERT INTO mess_meals VALUES(1, 7, 2, '7:30');  
INSERT INTO mess_meals VALUES (1, 8, 2, '13:00');
INSERT INTO mess_meals VALUES(1, 9, 2, '20:30');


INSERT INTO mess_meals VALUES(1, 10, 3, '7:30');  
INSERT INTO mess_meals VALUES (1, 11, 3, '13:00');
INSERT INTO mess_meals VALUES(1, 12, 3, '20:30');

INSERT INTO mess_meals VALUES(1, 13, 4, '7:30'); 
INSERT INTO mess_meals VALUES (1, 14, 4, '13:00');
INSERT INTO mess_meals VALUES(1, 15, 4, '20:30');

-- Create table complaints
CREATE TABLE complaints(complaints_ID SERIAL PRIMARY KEY, complaint_description TEXT,mess_ID INTEGER references mess(mess_ID),roll_no VARCHAR(10) references students(roll_no),posted_at TIMESTAMP DEFAULT NOW(),status INTEGER DEFAULT 0); /* 0 - Pending, 1 - Resolved */

-- insert values in complaints table
INSERT INTO complaints(complaint_description,mess_ID,roll_no) VALUES('Mess is not kept clean', 1 ,'B190534CS');
INSERT INTO complaints(complaint_description,mess_ID,roll_no) VALUES('Bad behaviour of hostel staff', 1 ,'B190837CS');

-- Create table fees
CREATE TABLE fees(roll_no VARCHAR(10) PRIMARY KEY references students(roll_no),pending_fees INTEGER,extras INTEGER);

-- Create table leave_requests
CREATE TABLE leave_requests(roll_no VARCHAR(10) references students(roll_no), start_date DATE DEFAULT CURRENT_DATE, end_date DATE, manager_ID VARCHAR(10) references managers(manager_ID), PRIMARY KEY(roll_no,start_date));
