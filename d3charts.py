from flask import Flask
from flask import render_template, request, Response
app = Flask(__name__)

@app.route('/')
def main():
	return render_template("index.html")