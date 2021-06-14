/**
* Template Name: FlexStart - v1.4.0
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();



function uuid4() {
    const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
    const view = new DataView(new ArrayBuffer(16)); /// Create a view backed by a 16-byte buffer
    crypto.getRandomValues(new Uint8Array(view.buffer)); /// Fill the buffer with random data
    view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40); /// Patch the 6th byte to reflect a version 4 UUID
    view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80); /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
}

var currentTab = 1; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "flex";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementsByClassName("prev")[0].style.display = "none";
  } else {
    document.getElementsByClassName("prev")[0].style.display = "block";
  }
  // if (n == (x.length - 1)) {
  //   document.getElementsByClassName("next")[0].innerHTML = "Submit";
  // } else {
  //   document.getElementsByClassName("next")[0].innerHTML = "Next";
  // }
  // ... and run a function that displays the correct step indicator:
  // fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  // if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :

  if (currentTab >= x.length) {
    //...the form gets submitted:
    // document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

$( ".prev" ).click(function() {
	nextPrev(-1);
});

$( ".next" ).click(function() {
	var selectedHospital = $( "select#hospitals option:selected" ).val();
	if (currentTab == 1) {
		if ($( "select#hospitals option:selected" ).length == 0) {
			return false;
		}

		$( "div#firstDate div.dates" ).html("");
		$( "input[type=hidden][name=firstDate]").val("");

		var slots = betterGetSlotsForHospital(selectedHospital);

		const uniqueDays = [...new Set(slots.map(x => x.RowKey.split(" ")[0]))];
		var wrapper = $("div#firstDate div.form-wrapper div.dates");

		uniqueDays.forEach(function (date) {
			var toAppend = `<h4 class="mt-3">${getDayName(date)} ${date}</h4>\
			<table class="table borderless dates first_date"><tbody>`

			var slotsForDay = slots.filter(function(value) {
				return value.RowKey.split(" ")[0] == date;
			})

			slotsForDay.forEach(function (slot) {
				var time = slot.RowKey.split(" ")[1];
				toAppend += `<tr><td data-val="${date} ${time}">${time}</td></tr>`;
			});

			toAppend += `</tbody></table>`;
			wrapper.append(toAppend);
		});

	} else if (currentTab == 2) {
		var firstDate = $( "input[type=hidden][name=firstDate]").val()

		if (firstDate == "") {
			return false;
		}
		$( "div#secondDate div.dates" ).html("");
		$( "input[type=hidden][name=secondDate]").val("");

		var slots;
		slots = betterGetSlotsForHospital(selectedHospital, firstDate);

		const uniqueDays = [...new Set(slots.map(x => x.RowKey.split(" ")[0]))];
		var wrapper = $("div#secondDate div.form-wrapper div.dates");

		uniqueDays.forEach(function (date) {
			var toAppend = `<h4 class="mt-3">${getDayName(date)} ${date}</h4>\
			<table class="table borderless dates second_date"><tbody>`

			var slotsForDay = slots.filter(function(value) {
				return value.RowKey.split(" ")[0] == date;
			})

			slotsForDay.forEach(function (slot) {
				var time = slot.RowKey.split(" ")[1];
				toAppend += `<tr><td data-val="${date} ${time}">${time}</td></tr>`;
			});

			toAppend += `</tbody></table>`;
			wrapper.append(toAppend);
		});

		var secondWrapper = $("div#firstDate div.form-wrapper div.dates");
	}
	nextPrev(1);
});

function getDayName(dateString) {
	var days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
	var d = new Date(dateString);

	return days[d.getDay() - 1 % 7];
}

function registerUser(UUID) {
	var formData = new FormData(document.getElementById("regForm"));
	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/FormRegisterPatient"

	var userFields = ["firstName", "surname", "birthDate", "residence", "phoneNumber", "mail", "insuranceNumber"];
	var userData = {"guid": uuid};

	userData["comment"] = $( "form#regForm textarea[name=comment]" ).val()

	userFields.forEach(function(element) {
		if (element == "insuranceNumber") {
			userData[element] = parseInt($( `form#regForm input[name=${element}]` ).val());
		} else {
			userData[element] = $( `form#regForm input[name=${element}]` ).val();
		}
	});
	postRequest(URL, userData, null);
}


function betterGetSlotsForHospital(hospital, date = null) {
	if (date == null) {
		date = new Date();
		date = getDateString(date);
		date = "2020-06-11 10:00";
	} else {
		date = new Date(date);
		date.setDate(date.getDate() + 42);
		date = getDateString(date);
	}

	var params = {"hospital" : hospital, "from": date};

	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/fetchterms";
	var res;
	$.ajax({url: URL, dataType: "json", async: false, data: params, success: function(data, status) {
		res = data;
	}})
	res = res || []
	return res;
}

function getDateString(date) {
	return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}


function getSlotsForHospital(hospital, minDate = null) {
	var date = new Date();
	date = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
	date = "2020-06-11 10:00";

	var params = {"hospital" : hospital, "from": date};

	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/fetchterms";
	return $.getJSON(URL, params);
}

function postRequest(url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			typeof callback === 'function' && callback();
		}
	};

	var dataSend = JSON.stringify(data);
	xhr.send(dataSend);
}

function registerUserForTerms(uuid) {
	var hospital = $( "select#hospitals option:selected" )[0].value;
	var firstDate = $( "form#regForm input[name=firstDate]" ).val();
	var secondDate = $( "form#regForm input[name=secondDate]" ).val();
}

function fillCounties() {
	const URL = "https://pa200-vacc-funtions.azurewebsites.net/api/SelectHospital";
	$.getJSON(URL, function(result) {
		countiesHospitals = result;
		
		Object.keys(countiesHospitals).forEach(function(county) {
			$( "select#county" ).append( `<option value="${county}">${county}</option>` );
		});
	});
}

function updateHospitals() {
	$( "select#hospitals" ).prop("disabled", false);
	$( "select#hospitals" ).html("");

	selectedCounty = $( "select#county option:selected" )[0].value;
	countiesHospitals[selectedCounty].forEach(function(hospital) {
		$( "select#hospitals" ).append( `<option value="${hospital.code}">${hospital.code}</option>` );
	});
}

$(function() {
	fillCounties();

	$( "form#regForm" ).submit(function(e) {
		e.preventDefault();

		uuid = uuid4();
		registerUser(uuid);
		registerUserForTerms(uuid);
	});
});



$( "select#county" ).change(updateHospitals);

$(document).on('click', 'table.dates.first_date td', function() {
	$( "input[type=hidden][name=firstDate]" ).val($(this).data("val"));

	$( "table.dates.first_date td" ).each(function() {
		$(this).removeClass("selected_date");
	});
	$(this).addClass("selected_date");

});

$(document).on('click', 'table.dates.second_date td', function() {
	$( "input[type=hidden][name=secondDate]" ).val($(this).data("val"));

	$( "table.dates.second_date td" ).each(function() {
		$(this).removeClass("selected_date");
	});
	$(this).addClass("selected_date");

});
