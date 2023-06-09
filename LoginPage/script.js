window.onload = function() {
    if(localStorage.getItem('rememberMe') === 'true') {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        loginEmailInput.value = userDetails.email;
        loginPasswordInput.value = userDetails.password;
        rememberMe.checked = true;
    }
}

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

const loginEmailInput = document.getElementById('loginEmail');
const registerEmailInput = document.getElementById('registerEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const registerUsernameInput = document.getElementById('registerUsername');
const registerPasswordInput = document.getElementById('registerPassword');
const rememberMe = document.getElementById('rememberMe')

rememberMe.addEventListener('change', (event) => {
    if(event.currentTarget.checked) {
        localStorage.setItem('rememberMe', 'true');
        const userDetails = {
            email: loginEmailInput.value,
            password: loginPasswordInput.value
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userDetails');
    }
});

const registrationForm = document.querySelector('#registrationForm'); 
const termsAndConditionsCheckbox = document.querySelector('#termsAndConditions');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    resetFields();
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    resetFields();
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.toggle('active-popup');
    resetFields();
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    resetFields();
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.remove('active');
    resetFields();
});

registrationForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(!termsAndConditionsCheckbox.checked){
        console.log('Terms and conditions checkbox not checked!');
        alert('You must agree to the terms and conditions before registering.'); 
    } else {
        const newUserEmail = registerEmailInput.value;
        const newUserPassword = registerPasswordInput.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === newUserEmail)) {
            alert('Email already registered');
            return;
        }

        users.push({
            email: newUserEmail,
            password: newUserPassword
        });

        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful');
        wrapper.classList.remove('active');
        resetFields();
    }
});

loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    if(rememberMe.checked) {
        const userDetails = {
            email: email,
            password: password
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('rememberMe', 'true');
    }

    login(email, password);
});

function moveLabelUpOnInput(inputElement) {
    inputElement.addEventListener('input', function(){
        if (inputElement.value.trim().length > 0){
            inputElement.nextElementSibling.style.top = "-5px";
        } else {
            inputElement.nextElementSibling.style.top = "50%";
        }
    });
}

moveLabelUpOnInput(loginEmailInput);
moveLabelUpOnInput(registerEmailInput);
moveLabelUpOnInput(loginPasswordInput);
moveLabelUpOnInput(registerUsernameInput);
moveLabelUpOnInput(registerPasswordInput);

function resetFields() {
    let inputs = [loginEmailInput, registerEmailInput, loginPasswordInput, registerUsernameInput, registerPasswordInput];
    inputs.forEach(input => {
        input.value = '';
        input.nextElementSibling.style.top = "50%";
    });

    if (localStorage.getItem("rememberMe") == "true") {
        let parsedDetails = JSON.parse(localStorage.getItem("userDetails"))
        loginEmailInput.value = parsedDetails["email"]
        loginPasswordInput.value = parsedDetails["password"]
        loginEmailInput.nextElementSibling.style.top = "-5px";
        loginPasswordInput.nextElementSibling.style.top = "-5px";
    }
}

function login(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email && user.password === password)) {
        alert('Login successful');
    } else {
        alert('Invalid email or password');
    }
}
