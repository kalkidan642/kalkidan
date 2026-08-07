// Dark Mode

const themeBtn=document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
themeBtn.innerHTML="☀ Light Mode";
}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.innerHTML="☀ Light Mode";
}
else{
localStorage.setItem("theme","light");
themeBtn.innerHTML="🌙 Dark Mode";
}

});

// Clock

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=
now.toLocaleString();

}

setInterval(updateClock,1000);

updateClock();

// Contact Form

const form=document.getElementById("contactForm");

form.addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();

let email=document.getElementById("email").value.trim();

let message=document.getElementById("message").value.trim();

let result=document.getElementById("result");

if(name==""||email==""||message==""){
result.style.color="red";
result.innerHTML="Please fill all fields.";
return;
}

const emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!email.match(emailPattern)){
result.style.color="red";
result.innerHTML="Invalid email address.";
return;
}

result.style.color="green";
result.innerHTML="Message sent successfully!";

const contact={
name:name,
email:email,
message:message
};

let contacts=JSON.parse(localStorage.getItem("contacts"))||[];

contacts.push(contact);

localStorage.setItem("contacts",JSON.stringify(contacts));

form.reset();

});

// Download CV

document.getElementById("downloadCV").addEventListener("click",()=>{

window.location.href="cv.pdf";

});