import { db } from "./firebase.js";
import { ref, set } from "firebase/database";

function goToPage(pageId) {
	document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
	document.getElementById(pageId).classList.add('active');
}

function writeUserChoice(id, thursdayDinner, fridayLunch, fridayDinner, saturdayLunch, saturdayDinner) {
  const userRef = ref(db, `users/${id}`);
  set(userRef, {
    thursdayDinner: thursdayDinner,
    fridayLunch: fridayLunch,
    fridayDinner: fridayDinner,
    saturdayLunch: saturdayLunch,
    saturdayDinner: saturdayDinner
  });
}

async function submitCode() {
	const code = document.getElementById('confirmation-code').value.trim();

	if (!code) return alert("Please enter a code.");

	// Simulated server response for demo purposes
	const encodedUrl = encodeURIComponent("https://docs.google.com/spreadsheets/d/e/2PACX-1vT51-1ICfq3wcyyGniGbfYEymxOKJLFqCx6cz_EttxtzFEdGHyh5NcPCwVy8lFPFQ_MtGAbd11FER_s/pubhtml#");
	const response = await fetch(`https://us-central1-food-e9814.cloudfunctions.net/fetchHtml?url=${encodedUrl}`);
	const registrationsHTML = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(registrationsHTML, "text/html");
	const registrations = [doc.getElementById("1373506325").querySelectorAll("tbody tr"), doc.getElementById("1263249048").querySelectorAll("tbody tr"), doc.getElementById("1782656223").querySelectorAll("tbody tr"), doc.getElementById("1560370955").querySelectorAll("tbody tr"), doc.getElementById("1364364484").querySelectorAll("tbody tr"), doc.getElementById("2058449702").querySelectorAll("tbody tr")];
	
	validation = "invalid";
	outerLoop:
	for (let i = 0; i < registrations.length; i++) {
		const region = registrations[i];
		for (let j = 0; j < region.length; j++) {
			const entry = region[j];
			const values = entry.querySelectorAll("td");
			if (values[1].innerHTML == code && !(values[9].innerHTML == "35-44" || values[9].innerHTML == "45-Above")){
				validation = "valid";
				console.log("Valid code");
				break outerLoop;
			}
		}
	}


	if (validation == "invalid") {
		goToPage('page-error');
	} else if (validation == "used") {
		goToPage('page-duplicate');
	} else if (validation == "valid") {
		goToPage('page-menu');
	}
}

async function submitForm(event) {
	event.preventDefault();
	// You would normally send data to your server here
	console.log("Form submitted.");
	goToPage('page-confirmation');
}

// Fake server logic to simulate verification
async function fakeVerifyCode(code) {
	const validCodes = { "VALID123": "valid", "USED123": "used" };
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ status: validCodes[code] || "invalid" });
		}, 500);
	});
}
