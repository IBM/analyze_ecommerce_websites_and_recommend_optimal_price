from flask import Flask, render_template, request, jsonify
import json
import psycopg2
import psycopg2.errorcodes
import time
import logging
import random


app = Flask(__name__)
app.config["files"] = "."


@app.route("/vendor1")
def vendor1():
	return render_template("vendor1.html")   
@app.route("/vendor2")
def vendor2():
	return render_template("vendor2.html")   
@app.route("/vendor3")
def vendor3():
	return render_template("vendor3.html")   


if __name__ == '__main__':
   app.run(host="0.0.0.0", port=8080, debug=True)

