var hamburger = document.querySelector('.hamburger');
var dropDown = document.querySelector('.dropDownContainer > a');
var appointmenFormButton = document.querySelector('.appointmenFormButton');
var subscribe = document.querySelector('.subscribe');
var scrollButton = document.querySelector('.top');
var allImage = document.querySelectorAll('.project a');
var modal = document.querySelector('.modal');
var close = document.querySelector('.close');

hamburger.addEventListener('click',hamburgerToggle);
dropDown.addEventListener('click',dropDownMenu);
appointmenFormButton.addEventListener('click',validateForm);
subscribe.addEventListener('click',validateEmail);
scrollButton.addEventListener('click',scrolltoTop);
close.addEventListener('click',closeModalPopup);
modal.addEventListener('click',closeModal);


allImage.forEach(function(allImagea) {
  allImagea.addEventListener('click',function(e) {
    e.preventDefault();
    var imageHeading = document.querySelector('.img-info h5').innerHTML;
    var imageDescibe = document.querySelector('.img-info p').innerHTML;
    var imageSrc = this.firstElementChild.src;
    showImg(imageSrc,imageHeading,imageDescibe);
  });
});

function showImg(Changesrc,imageHeading,imageDescibe) {
  var modalImage = document.querySelector('.modalContainer img');
  var modalHeading = document.querySelector('.modalContainer h5');
  var modalDescibe = document.querySelector('.modalContainer p');
  modalImage.src= Changesrc;
  modalHeading.innerHTML = imageHeading;
  modalDescibe.innerHTML = imageDescibe;
  modal.classList.add('showhide');
  document.querySelector('html').classList.add('overflow');
}

function closeModal(e) {
  e.preventDefault();
  if (e.target == modal) {
    modal.classList.remove('showhide');
    document.querySelector('html').classList.remove('overflow');
  }
}

function closeModalPopup(e) {
  e.preventDefault();
  modal.classList.remove('showhide');
  document.querySelector('html').classList.remove('overflow');
}

function hamburgerToggle() {
  document.querySelector('nav').classList.toggle('showhide');
  document.querySelector('.hamburger').classList.toggle('open');
}

function dropDownMenu(e) {
  e.preventDefault();
  document.querySelector('.dropDown').classList.toggle('showhide');
}

function scrolltoTop(e) {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// function for to show errors
function printError(elementbyclass, hintMsg) {
  document.querySelector(elementbyclass).innerHTML = hintMsg;
}

function validateEmail(e) {
  e.preventDefault();
  var email = document.querySelector('.email').value;
  var emailError = true;
 
  clearSingleError();
  emailError = regExp(email,'email',/^\S+@\S+\.\S+$/,'.emailError');

  if( emailError == true) {
    emailError  = true;
    return false;
  }
  else {
    printError('.newsletterFormContainer .successMsg', "Successfully submitted your details");
    resetform('.newsletterForm');
    clearSuccesMsg();
  }
}

// function for when submit form then validate it. its empty or return value is valid or not
function validateForm(e) {
  e.preventDefault();
  var fname = document.querySelector('.appointmentForm .fname').value;
  var lname = document.querySelector('.appointmentForm .lname').value;
  var password = document.querySelector('.appointmentForm .password').value;
  var fnameError = lnameError =  passwordError =  true;
  
  clearSingleError();

  fnameError = regExp(fname,'first name',/^[^-\s][a-zA-Z]+$/,'.fnameError');

  lnameError = regExp(lname,'last name',/^[^-\s][a-zA-Z]+$/,'.lnameError');

  checkPassword(password);

  if((fnameError || lnameError ||  passwordError ) == true) {
    fnameError = lnameError  = passwordError  = true;
    return false;
  }
  else {
    printError('.appointmentForm .successMsg', "Successfully submitted your details");
    resetform('.appointmentForm');
    clearSuccesMsg();
  }
}

// function for regular expression to validate data
function regExp(element,msg,regexString,Errorspan) {
  if(element == "") {
    printError(Errorspan, "Please enter your "+ msg);
    Errorspan = true;
    clearError(10000);
    return Errorspan;
  } 
  else {
    var regex = regexString;
    if(regex.test(element) === false) {
        printError(Errorspan, "Please enter a valid "+ msg);
        Errorspan = true;
        return Errorspan;
    } else {
        printError(Errorspan, "");
        Errorspan = false;
        return Errorspan;
    }
  }
}

// function for check password according to condition
function checkPassword(password) {
  if(password == "") {
    printError('.passwordError', "Please enter your password");
  } 
  else {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if(regex.test(password) === false) {
      printError('.passwordError', "Please enter valid password. password atleaset having 6 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
    } 
        else {
          printError('.passwordError',"");
          passwordError = false;
    }
  }
}

// function for clear single error when use press the key
function clearSingleError() {
  var allInputs = document.querySelectorAll('.form-group input');
  allInputs.forEach(function(inputValue) {
      inputValue.addEventListener('focus',function() {
      this.nextElementSibling.innerHTML = '';
    });
  });
}

// function for reset form
function resetform(formName) {
  document.querySelector(formName).reset();
  clearError(0);
}

function clearSuccesMsg() {
  var successMsg = document.querySelectorAll('.form-control span');
  setTimeout(function() {
  successMsg.forEach(function(item) { 
    item.innerHTML= "";
  }); 
  },10000);
}

function clearError(clearTime) {
  var errors = document.querySelectorAll('.error');
  setTimeout(function() {
  errors.forEach(function(item) { 
    item.innerHTML= "";
  }); 
  },clearTime);
}

const counters = document.querySelectorAll('.counter');
const speed = 1000;

counters.forEach(function (counter) {
  function updateCount() {
    const target = +counter.getAttribute('data-target');
    const count = + counter.innerText;
    const inc = target/speed;
    if(count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount,1);
    }
    else {
      count.innerText = target;
    }
 }
 updateCount();
});

$('.bannerSlider').slick({
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 1
});

$('.testimonialSlider').slick({
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,     
  arrows: false,
  responsive: [    
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});