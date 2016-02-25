
function myFunction() {
  //Various Things in this function
  //This get User link from textbox
  // and extract username
  //and repo and send a get request.
  var txtName = document.getElementById("gitadderstext");
  var link = txtName.value;
  var linkdata = link.split("/");
  var username = linkdata[3];
  var reponame = linkdata[4];
  var json = null;
  urlink="/get/" + username + "/" + reponame ;
  console.log(urlink)
  $('#loading-img').show();
  $.ajax({
         global: false,
         url : urlink,
         type :  "GET",
         cache: false,

         success : function(html){

             json = html;

             $('#loading-img').hide(); // hide the loading message
             $('#box-element').hide();//hide text box screen
             var obj = JSON.parse(json);//Parse object recive as json object
               var val = obj["Total Issue"];
               jsobj = "Total open issues : "
               $('#box-element2').append(jsobj);
               $ ('#box-element2').append(" ");
               $('#box-element2').append(val);
               $('#box-element2').append("<br>")
               var val = obj["24"];
               jsobj = "Open issue of last 24 hours :"
               $('#box-element2').append(jsobj);
               $ ('#box-element2').append(" ");
               $('#box-element2').append(val);
               $('#box-element2').append("<br>")
               var val = obj["7"]
               jsobj = "Open issue between 24 hours and 7 days :"
               $('#box-element2').append(jsobj);
               $ ('#box-element2').append(" ");
               $('#box-element2').append(val);
               $('#box-element2').append("<br>")
               var val = obj["greater_7"]
               jsobj = "Open issue of greater than 7 days :"
               $('#box-element2').append(jsobj);
               $ ('#box-element2').append(" ");
               $('#box-element2').append(val);
               $('#box-element2').append("<br>")
               $('#box-element2').append('<input id="button-click" class="next-click" onclick="return myFunction2()" type="button" value="TRY AGAIN">');
               $('#box-element2').show();
         },
         error: function (jqXHR, exception) {
             //For error and exception handling
             var msg = '';
             if (jqXHR.status === 0) {
                 msg = 'Not connect.\n Verify Network.';
             } else if (jqXHR.status == 404) {
                 msg = 'Requested page not found. [404]';
             } else if (jqXHR.status == 500) {
                 msg = 'Internal Server Error [500]. Please check repo link';
             } else if (exception === 'parsererror') {
                 msg = 'Requested JSON parse failed.';
             } else if (exception === 'timeout') {
                 msg = 'Time out error.';
             } else if (exception === 'abort') {
                 msg = 'Ajax request aborted.';
             } else {
                 msg = 'Uncaught Error.\n' + jqXHR.responseText;
             }

             $ ('#box-element2').append(msg)
             $ ('#box-element2').append('<br>')
             $ ('#box-element2').append('<input id="button-click" class="next-click" onclick="return myFunction2()" type="button" value="TRY AGAIN">');
             $('#loading-img').hide();
             $('#box-element').hide();
             $('#box-element2').show();
         }

     });
}


function myFunction2() {
  // on click this function reload the given URL
  window.location.href = document.URL;
}


$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});
