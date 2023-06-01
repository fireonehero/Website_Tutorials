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
    if(!termsAndConditionsCheckbox.checked){
        e.preventDefault();
        console.log('Terms and conditions checkbox not checked!');
        alert('You must agree to the terms and conditions before registering.'); 
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
}

function login(email, password) {
    const testUser = {
        email: 'test@example.com',
        password: 'password123'
    };

    if (email === testUser.email && password === testUser.password) {
        alert('Login successful');
    } else {
        alert('Invalid email or password');
    }
}