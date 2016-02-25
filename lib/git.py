import requests
import datetime
import sys
import json

def getInfo(username, reponame):
  """
  This Function Takes username and repository name
  of the git account and returns the details of the
  following information related to issues:
  1.Total number of open issues
  2.Issues which were opened a day ago
  3.Issues which were opened more than 24 hours ago but less than 7 days ago 
  4.Issues which were open more than 7 days ago
  - Used GIT API's for this project
  - api link requests for required public data of repo
  - Get users data in JSON object
  - Parse JSON and get recquired result
  """
  gitData = {}
  #Git Link to user's repository
  gitrepoLink = 'https://api.github.com/repos/' + username +\
                 '/' + reponame
  """
  GET request to git
  """
  r = requests.get(gitrepoLink)
  """
  Iterate and get Total issue from json from key value 
  open_issues_count
  """
  gitData["Total Issue"] =  str(r.json()["open_issues_count"])
  """
  Get Today date and time
  Get time of the issue
  Check time difference
  """
  todayDay = datetime.datetime.now()
  # i refers to page number while getting data of issues
  i=1
  """
  These variables store the count of the issues as per catogery
  """
  issuesLessThanADay = 0
  issuesGreaterThanDayLessThanWeek = 0
  IssuesGreaterThanWeek = 0
  while(1):
    """
    While Loop to iterate over all the issues data getting from GIT
    "gitIssueLink" returns data of 100 issues which is iterated
    for time of creation and then compared and as per result
    count of the catogery increased.
    """
    gitIssueLink = gitrepoLink + '/issues?q=state:open&page='+ str(i) +'&per_page=100' 
    """
    GET request to git
    """
    issueRequest = requests.get(gitIssueLink)
    """
    If Page has no data then break the loop
    """
    if len(issueRequest.json()) == 0:
      break
    """
    check every issue json and loop for created time
    compare time with time right now and increase catogery 
    relatively
    """
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
  """
  Store the counted value as per Tag in dictonary
  which is going to require in Front End 
  """
  gitData["24"] =  str(issuesLessThanADay)
  gitData["7"] =  str(issuesGreaterThanDayLessThanWeek)
  gitData["greater_7"]=  str(IssuesGreaterThanWeek)
  """
  retern result dictionary as string
  """
  return json.dumps(gitData)

