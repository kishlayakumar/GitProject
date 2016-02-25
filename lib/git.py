import requests
import datetime
import sys
import json
def getInfo(username, reponame):
  gitData = {}
  gitrepoLink = 'https://api.github.com/repos/' + username +\
                 '/' + reponame
  r = requests.get(gitrepoLink)
  gitData["Total Issue"] =  str(r.json()["open_issues_count"])
  todayDay = datetime.datetime.now()
  i=1
  issuesLessThanADay = 0
  issuesGreaterThanDayLessThanWeek = 0
  IssuesGreaterThanWeek = 0
  while(1):
    gitIssueLink = gitrepoLink + '/issues?q=state:open&page='+ str(i) +'&per_page=100' 
    issueRequest = requests.get(gitIssueLink)
    if len(issueRequest.json()) == 0:
      break
    for result in issueRequest.json():
      date = result["created_at"]
      date_object = datetime.datetime.strptime(date, "%Y-%m-%dT%H:%M:%SZ")
      dateDiff = todayDay - date_object
      DaysDiff = dateDiff.days
      TimesDIff = dateDiff.seconds
      if int(DaysDiff) == 0:
        issuesLessThanADay = issuesLessThanADay + 1
      elif int(DaysDiff) > 0 and int(DaysDiff) < 7:
        issuesGreaterThanDayLessThanWeek = issuesGreaterThanDayLessThanWeek + 1
      else:
        IssuesGreaterThanWeek = IssuesGreaterThanWeek +1
    i = i+1
  gitData["24"] =  str(issuesLessThanADay)
  gitData["7"] =  str(issuesGreaterThanDayLessThanWeek)
  gitData["greater_7"]=  str(IssuesGreaterThanWeek)
  return json.dumps(gitData)

