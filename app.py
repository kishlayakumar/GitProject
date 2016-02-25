from flask import Flask
from lib.git import getInfo
from flask import render_template
app = Flask(__name__)
"""
This Flask API is for getting Issue data of a git user' repo
input parameters are username and repo name.

This webservice Return data in json format to the machine
from which the REST API is consumed and called
"""
"""
This API as called default
when USER input URL
"""
@app.route('/')
def index():
  return render_template('indev.html')
"""
This API gives a get call with username
and repo name.
which is forwarded to fetInfo function
and required data is returned 
"""
@app.route('/get/<username>/<reponame>')
def getIssueInfo(username, reponame):
  
  GitData = getInfo(username, reponame)
  return GitData, 200
if __name__ == '__main__':
  app.debug=True
  app.run('0.0.0.0')
