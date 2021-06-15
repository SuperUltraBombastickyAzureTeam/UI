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
	// taken from stackoverflow

    const ho = (n, p) => n.toString(16).padStart(p, 0); /// Return the hexadecimal text representation of number `n`, padded with zeroes to be of length `p`
    const view = new DataView(new ArrayBuffer(16)); /// Create a view backed by a 16-byte buffer
    crypto.getRandomValues(new Uint8Array(view.buffer)); /// Fill the buffer with random data
    view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40); /// Patch the 6th byte to reflect a version 4 UUID
    view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80); /// Patch the 8th byte to reflect a variant 1 UUID (version 4 UUIDs are)
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; /// Compile the canonical textual form from the array data
}

var currentTab = 0; // Current tab is set to be the first tab (0)
function showTab(n) {
  // taken from demo

  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "flex";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementsByClassName("prev")[0].style.display = "none";
  } else {
    document.getElementsByClassName("prev")[0].style.display = "block";
  }
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

		var slots = getSlotsForHospital(selectedHospital);
		if (slots.length == 0) {
			return false;
		}


		const uniqueDays = [...new Set(slots.map(x => x.RowKey.split(" ")[0]))];
		var wrapper = $("div#firstDate div.form-wrapper div.dates");

		uniqueDays.forEach(function (date) {
			var slotsForDay = slots.filter(function(value) {
				return value.RowKey.split(" ")[0] == date && value.Current < value.Max;
			})

			if (slotsForDay.length == 0) {
				return;
			}

			var toAppend = `<h4 class="mt-3">${getDayName(date)} ${date}</h4>\
			<table class="table borderless dates first_date"><tbody>`


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
		slots = getSlotsForHospital(selectedHospital, firstDate);

		const uniqueDays = [...new Set(slots.map(x => x.RowKey.split(" ")[0]))];
		var wrapper = $("div#secondDate div.form-wrapper div.dates");

		uniqueDays.forEach(function (date) {
			var slotsForDay = slots.filter(function(value) {
				return value.RowKey.split(" ")[0] == date && value.Current < value.Max;
			})

			if (slotsForDay.length == 0) {
				return;
			}

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
	var response = postRequest(URL, userData, null, false);
	return response;
}


function getSlotsForHospital(hospital, date = null) {
	if (date == null) {
		date = new Date();
		date = getDateString(date);

		// TODO: hardcoded?!
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

function postRequest(url, data, callback, async = true) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, async);
	xhr.setRequestHeader("Content-Type", "application/json");

	var response = {}
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			response["status"] = xhr.status;
			response["data"] = xhr.responseText;

			typeof callback === 'function' && callback(xhr.responseText);
		}
	};

	var dataSend = JSON.stringify(data);
	xhr.send(dataSend);
	if (async == false) {
		if (response["data"] == null || response["data"] == "null") {
			return null;
		}
		return response;
	}
}

function registerUserForTerms(data) {
	data = JSON.parse(data)

	var uuid = data["guid"];
	var vaccinatedAtHospital = data["hospital"];
	var firstVaccination = data["firstTerm"];
	var secondVaccination = data["secondTerm"];

	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/termregisterpatient";

	var hospital = $( "select#hospitals option:selected" )[0].value;

	if (firstVaccination != undefined && secondVaccination != undefined) {
		// TODO: proper alert
		// both vaccines given
		console.log("firstVaccination != undefined && secondVaccination != undefined")
		return false;
	} else if (firstVaccination == undefined && secondVaccination != undefined) {
		// TODO: proper alert
		// major bug
		console.log("firstVaccination == undefined && secondVaccination != undefined")
		return false;
	} else if (firstVaccination == undefined && secondVaccination == undefined) {

		if (vaccinatedAtHospital != undefined && hospital != vaccinatedAtHospital) {
			// TODO: proper alert
			// both vacciness must be given in the same hospital
			console.log("hospital != vaccinatedAtHospital");
			return false;
		}

		// no vaccines given
		var date1 = $( "form#regForm input[name=firstDate]" ).val();
		var date2 = $( "form#regForm input[name=secondDate]" ).val();

		var data1 = {"hospital": hospital, "datetime": date1, "guid": uuid};
		var data2 = {"hospital": hospital, "datetime": date2, "guid": uuid};

		console.log("firstVaccination == undefined && secondVaccination == undefined")

		postRequest(URL, data1, null, true);
		postRequest(URL, data2, null, true);

	} else if (firstVaccination != null) {

		console.log("firstVaccination != null");

		// only first vaccine given
		// TODO: create no-option-selected firstDate button
		var date1 = new Date(firstVaccination);
		var date2 = $( "form#regForm input[name=secondDate]" ).val();

		var date = new Date(date2);
		date1.setDate(date1.getDate() + 42);
		if (date < date1) {
			console.log("date < date1");
			// TODO: proper alert
			// there needs to be a 6-week period between vaccines
			return false
		}

		var data2 = {"hospital": hospital, "datetime": date2, "guid": uuid};
		postRequest(URL, data2, null, true);
	}
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

function login() {
	var username = $( "form#hospitalLogin input#username" ).val();
	var password = $( "form#hospitalLogin input#password" ).val();

	var data = {"username": username, "passwrd": password};
	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/HospitalLogin";

	var response = postRequest(URL, data, null, false);
	console.log(response);
	if (response.status == 200) {
		// https://stackoverflow.com/questions/16746288/javascript-login-cookies
		// var uuid = response["guid"]

		var today = new Date(); // Actual date
		var expire = new Date(); // Expiration of the cookie

		var cookie_name = "login"; // Name for the cookie to be recognized
		var number_of_days = 14; // Number of days for the cookie to be valid (10 in this case)

		expire.setTime( today.getTime() + 60 * 60 * 1000 * 24 * number_of_days ); // Current time + (60 sec * 60 min * 1000 milisecs * 24 hours * number_of_days)

		// TODO: hardcoded value
		// document.cookie = cookie_name + "=" + escape(data["username"]) + "; expires=" + expire.toGMTString() + "SameSite=None; Secure";

		document.cookie = cookie_name + "=" + escape("Fakultní nemocnice Brno") + "; expires=" + expire.toGMTString() + "SameSite=None; Secure";
	}
	return response;
}

function isLogged() {
	// https://stackoverflow.com/a/25617724
	return document.cookie.match(/^(.*;)?\s*login\s*=\s*[^;]+(.*)?$/);
}

function getCookie(name) {
	// https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript

	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function logout() {
	document.cookie = "login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}

function fillPatientsTable() {
	var table = $( "table#patientsList tbody" );
	// var slots = getSlotsForHospital(getCookie("login"), getDateString(new Date()));
	var slots = getSlotsForHospital(getCookie("login"), "2021-01-01 10:10");
	slots.forEach(function(slot) {
		var dateTime = slot["RowKey"];
		var patients = slot["Registered"];

		if (patients == undefined) {
			return;
		}

		patients.split(";").forEach(function(patient) {
			id = patient;

			var patientInfo = getInfoAboutPatient(patient, null, false);
			var vaccinationDates = "";

			if (patientInfo != null && patientInfo["data"] != null) {

				patientInfo = JSON.parse(patientInfo.data)
				vaccinationDates = patientInfo["vaccinationDates"] || vaccinationDates;

				id = `${patientInfo["firstName"]} ${patientInfo["surname"]}`;
			}

			vaccinationDates = vaccinationDates.split(";");

			var row = `<tr data-datetime="${dateTime}" data-uuid="${patient}">
						<td>${dateTime}</td>
						<td>${id}</td>
						<td>
						 <button type="button" class="w-100 infoButton" data-datetime="${dateTime}" data-uuid="${patient}" data-bs-toggle="modal" data-bs-target="#patientInfo">Zobrazit informace</button>
						</td>
						<td>`

			if (!vaccinationDates.includes(dateTime)) {
				row += `<button type="button" class="w-100 confirmButton" data-datetime="${dateTime}" data-uuid="${patient}" data-bs-toggle="modal" data-bs-target="#confirmVaccination">Potvrdit očkování</button>`
			}
							
			row += `</td></tr>`;
			table.append(row);
		});
	});
}

function displayAdmin() {
	if (isLogged()) {
		$("div#loggedIn").find("*").show();
		$("div#loggedOut").find("*").hide();

		fillPatientsTable();

	} else {
		$("div#loggedIn").find("*").hide();
		$("div#loggedOut").find("*").show();
	}
}

function appendToInfo(data) {
	data = JSON.parse(data);
	if (data == null) {
		return;
	}
	var modalBody = $( "div#patientInfo div.modal-body" );
	modalBody.html(`<ul><li><b>Jméno</b>: ${data.firstName}</li>
						<li><b>Příjmení</b>: ${data.surname}</li>
						<li><b>Číslo pojištěnce</b>: ${data.insuranceNumber}</li>
						<li><b>Adresa trvalého bydliště</b>: ${data.residence}</li>
						<li><b>Datum narození</b>: ${data.birthDate}</li>
						<li><b>Telefonní číslo</b>: ${data.phoneNumber}</li>
						<li><b>Email</b>: ${data.mail}</li>
						<li><b>Komentář</b>: ${data.comment}</li>
					</ul>`);
}

function getInfoAboutPatient(uuid, callback, async = true) {
	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/FetchPatientInfo";
	var param = {"guid": uuid};
	
	if (!async) {
		return postRequest(URL, param, callback, async);
	}

	postRequest(URL, param, callback, async);
}

function csvToJSON(content) {
	if (content == "") {
		return false;
	}

	var headers = ["datetime", "max"]
	var rows = content.split(/\r?\n/);
	var hospital = getCookie("login");

	var result = {"hospital": hospital}
	var terms = []

	var data = rows.slice(1, rows.length - 1);
	data.forEach(function(row) {
		var tmp = {}
		var dataFields = row.split(/,/);

		if (headers.length != dataFields.length) {
			// row length mismatch
			return false;
		}

		headers.forEach(function( field, i) {
			if (field == "max") {
				tmp[field] = parseInt(dataFields[i]);
			} else {
				tmp[field] = dataFields[i];
			}
		});

		terms.push(tmp);
	});

	result["terms"] = terms;
	return result;
}

function readCSV() {
	var file = $( "input[type=file]" )[0].files[0];
	if (file == undefined) {
		return false;
	}

	var reader = new FileReader();
	reader.onload = function () {
		var contents = csvToJSON(reader.result);
		// batch upload endpoint
		var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/insertterms";
		postRequest(URL, contents, null);
		location.reload();
	};
	// start reading the file. When it is done, calls the onload event defined above.
	reader.readAsBinaryString(file);
}

function confirmVaccination(uuid, hospitalName, vaccinationDate) {
	var URL = "https://pa200-vacc-funtions.azurewebsites.net/api/attendvaccination";
	var data = {"guid": uuid,
				"hospitalName": hospitalName,
				"vaccinationDate": vaccinationDate};

	response = postRequest(URL, data, null);
	$( "#confirmVaccination" ).modal("hide");
	$( `tr[data-datetime="${vaccinationDate}"][data-uuid="${uuid}"] button.confirmButton` ).hide();
}

$(function() {
	var href = window.location.href;
	if (href.includes("index")) {
		showTab(currentTab); // Display the current tab
		fillCounties();
	} else if (href.includes("hospital")) {
		displayAdmin();
	}

	$( "form#regForm" ).submit(function(e) {
		e.preventDefault();

		uuid = uuid4();
		var response = registerUser(uuid);
		console.log(response);
		if (response["status"] == 200) {
			data = response["data"];
			registerUserForTerms(data);
			location.reload();
		}
	});

	$('#patientInfo').on('hidden.bs.modal', function () {
		$(this).find(".modal-body").html("")
	});

	$( "form#hospitalLogin" ).submit(function(e) {
		e.preventDefault();

		login();
		location.reload();
	});

	$( "button#logout" ).click(function() {
		logout();
		location.reload();
	});

	$( "form#batchUpload" ).submit(function(e) {
		e.preventDefault();

		readCSV();
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

$(document).on("click", "button.confirmButton", function() {
	var confirmationButton = $( "div#confirmVaccination button#yes" );
	confirmationButton.data("uuid", $(this).data("uuid"));
	confirmationButton.data("datetime", $(this).data("datetime"));
});

$(document).on("click", "button#yes", function() {
	confirmVaccination($(this).data("uuid"), getCookie("login"), $(this).data("datetime"));
});

$(document).on('click', 'table#patientsList button.infoButton', function() {
	var uuid = $(this).data("uuid");
	getInfoAboutPatient(uuid, appendToInfo, true);
});
