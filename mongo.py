from flask import Flask, jsonify, render_template
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB configuration
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client['detroit_insurance']
collection = db['health_ins']

# API endpoint to get all documents from the collection
@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))  # Exclude the _id field from the response
    return jsonify(data)

# Serve the index.html file
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)