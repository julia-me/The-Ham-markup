$(document).ready(function() {

  // Adding Animation

  new WOW().init();

// Filter for images (section work)

  var $grid = $('.grid').isotope({  
  });
  $('.filter-button-group').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });


  // Burger
  $('.burger').on('click', function(e){
    e.preventDefault();
    $('.menu').slideToggle(500);
  })

  $('.search-btn').on('click', function(e){
    e.preventDefault();
    $('.search__area').slideToggle(300);
  })

  $(window).on('scroll', function(){
    if ($(window).scrollTop()){
      $('.header').addClass('sticky');
    }
    else {
      $('.header').removeClass('sticky');
    }
  })


  // Scroll

  $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .not ('[href^="#item"]')
  .not ('[href^="#about-link__"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  $("#dateplaceholder").change(function(evt) {
    var date = new Date($("#dateplaceholder").val());
    $("#dateplaceholder").attr("type", "text");
    $("#dateplaceholder").val(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
  });
  $("#dateplaceholder").focus(function(evt) {
    $("#dateplaceholder").attr("type", "date");
    setTimeout('$("#dateplaceholder").click();', 500);
  });
  $("#dateplaceholder").attr("type", "text");


  // Sliders 
  $(".lazy").slick({
    dots: false,
    // arrows : true,
    slidesToShow: 1,
    autoplay: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: true,
        slidesToShow: 1,
        // autoplay: true,
        // autoplaySpeed: 1000,
      },
  }]
  });

  $(".fade").slick({
    infinite: true,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.images_dotted', // указываем что навигация для слайдера будет отдельно (указываем класс куда вешаем навигацию)
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: false,
        slidesToShow: 1,
      },
  }]

  });

  $('.images_dotted').slick({ // настройка навигации
    slidesToShow: 4, // указываем что нужно показывать 3 навигационных изображения
    asNavFor: '.fade', // указываем что это навигация для блока выше
    focusOnSelect: true, // указываем что бы слайделось по клику
    arrows : false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        arrows: false,
        dots: false,
      },
  }]
});


//Tabset

jQuery(function(){
	initTabs();
});

function initTabs() {
	jQuery('ul.tabset').contentTabs({
		// autoHeight: true,
		// animSpeed: 200,
		// effect: 'fade',
		// tabLinks: 'a'
	});
}

// Isotope (section work)

var initial_items = 12;
var next_items = 4;
var $grid = $('#grid').isotope({
    itemSelector: '.work__item',
    layoutMode: 'fitRows',
    stamp: '.work__item--static'
});

// bind filter button click
$('.button-group-home').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  $grid.isotope({filter: filterValue});
  updateFilterCounts();
});
function updateFilterCounts() {
  // get filtered item elements
  var itemElems = $grid.isotope('getFilteredItemElements');
  var count_items = $(itemElems).length;
 
  if (count_items > initial_items) {
      $('#showMore').show();
  }
  else {
      $('#showMore').hide();
  }
  if ($('.work__item').hasClass('visible_item')) {
      $('.work__item').removeClass('visible_item');
  }
  var index = 0;

  $(itemElems).each(function () {
      if (index >= initial_items) {
          $(this).addClass('visible_item');
      }
      index++;
  });
  $grid.isotope('layout');
}
// change is-checked class on buttons
$('.button-group-home').each(function (i, buttonGroup) {
  var $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
  });
});

function showNextItems(pagination) {
  var itemsMax = $('.visible_item').length;
  var itemsCount = 0;
  $('.visible_item').each(function () {
      if (itemsCount < pagination) {
          $(this).removeClass('visible_item');
          itemsCount++;
      }
  });
  if (itemsCount >= itemsMax) {
      $('#showMore').hide();
  }
  $grid.isotope('layout');
}
// function that hides items when page is loaded
function hideItems(pagination) {
  var itemsMax = $('.work__item').length;
  var itemsCount = 0;
  $('.work__item').each(function () {
      if (itemsCount >= pagination) {
          $(this).addClass('visible_item');
      }
      itemsCount++;
  });
  if (itemsCount < itemsMax || initial_items >= itemsMax) {
      $('#showMore').hide();
  }
  $grid.isotope('layout');
}
$('#showMore').on('click', function (e) {
  e.preventDefault();
  showNextItems(next_items);
});
hideItems(initial_items);

// Modal window 

$(".purchase-modal").click(function(){
  Swal.fire({
    type: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href> Reload a webpage to fix the problem ?</a>'
  })
});

$(".benefits-modal").click(function(){
  (async () => {

    const { value: email } = await Swal.fire({
      title: 'Enter your email address',
      input: 'email',
      inputPlaceholder: 'Email address'
    })
    
    if (email) {
      Swal.fire('Entered email: ' + email)
    }

    const { value: accept } = await Swal.fire({
      title: 'Terms and conditions',
      input: 'checkbox',
      inputValue: 1,
      inputPlaceholder:
        'I agree with the terms and conditions',
      footer: '<a class="red" target="_blank" href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/"> I want to read terms and conditions </a>',
      confirmButtonText: 
        'Continue <i class="fa fa-arrow-right></i>',
      inputValidator: (result) => {
        return !result && 'You need to agree with terms and conditions.'
      }
    })
    
    if (accept) {
      Swal.fire('You agreed with terms and conditions :) <br>  We will send you the best offers from our company via email!')
    }

    })()

});


$('.red').click(function(){
  window.open('_blank');
});

});