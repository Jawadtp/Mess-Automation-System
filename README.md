# Mess-Automation-System
A web application that allows users to access mess information and manage mess affairs easily and elegantly.

Getting started
1) Clone this repository using the git clone command.
```console
    $ git clone https://github.com/Jawadtp/Mess-Automation-System.git
``` 
2) Navigate to the server folder and install all the dependencies listed in `requirements.txt` preferably in a virtual environment.
```console
    $ pip install -r requirements.txt
``` 

3) Create a PostgreSQL database named 'mess'. Subsequently, run all the queries in setup.sql.
```console
    $ createdb mess
    $ psql mess
``` 

4) Run the server and ensure that it works fine.
```console
    $ python main.py
``` 
5) Once the server is setup, head over to the client folder and install all the client dependencies using the `npm install` command.

6) The client application may now be run using the `npm start` command.
