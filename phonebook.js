window.onload =function () {
    // button fields
  var quickAddBtn=document.getElementById("QuickAdd");
  var addBtn=document.getElementById("Add");
  var cancelBtn=document.getElementById("Cancel");
  var quickAddFormDiv= document.querySelector('.quickaddform');  

  //form input feilds
   var fullName=document.getElementById("fullName");
   var phone=document.getElementById("Phone");
   var email=document.getElementById("Email");
   var address=document.getElementById("Address");

   //contact list display
    var  contactAddBookDiv = document.querySelector(".contactaddbook");

    //creating the array for storing the  contact list in local storaage 
     var contactlist=[];

     // event listeners
     quickAddBtn.addEventListener("click",function()
         {
            quickAddFormDiv.style.visibility ="visible";
         });
     
     
     cancelBtn.addEventListener("click",function(){
        clearForm();
        quickAddFormDiv.style.visibility ="hidden";
     });


     addBtn.addEventListener("click", contactbook);
     // adding the event listeners to contactaddbook div
     contactAddBookDiv.addEventListener("click",deleteContact);
     
     //phonebook contructor
      function phoneBookInfo(fullName,phone,email,address){
          this.fullName=fullName;
          this.phone=phone;
          this.email=email;
          this.address=address;
      }

     function contactbook(){
         var check=fullName.value!='' && phone.value!='' && email.value!='' && address.value!='';
         
         if(check)
         {
             // if every filed is filled then  store  the info to the array and to the local storage 
             //creating an object constructor function
             var info = new phoneBookInfo(fullName.value,phone.value,email.value,address.value);
             //pushing up the contact info to the array
             contactlist.push(info);
             localStorage['contactbookkey'] =JSON.stringify(contactlist); // convert the array elements to the string and store in the local storage 
             quickAddFormDiv.style.visibility ="hidden";
             clearForm();
             showContacts();
         }   
     }

     // clearing the form fields once contact is added to contactList
      function clearForm()
      {
        var clear=document.querySelectorAll(".inpClasses");
         for( var i in clear)
         {
             clear[i].value ='';
         }
      }
    // deleting the contact from the Local storage and array 
    function deleteContact(e){
        if(e.target.classList.contains("delbtn"))
        {
            var delid=e.target.getAttribute("data-id");
            contactlist.splice(delid,1);
            localStorage['contactbookkey'] =JSON.stringify(contactlist);
            showContacts();
        }
    }
    

      function showContacts(){
          // check the  LS key 'contactbookkey' exists are not  or else create it 
          //if the key "contactbookkey" is  eexists load the contents and display it on webpage 

          if(localStorage['contactbookkey'] === undefined){
              localStorage['contactbookkey']="[]";   // we are storing the empty array as a string to the local storage 
          }
          else {  // we need to update the  array which we created  with thee existing info of contacts present in LS
            contactlist =JSON.parse(localStorage['contactbookkey']); // converting the string info into the array 
            contactAddBookDiv.innerHTML='';
            
            for(var n in contactlist)
            {
               
                var  inFo='<div class="entry">';
               
                inFo +='<div class="name">'  + contactlist[n].fullName + '</div><td>';
                inFo +='<div class="phone">'  + contactlist[n].phone + '</div> ';
                inFo +='<div class="email">'  + contactlist[n].email + '</div> ';
                //inFo +='<div class="address"> <textarea  cols="30" rows="5" >'  + contactlist[n].address + '</textarea></div> ';
                inFo +='<div class="address">'  + contactlist[n].address + '</div> ';
                inFo+='<div class="del"> <button class="delbtn" data-id =" ' + n + '">Delete</button></div>';
                inFo+='</div> ';
                inFo+='<hr>'
               
                contactAddBookDiv.innerHTML +=inFo;
            }
          }
      }
      showContacts();
}