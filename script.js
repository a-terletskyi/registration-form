const getS = selector => document.querySelector(selector);
const addClass = (selector, className) => { getS(selector).classList.add(className) };
const removeClass = (selector, className) => { getS(selector).classList.remove(className) };

let inputValid, validFlag = false, users = [];

function checkValidity() {
    const fsNameValue = getS('#firstName').value;
    const lsNameValue = getS('#lastName').value;
    const emailValue = getS('#signUp-email').value;
    const passValue = getS('#signUp-password').value;

    const fsNameRegExp = /^[a-zA-z]{2,20}$/.test(fsNameValue);
    const lsNameRegExp = /^[a-zA-z]{2,20}$/.test(lsNameValue);
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
    const passwordRegExp = /^\w{8,15}$/.test(passValue);

    if (fsNameRegExp && lsNameRegExp && emailRegExp && passwordRegExp && !users.some(user => user.email.toLowerCase() === getS('#signUp-email').value.toLowerCase())) { inputValid = true; }

    if (fsNameValue === '') { setErrorFor('#firstName', 'First name cannot be blank') }
    else if (!fsNameRegExp) { setErrorFor('#firstName', 'First name is not valid') } else { setSuccessFor('#firstName') }

    if (lsNameValue === '') { setErrorFor('#lastName', 'Last name cannot be blank') }
    else if (!lsNameRegExp) { setErrorFor('#lastName', 'Last name is not valid') } else { setSuccessFor('#lastName') }

    if (emailValue === '') { setErrorFor('#signUp-email', 'Email address cannot be blank') }
    else if (emailRegExp && users.some(user => user.email.toLowerCase() === getS('#signUp-email').value.toLowerCase())) {
        setErrorFor('#signUp-email', 'This email already exist');
        getS('#signUp-email').value = '';
    } else if (!emailRegExp) { setErrorFor('#signUp-email', 'Email address is not valid') } else { setSuccessFor('#signUp-email') }

    if (passValue === '') { setErrorFor('#signUp-password', 'Password cannot be blank') }
    else if (!passwordRegExp) { setErrorFor('#signUp-password', 'Password is not valid') } else { setSuccessFor('#signUp-password') }
}

function setSuccessFor(input) {
    const formControl = getS(input).parentElement;
    formControl.className = 'form-control success';
}

function setErrorFor(input, message) {
    const formControl = getS(input).parentElement;
    const error = formControl.querySelector('.error-message');
    error.innerText = message;
    formControl.className = 'form-control error';
}

getS('.sign-Up').addEventListener('input', () => { if (validFlag === true) { checkValidity() } })

getS('.sign__link').addEventListener('click', function () {
    if (getS('.sign-In').className == 'sign-In hidden') {
        getS('.sign-In').reset();
        getS('.sign__title').innerText = 'Please sign in';
        this.innerText = 'Sign up now';
        addClass('.sign-Up', 'hidden');
        removeClass('.sign-In', 'hidden');
        document.querySelectorAll('.form-control').forEach((item) => { item.className = 'form-control' });
        inputValid, validFlag = false;
    }
    else {
        getS('.sign-Up').reset();
        getS('.sign__title').innerText = 'Please sign up';
        this.innerText = 'Sign in now';
        addClass('.sign-In', 'hidden');
        removeClass('.sign-Up', 'hidden');
        removeClass('.signIn-Error', 'visible');
    }
});

getS('#signUp-btn').addEventListener('click', function () {
    checkValidity();
    validFlag = true;
    if (localStorage.length > 0) { users = JSON.parse(localStorage.getItem('users')) }
    if (inputValid && !users.some(user => user.email.toLowerCase() === getS('#signUp-email').value.toLowerCase())) {
        users.push({
            'firstName': getS('#firstName').value,
            'lastName': getS('#lastName').value,
            'email': getS('#signUp-email').value,
            'password': getS('#signUp-password').value,
        });
        localStorage.setItem('users', JSON.stringify(users));
        document.querySelectorAll('.form-control').forEach((item) => { item.className = 'form-control' });
        inputValid, validFlag = false;
        getS('.sign-Up').reset();
    }
})

getS('#signIn-btn').addEventListener('click', function () {
    if (localStorage.length > 0) {
        users = JSON.parse(localStorage.getItem('users'));
        if (users.some(user => user.email.toLowerCase() === getS('#signIn-email').value.toLowerCase()
            && user.password.toLowerCase() === getS('#signIn-password').value.toLowerCase())) {
            const thisUser = users.findIndex((user) => user.email.toLowerCase() === getS('#signIn-email').value.toLowerCase());
            getS('.profile__name').innerText = users[thisUser].firstName + ' ' + users[thisUser].lastName;
            getS('.profile__email').innerText = users[thisUser].email;
            addClass('.sign', 'hidden');
            removeClass('.profile', 'hidden');
            removeClass('.signIn-Error', 'visible');
            getS('.sign-In').reset();
        }
        else if (getS('#signIn-password').value === '' || getS('#signIn-email').value === '') {
            addClass('.signIn-Error', 'visible');
            getS('.signIn-Error').innerText = 'Please fill in all fields';
        }
        else {
            addClass('.signIn-Error', 'visible');
            getS('.signIn-Error').innerText = 'Incorrect email or password';
        }
    }
    else {
        addClass('.signIn-Error', 'visible');
        getS('.signIn-Error').innerText = 'localStorage is empty';
    }
})

getS('.sign-Out-btn').addEventListener('click', function () {
    addClass('.profile', 'hidden');
    removeClass('.sign', 'hidden');
})