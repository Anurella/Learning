'use strict';


document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
   let issues = JSON.parse(localStorage.getItem('issues'));
   let issuesList = document.getElementById('issuesList');

   issuesList.innerHTML = '';


   for(var i = 0; i < issues.length; i++) {
     let id = issues[i].id;
     let desc = issues[i].description;
     let severity = issues[i].severity;
     let assignedTo = issues[i].assignedTo;
     let status = issues[i].status;

        issuesList.innerHTML +=
                              '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'

                            +

                             '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '

                            +

                            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'

                            +

                            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '

                            +

                            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
   }

}

function saveIssue(e) {
    let issueId = chance.guid();
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let AssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open';

    let issue = {

        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {

         var issues = [];
         issues.push(issue);
         localStorage.setItem('issues', JSON.stringify(issues));
    }

    else {

        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringfity(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();

}


function setStatusClosed(id) {

    let issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {

        if (issues[i].id == id) {

            issues[i].status = "Closed";
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {

    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++)
    {
        if (issues[i].id == id) {

            issues.splice(i, 1);
        }
    }


    localStorage.setItem('issues', JSON.stringify(issues));

    // update list
    fetchIssues();
}