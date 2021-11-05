
import db

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



@app.route("/hello", methods=["GET"])
@cross_origin()
def hello():
    return jsonify({'greeting':'hello'})



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



@app.route("/validate", methods=["GET"])
@jwt_required()
@cross_origin()
def validate():
    email = get_jwt_identity()
    userinfo = db.getUserInfoFromEmail(email)
    userinfo = {'rollno': userinfo[0], 'name':userinfo[1], 'email': userinfo[2], 'role':userinfo[3]}
    print(userinfo)
    return jsonify(userinfo)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

