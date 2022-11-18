const usernameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const message = document.querySelector("#message");
const subject = document.querySelector("#subject");


const form = document.querySelector('#submit-form');


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};
const checkMessage = () => {

    let valid = false;

    const min = 3,
        max = 50;

    const userMessage = message.value.trim();

    if (!isRequired(userMessage)) {
        showError(message, 'message cannot be blank.');
    } else if (!isBetween(userMessage.length, min, max)) {
        showError(message, `message must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(message);
        valid = true;
    }
    return valid;
};

const checkSubject = () =>{
    let valid = false;
    
    const min = 5,
    max = 20;

    const usersubject = subject.value.trim();

    if(!isRequired(usersubject)){
        showError(subject,"message cannot be blank");
    }else if(!isBetween(usersubject.length, min, max)){
        showError(subject, `subject must be between ${min} and ${max} character.`)
    } else{
        showSuccess(subject);
            valid = true;
    }

   return valid; 

}


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage(),
        isSubjectValid = checkSubject();    

    let isFormValid = isUsernameValid &&
        isEmailValid && isMessageValid && isSubjectValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        $("#submit-form").submit((e)=>{
            e.preventDefault()
            $.ajax({
                url:"https://script.google.com/macros/s/AKfycbw2MsFTpt7xZ5-ZTVMm6uaWnZmKJMUzqtok822F9Er3sLtt7mssPT4p7taso1vknEuU6Q/exec",
                data:$("#submit-form").serialize(),
                method:"post",
                success:function (response){
                    alert("Form submitted successfully")
                    window.location.reload()
                    //window.location.href="https://google.com"
                },
                error:function (err){
                    alert("Something Error")
    
                }
            })
        })
    }
    else{
        alert('error')
    }
});


const debounce = (fn, delay = 0) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'message':
            checkMessage();
            break;
        case 'subject':
            checkSubject();
            break;
    }
}));
       
       
       
       
       
       
       
       


