CREATE TABLE students(rollno VARCHAR(10) PRIMARY KEY, username VARCHAR(30) not null, password VARCHAR(50) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, role VARCHAR(10));

INSERT INTO students (rollno, username, password, email, role) VALUES ('B190441CS', 'Mohammed Jawad TP', 'admin', 'mohammedjawad_b190441cs@nitc.ac.in', 'student');

INSERT INTO students (rollno, username, password, email, role) VALUES ('B190837CS', 'Shehzad Pazheri', 'admin', 'shehzad_b190837cs@nitc.ac.in', 'student');

INSERT INTO students (rollno, username, password, email, role) VALUES ('B190534CS', 'Sinadin Shan', 'admin', 'sinadin_b190534cs@nitc.ac.in', 'student');

INSERT INTO students (rollno, username, password, email, role) VALUES ('B190468CS', 'Celestine Joy', 'admin', 'celestine_b190468cs@nitc.ac.in', 'student');

INSERT INTO students (rollno, username, password, email, role) VALUES ('B190439CS', 'KA Midhun Kumar', 'admin', 'midhunkumar_b190439cs@nitc.ac.in', 'student');