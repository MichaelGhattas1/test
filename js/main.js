var ksaRegex = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
var uaeRegex = /^((\+971|00971){1}(2|3|4|6|7|9|50|51|52|55|56){1}([0-9]{7}))$/;
var egyptRegex = /^(\+2|\+20)(010|011|012|015)\d{8}$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var arabicEnglishLetterRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
var navHeight = $(".navbar").outerHeight(); // Get the height of the navigation bar
var windowHeight = $(window).height(); // Get the height of the viewport (100vh)
 //$(".content").height(windowHeight - navHeight); // Calculate the remaining height

 let direction = "rtl"

$(document).ready(function () {

  const texts = document.querySelectorAll('p')

  texts.forEach((text)=>{
    text.style.direction = direction
  })


  $(".owl-carousel").owlCarousel({
    items: 8,
    margin: 1,
    autoplay: true,
    rtl: true,
    slideBy: 4,
    loop: true,
    responsive: {
      300: {
        items: 2,
        slideBy: 1,
      },
     
      400: {
        items: 2,
        slideBy: 1,
      },
      600: {
        items: 4,
        slideBy: 2,
      },
      900: {
        items: 6,
        slideBy: 2,
      },
      1000:{
        items:8
      }
    },
  });
});

$("#name").on("input", () => {
  if ($("#name").val() === "") {
    $("#name-error").text("هذا الحقل مطلوب ");
    return;
  }else if ( ! arabicEnglishLetterRegex.test( $("#name").val() )  ){

    
    $("#name-error").text("هذا الحقل حروف فقط ");
  }

  else if ($("#name").val().length < 5 || $("#name").val().length > 50) {
    $("#name-error").text("هذا الحقل غير صالح ");
  } 
  
  else {
    $("#name-error").text("");
  }
});

