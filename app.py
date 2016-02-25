from flask import Flask
from lib.git import getInfo
from flask import render_template
app = Flask(__name__)
@app.route('/')
def index():
  return render_template('indev.html')
@app.route('/get/<username>/<reponame>')
def getIssueInfo(username, reponame):
  
  GitData = getInfo(username, reponame)
  return GitData, 200
if __name__ == '__main__':
  app.debug=True
  app.run('0.0.0.0')
