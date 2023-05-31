const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const registrationForm = document.querySelector('#registrationForm'); 
const termsAndConditionsCheckbox = document.querySelector('#termsAndConditions');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.toggle('active-popup');
});

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

registrationForm.addEventListener('submit', function(e){
    if(!termsAndConditionsCheckbox.checked){
        e.preventDefault();
        console.log('Terms and conditions checkbox not checked!');
        alert('You must agree to the terms and conditions before registering.'); 
    }
});
