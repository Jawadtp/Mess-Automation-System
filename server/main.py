
import db
import json

from flask import Flask
from flask import request
from flask import jsonify


from flask_cors import CORS, cross_origin

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import os
import pytz



app = Flask(__name__)

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config["JWT_SECRET_KEY"] = os.getenv('SECRET_KEY', '12345678')  # Change this!

jwt = JWTManager(app)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/messes", methods=['GET', 'POST'])
@cross_origin()
def getMesses():
    messes = db.getMesses()
    print(messes)
    print(jsonify(messes))
    return jsonify(messes)

@app.route("/addregrequest", methods=['POST'])
@cross_origin()
def addRegRequest():
    rollno = request.json['rollno']
    messid = request.json['messid']
    try:
        db.addRegRequest(messid, rollno)
        return jsonify('success')
    except Exception as e:
        print(e)
        return jsonify(e)

@app.route("/regreq", methods=['POST'])
@cross_origin()
def regReq():
    rollno = request.json['rollno']
    req=db.getRegRequest(rollno)
    if(req is None):
        return jsonify('no request')
    return jsonify(req[0])

@app.route("/messdetails", methods=['GET', 'POST'])
@cross_origin()
def details():
    messId = request.json['messid']
    # do print(messId)
    try:
        messMealDetails = db.getMessMealDetails(messId)
        messDetails = db.getMessDetails(messId)
        studentCount = db.getMessStudentCount(messId)
        
        meals = []
        for meal in messMealDetails:
            meal = list(meal)
            meal[2] = str(meal[2])
            meals.append(meal)
        return jsonify({'meals': meals, 'count':studentCount,'details':messDetails})

    except Exception as e:
        print(e)
        return jsonify(e)

    return jsonify('error')


@app.route('/login', methods = ['GET', 'POST'])
@cross_origin()
def login():
    email = request.json['email']
    password = request.json['password']
    
    try:
        userExists = db.doesUserExist(email, password)

        if(userExists):
            access_token=create_access_token(identity=email)
            return jsonify(access_token=access_token)

        else:
            return jsonify({"error": 'Invalid credentials'})
      
    except Exception as e:
        print("Error occured ~~~~~~~~>  ")
        print(e)
        return jsonify({"error": str(e)})

    return jsonify({"error": 'weird'})


@app.route('/announcements', methods = [ 'POST'])
@cross_origin()
def announcement():
    messId = request.json['messid']
    try:
        announcements = db.getAnnouncements(messId)
        return jsonify(announcements)
             

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})
   
    return jsonify('error')


@app.route("/validate", methods=["GET"])
@jwt_required()
@cross_origin()
def validate():
    email = get_jwt_identity()
    userinfo = db.getUserInfoFromEmail(email)
    userMess = db.getUserMessFromEmail(email, userinfo[3])
    if not userMess: #User isn't registered to any mess. Hence, userMess is an empty tuple.
        userMess=('',999)
    userinfo = {'rollno': userinfo[0], 'name':userinfo[1], 'email': userinfo[2], 'role':userinfo[3], 'messname': userMess[0], 'messid': userMess[1]}
    print(userinfo)
    return jsonify(userinfo)

@app.route('/update-meals', methods = ['POST'])
@cross_origin()
def update_meals():
    mess_id = request.json['messID']
    meals = request.json['updatedMeals']
    for meal in meals:
        db.updateMenu(meal,mess_id)
    return jsonify("Successfully Updated Menu")

@app.route('/get-complaints', methods = ['POST'])
@cross_origin()
def get_complaints():
    mess_id = request.json['messID']
    
    complaints = db.get_complaints(mess_id)
    print(complaints)
    return jsonify(complaints)

@app.route('/post-complaint', methods = ['POST'])
@cross_origin()
def post_complaint():
    roll_no = request.json['rollNo']
    mess_id = request.json['messID']
    compalint = request.json['complaint']
    
    message = db.add_complaint(roll_no,mess_id,compalint)
    return jsonify(message)

@app.route('/update-complaint', methods = ['POST'])
@cross_origin()
def update_complaint():
    compalint_id = request.json['complaintID']
    message = db.update_complaint(compalint_id)
    print(message)
    return jsonify(message)

@app.route('/post-announcement', methods = ['POST'])
@cross_origin()
def post_announcement():
    announcement = request.json['announcement']
    manager_id = request.json['managerID']
    message = db.post_announcement(announcement,manager_id)
    print(message)
    return jsonify(message)
    
@app.route('/submit-leave-request', methods = ['POST'])
@cross_origin()
def submit_leave_request():
    roll_no = request.json['rollNo']
    start_date = request.json['request']['startDate']
    end_date = request.json['request']['endDate']
    reason = request.json['request']['reason']
    message = db.insert_leave_req(roll_no,start_date,end_date,reason)
    return jsonify(message)

@app.route('/get-leave-requests', methods = ['POST'])
@cross_origin()
def get_leave_requests():
    manager_id = request.json['managerID']
    requests = db.get_leave_requests(manager_id)
    return jsonify(requests)

@app.route('/update-leave-requests', methods = ['POST'])
@cross_origin()
def update_leave_requests():
    roll_no= request.json['rollNo']
    start_date= request.json['startDate']
    status = request.json['status']
    message = db.update_leave_requests(roll_no,start_date,status)
    return jsonify(message)

@app.route('/add-extras', methods = ['POST'])
@cross_origin()
def add_extras():
    roll_no= request.json['rollNo']
    extras = request.json['extras']
    manager_id = request.json['managerID']
    status = db.add_extras(roll_no,extras,manager_id)
    return jsonify(status)

@app.route('/get-student-info', methods = ['POST'])
@cross_origin()
def get_student_info():
    manager_id = request.json['managerID']
    info = db.get_student_info(manager_id)
    return jsonify(info)

@app.route('/get-student-count', methods = ['POST'])
@cross_origin()
def get_student_count():
    mess_id = request.json['messID']
    info = db.getMessStudentCount(mess_id)
    return jsonify(info)

@app.route('/get-fees-last-calculated', methods = ['POST'])
@cross_origin()
def get_fees_last_calculated():
    mess_id = request.json['messID']
    info = db.get_fees_last_calculated(mess_id)
    return jsonify(info)

@app.route('/get-fees-details', methods = ['POST'])
@cross_origin()
def get_fees_details():
    roll_no = request.json['rollNo']
    mess_id= request.json['messID']
    info = []
    info.append(db.get_fees_details(roll_no))
    info.append(db.get_mess_rate(mess_id))
    print(info)
    return jsonify(info)

@app.route('/get-number-of-leaves', methods = ['POST'])
@cross_origin()
def get_leaves():
    roll_no = request.json['rollNo']
    info = db.get_number_of_leaves(roll_no)
    return jsonify(info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

