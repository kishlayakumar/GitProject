
function myFunction() {
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
             //$(".content").html(html);
             json = html;

             $('#loading-img').hide(); // hide the loading message
             $('#box-element').hide();
             var obj = JSON.parse(json);
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

  window.location.href = document.URL;
}


/*
  var xhr = new XMLHttpRequest();
  //console.log(document.URL);
  xhr.open("GET", document.URL + "get/" + username + "/" + reponame, false);
  xhr.send();
  //document.getElementById("gitadderstext").style.display="none";
  //document.getElementById("button-click").style.display="none";
  //document.getElementById("box-element").style.display="none";
  //document.getElementById("loading-img").style.display="block";
  console.log("hello")
  console.log(xhr.status);
  console.log(xhr.responseText);

  console.log(xhr.readyState == 4)
  console.log(xhr.onreadystatechange)


  // console.log(xhr.responseText)
}

*/
$(window).load(function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});
