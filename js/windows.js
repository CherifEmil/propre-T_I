/*-var-*/
const a = [{from:"professeur@uqo.ca",message:  "Exemple d'un message\n  ...\n voilà" ,time:"A derterminer"}];
const b = [];
const c = [];
var liste = [] ;
//------------------------------From data to table-------------------------------

function Insert_Data(tab_id,arr_data) 
{
  let old_tbody = document.getElementById(tab_id);
  var new_tbody = document.createElement('tbody');
  new_tbody.setAttribute("id",tab_id);
  for(let i=0;i<arr_data.length;i++)
  {
  var row = new_tbody.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = arr_data[i].from;
  cell2.innerHTML = arr_data[i].message;
  cell3.innerHTML = arr_data[i].time;
  }
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}
///--------------------------From table to data -------------------------------------


///-------- recu ou envoyé//--
Create_Data_M = function (tableD){
    let Mail = document.getElementById("address_mail");
    let Content = document.getElementById("content_mail");
    //----
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    //------
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(Mail.value.match(mailformat))
    {
    tableD.push({from:Mail.value,message:Content.value,time:dateTime});
    Mail.value="";
    Content.value= "";
    }
    else{
        alert("You have entered an invalid email address!");    
    }
}
    ///------
    let submit = document.querySelector(".Pdep .contenu2 .send_mail");
    submit.onclick=function(){
        
        Create_Data_M(b)
    }

///------------


//---------------------window job-------------------------------------------------
let read = document.querySelector("#read");
let send = document.querySelector("#send");
let contacts = document.querySelector("#contacts");
let titre = document.querySelector(".Pdep .titre1 .T_ecrire");
let contenu1 = document.querySelector(".Pdep .contenu1");
let send_receive=document.querySelector(".Pdep .content_tabel_mail");
let receive_I=document.querySelector("#received_M");
let send_I=document.querySelector("#send_M");
let contenu2 = document.querySelector(".Pdep .contenu2");
let contenu3 = document.querySelector(".Pdep  .contenu3");
let iconecontact = document.querySelector(".Pdep  .add_rem_contact");
let add_contact = document.querySelector("#NC_add");
let New_name = document.querySelector("#n_Name");
let New_mail = document.querySelector("#n_Mail");
let sub_N_contact = document.querySelector("#sub_N_contact");
let remove_contract = document.querySelector("#C_rem");
let exit = document.querySelector("#out");
let curtain = document.querySelector("#curtains");
let wind_add=document.querySelector("#wind_add");

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

read.onclick = function(){
    titre.innerHTML="liste des messages";
    contenu1.style.display = "block";
    send_receive.style.display = "block";
    contenu2.style.display = "none";
    contenu3.style.display = "none";
    iconecontact.style.display = "none";
}
send.onclick = function(){
    titre.innerHTML="Ecrire un message";
    contenu1.style.display = "none";
    send_receive.style.display = "none";
    contenu2.style.display = "block";
    contenu3.style.display = "none";
    iconecontact.style.display = "none";
}
contacts.onclick = function(){
    titre.innerHTML="Liste des contactes";
    contenu1.style.display = "none";
    send_receive.style.display = "none";
    contenu2.style.display = "none";
    contenu3.style.display = "block";
    iconecontact.style.display = "block";
}
add_contact .onclick=function(){
    curtain.style.display="block";
    wind_add.style.display="block";
}
sub_N_contact.onclick=function(){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(New_mail.value.match(mailformat))
    {
    c.push({from:New_name.value,message:New_mail.value,time:dateTime});
    liste.push(New_mail.value);
    wind_add.style.display="none";
    curtain.style.display="none";

    }
    else{
        alert("You have entered an invalid email address!");    
    }
}
remove_contract.onclick=function(){
    curtain.style.display="block";
}
exit.onclick=function(){
    curtain.style.display="none";
    wind_add.style.display="none";
}

//---table job
var tab_selector=a;
let prec_Autor= document.querySelector("#prec_to");
receive_I.onclick=function(){
    prec_Autor.innerHTML="De";
    tab_selector=a;
    Insert_Data("M_body",tab_selector)
}
send_I.onclick=function(){
    prec_Autor.innerHTML="À       ";
    tab_selector=b;
    Insert_Data("M_body",tab_selector);
}

setInterval(() => { 
    Insert_Data("C_body",c);
    Insert_Data("M_body",tab_selector);
}, 2000);

//----------------------
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  autocomplete(document.getElementById("address_mail"), liste);
  }