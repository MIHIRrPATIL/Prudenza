from flask import jsonify,request,Flask

app = Flask(__name__)

@app.route("/",methods=['GET'])
def home(): 
    return jsonify({"message":"ML services are running"})

if __name__=='__main__':
    app.run(debug=True)

