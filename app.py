''' Import Libraries '''

from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests
import os
import json
import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure 

''' Initialize Flask Variables '''

app = Flask(__name__)

''' Setup MongoDB '''

client = MongoClient(
    "ENDPOINT-URL", # Change the endpoint with your MongoDB Endpoint
    ssl=True,
    ssl_ca_certs="static/ssl/ssl4mongodb"
)

try:
    db_list = client.list_database_names()
    print("List of databases:")
    print(db_list)

except ConnectionFailure as err:
    print("Unable to connect to database")

''' Variable Declarations '''

mrp = 0
updatedPrices = []
prodPrice = 0
profitMargine = 0
minimumProfit = 0
productID = 0

''' Default Route '''

@app.route('/')
def index():
    db=client.mongodb

    myJson = []
    # print("Fetch one",db.second_collection.find_one())
    for item in db.ecommerce_collection.find():
        print("Iterate over id:",item['_id'])
        tempJson = {
            "name": item['name'],
            "features": item['features'],
            "mrp": item['mrp']
        }
        myJson.append(tempJson)
    return render_template('index.html', phones=myJson)

@app.route('/update')
def update():
    
    return render_template('updateprice.html', profitMargine=profitMargine, minimumProfit=minimumProfit, mrp=mrp)

@app.route('/updatePrice', methods=['GET', 'POST'])
def updatePrice():
    
    if 'mrp' in request.args:
        global mrp
        mrp = int(request.args['mrp'])
        return jsonify({"flag": 1})
    
    global profitMargine, minimumProfit, productID
    profitMargine = int(request.args['profitMargine'])
    minimumProfit = int(request.args['minimumProfit'])
    productID = int(request.args['productID'])
    return jsonify({"flag": 1})
    
@app.route('/sellingprice', methods=['GET', 'POST'])
def updateSellingPrice():
    
    global prodPrice
    prodPrice = request.args['price']
    print(prodPrice)
    return jsonify({"flag": 1})

@app.route('/products')
def products():
    global prodPrice, productID
    return render_template('product.html', mrp=mrp, prodId=productID, details=prodPrice)

''' Start the Server '''

port = os.getenv('VCAP_APP_PORT', '8080')
if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='0.0.0.0', port=port)