$("#email").on("input", () => {
  if ($("#email").val() === "") {
    $("#email-error").text("هذا الحقل مطلوب ");
    return;
  }

  if ( !emailRegex.test( $("#email").val() )) {

    

    $("#email-error").text("هذا الحقل غير صالح ");
  } else {
    $("#email-error").text("");
  }
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

$("#submitBtn").on("click", async(e) => {
  let userName = $("#name").val();
  let userEmail = $("#email").val();
  let phoneNumber = $("#phone").val();

  let internationalFormNumber =$("#countryCode").text() +$("#phone").val()


  if (userName === "" || userName.length < 5 || userName.length > 50 ) {
    $("#name-error").text("هذا الحقل غير صالح");
  }

  if (userEmail === "") {
    $("#email-error").text("هذا الحقل غير صالح");
  }

  if (phoneNumber === "") {
    $("#phone-error").text("هذا الحقل غير صالح");
  }

  if (
    ($("#name-error").text() ||
      $("#phone-error").text() ||
      $("#email-error").text()) != ""
  ) {
    e.preventDefault();
  } else {

    let data = {
      name: userName ,
      phone: internationalFormNumber ,
      email: userEmail ,
      description: $('#subject').val() ,
    };

    
    // Send the form data to the server using fetch API
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);



  }
});

document.getElementById("phone").addEventListener("input", (e) => {
  let code = document.getElementById("countryCode").innerText;
  let internationalNumber = code + e.target.value;

  console.log(e.target.value);
  console.log(internationalNumber);

  // Now correctly use the .test() method on the egyptRegex
  var isPhoneValid = [uaeRegex, egyptRegex, ksaRegex].some((regex) => {
    return regex.test(internationalNumber);
  });

  if (isPhoneValid) {
    debugger
    document.getElementById("phone-error").innerText = "";
  } else {
    document.getElementById("phone-error").innerText = "هذا الرقم غير صحيح"; // Clear error if valid
  }
  
});

// Update the button with the selected flag and code

var activeCard = 0;
var activeValueCard = 0;

// function animateCards(){
setInterval(() => {
  const cards = document.querySelectorAll(".cardx");

  cards.forEach((card) => {
    card.classList.remove("active");
  });

  cards[activeCard % 4].classList.add("active");

  activeCard++;
}, 1000);
// }


// function animateValueCards(){

setInterval(() => {
  const cards = document.querySelectorAll(".value-card");

  cards.forEach((card) => {
    card.classList.remove("active");
  });
  cards[activeValueCard % 4].classList.add("active");
  activeValueCard++;
}, 1500);
// }



$(".whatsAppcontact-us").on("click", () => {
  const url = "https://wa.me/20114886855";
  window.open(url, "_blank");
});

function updateActiveLink(link) {
  const allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach((link) => {
    link.classList.remove("active");
  });
  link.classList.add("active");
}

$("#card-arrow-1").on("click", () => {
  if ($("#vision-card-1").hasClass("vision-expanded")) {
    return;
  } else {
    $("#vision-card-1").addClass("vision-expanded");
    $("#vision-card-2").removeClass("vision-expanded");
  }
});

$("#card-arrow-2").on("click", () => {
  if ($("#vision-card-2").hasClass("vision-expanded")) {
    return;
  } else {
    $("#vision-card-2").addClass("vision-expanded");
    $("#vision-card-1").removeClass("vision-expanded");
  }
});

$("#countryCodeList .dropdown-item").on("click", function (e) {
  e.preventDefault();

  var newFlag = e.currentTarget.children[0].attributes["src"].nodeValue;
  var newCode = e.currentTarget.innerText.trim();

  $("#selectedCountryCode").text(newCode);
  $("#countryFlag").attr("src", newFlag);
});


$('.contact-us-navigator').on('click', ()=>{
  window.location.href='#contact-us'
} )

$('.services-navigator').on('click', ()=>{
  window.location.href='#services'
} )

function fetchService1 (){
  $('.service-widget').removeClass('active')
  $('#service-1').addClass('active')
 
   $('.service-content').addClass("d-none");
   $("#service-content-1").removeClass("d-none");
}

function fetchService2 (){

  

  $('.service-widget').removeClass('active')
 $('#service-2').addClass('active')

  $('.service-content').addClass("d-none");
  $("#service-content-2").removeClass("d-none");

  
}

function fetchService3 (){

  

  $('.service-widget').removeClass('active')
 $('#service-3').addClass('active')

  $('.service-content').addClass("d-none");
  $("#service-content-3").removeClass("d-none");
}

function fetchService4 (){
  $('.service-widget').removeClass('active')
 $('#service-4').addClass('active')

  $('.service-content').addClass("d-none");
  $("#service-content-4").removeClass("d-none");
}

$('#service-1 , .servie-1-footer').on ('click' , fetchService1
)


$('#service-2 , .servie-2-footer').on ('click' ,fetchService2
)


$('#service-3 , .servie-3-footer').on ('click' ,fetchService3 
)


$('#service-4 , .servie-4-footer').on ('click' ,fetchService4
)


$('.spaceX').on('click',()=>{

window.open('Https://x.com/twznsa_planning?s=21&t=EhvE92hH8GyvWQthHeOaJA','_blank')
})

$('.linkedin').on('click',()=>{

  window.open('Https://www.linkedin.com/company/twznsaalkhebrat/','_blank')
  })



  document.getElementById('download-pdf').addEventListener('click', function() {
    const pdfUrl = 'assets/Presentation-Tawazon.pdf';  // PDF URL
    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    anchor.setAttribute('download', 'Presentation-Tawazon.pdf');  // Sets the file name for download
    anchor.click();
});


$('.navbar-toggler').on('click' , ()=>{
  if(
  $('.navbar-toggler').attr('aria-expanded') === "true")
  {
  $('#nav-overlay').addClass('flex-column')
  }
  if(
     $('.navbar-toggler').attr('aria-expanded') === "false" ){
      $('#nav-overlay').removeClass('flex-column')
    $('#nav-overlay').addClass('flex-row')
   
  }

} )


/////////////////////////////////// send email //////////////////////// 

