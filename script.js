import { saveUserChoice, getUserData } from "./firebase.js";

let mealChoices = {
	"thursday-lunch": "",
	"thursday-dinner": "",
	"friday-lunch": "",
	"friday-dinner": "",
	"saturday-lunch": "",
	"saturday-dinner": ""
};

let mealMetadata = {
	"hot-dog": {
		name: "All Beef Hot Dog",
		image: "Assets\\hot-dog.png",
		description: "Juicy, grilled all-beef frank nestled in a soft bun."
	},
	"chicken-bake": {
		name: "Chicken Bake Wraps",
		image: "Assets\\chicken-bake.png",
		description: "Tender chicken, smoky bacon, and melted cheese wrapped in golden, buttery dough."
	},
	"popeyes": {
		name: "Popeyes Combo",
		image: "Assets\\chicken.png",
		description: "Crispy, golden-fried chicken paired with two soft dinner rolls."
	},
	"turkey-sub": {
		name: "Turkey Sub",
		image: "Assets\\sub-turkey.png",
		description: "Sliced turkey, melty cheese, and garden-fresh toppings on warm, toasty bread - served with a classic bag of chips on the side."
	},
	"tuna-sub": {
		name: "Tuna Sub",
		image: "Assets\\sub-tuna.png",
		description: "Zesty tuna salad, fresh veggies, and a soft, toasted roll for the perfect bite - served with a classic bag of chips on the side."
	},
	"veggie-sub": {
		name: "Veggie Sub",
		image: "Assets\\sub-veggie.png",
		description: "Crisp lettuce, juicy tomatoes, crunchy cucumbers, and melty cheese stacked high on a warm, toasted roll - served with a classic bag of chips on the side."
	},
	"chicken-sandwich": {
		name: "Crispy Chicken Sandwich",
		image: "Assets\\chicken-sandwich.png",
		description: "Crispy fried chicken, fresh lettuce, and creamy mayo on a soft, toasted bun—served with a bag of crunchy chips on the side."
	},
	"pizza-cheese": {
		name: "Cheese Pizza",
		image: "Assets\\pizza-cheese.png",
		description: "Classic mozzarella, tangy tomato sauce, and a perfectly crisp crust."
	},
	"pizza-chicken": {
		name: "Chicken Pizza",
		image: "Assets\\pizza-chicken.png",
		description: "Smoky BBQ chicken, gooey mozzarella, and sweet, tangy BBQ sauce on a golden, crispy crust."
	},
	"pizza-pepperoni": {
		name: "Pepperoni Pizza",
		image: "Assets\\pizza-pepperoni.png",
		description: "Zesty pepperoni, melty mozzarella, and rich tomato sauce on a golden, crispy crust."
	},
	"chinese-chow": {
		name: "Chinese Combo w/ Lo Mein",
		image: "Assets\\chinese-chow.png",
		description: "Savory stir-fried noodles paired with flavorful Chinese-style entrées."
	},
	"chinese-rice": {
		name: "Chinese Combo w/ Fried Rice",
		image: "Assets\\chinese-rice.png",
		description: "Fluffy, seasoned fried rice served alongside flavorful Chinese-style entrées."
	},
	"american": {
		name: "American Classic",
		image: "Assets\\american.png",
		description: "Spicy, saucy boneless chicken paired with creamy mac and cheese, smooth mashed potatoes, and rich gravy."
	},
	"caribbean": {
		name: "Caribbean Chicken N' Rice",
		image: "Assets\\caribbean.png",
		description: "Grilled chicken with seasoned rice, served with a Caribbean cabbage mix, beans, and a rich dark sauce drizzle."
	},
	"nigerian-chicken": {
		name: "Jollof Rice w/ Chicken",
		image: "Assets\\nigerian-chicken.png",
		description: "Flavor-packed jollof rice served with tender, seasoned chicken and crispy, caramelized fried sweet plantains."
	},
	"nigerian-turkey": {
		name: "Jollof Rice w/ Turkey",
		image: "Assets\\nigerian-turkey.png",
		description: "Flavor-packed jollof rice served with tender, seasoned chopped turkey and crispy, caramelized fried sweet plantains."
	},
	"none": {
		name: "No Meal",
		image: "Assets\\no-meal.png",
		description: "No meal selected."
	}
}

function populateReviewPage() {
	const days = [
		{ key: 'thursday-lunch', id: 'review-thursday-lunch' },
		{ key: 'thursday-dinner', id: 'review-thursday-dinner' },
		{ key: 'friday-lunch', id: 'review-friday-lunch' },
		{ key: 'friday-dinner', id: 'review-friday-dinner' },
		{ key: 'saturday-lunch', id: 'review-saturday-lunch' },
		{ key: 'saturday-dinner', id: 'review-saturday-dinner' }
	];

	days.forEach(({ key, id }) => {
		const mealKey = mealChoices[key];
		const meal = mealMetadata[mealKey];
		const container = document.getElementById(id);
		if (meal && container) {
			container.innerHTML = `
                <div class="overlap">
                    <img src="${meal.image}" alt="${meal.name}" />
                    <div class="text-wrapper">
                        <h4>${meal.name}</h4>
                        <p>${meal.description}</p>
                    </div>
                    <div class="rectangle"></div>
                </div>
            `;
		} else if (container) {
			container.innerHTML = `<div class="overlap"><div class="text-wrapper"><p>No selection.</p></div></div>`;
		}
	});
}
window.populateReviewPage = populateReviewPage;

function goToPage(pageId) {
	document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
	document.getElementById(pageId).classList.add('active');
	window.scrollTo({ top: 0, behavior: 'smooth' });
	if (pageId === 'page-review') {
		populateReviewPage();
	}
}
window.goToPage = goToPage;

function goToMenuPage(currentDay, nextDay) {
	if (mealChoices[currentDay] === "") {
		alert("Please select a meal.");
		return;
	}
	goToPage(nextDay);
}
window.goToMenuPage = goToMenuPage;

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.overlap').forEach(function (div) {
		div.addEventListener('click', function () {
			// Remove 'selected' from all siblings in the same grid
			this.parentElement.parentElement.querySelectorAll('.overlap').forEach(d => d.classList.remove('selected'));
			this.parentElement.parentElement.querySelectorAll('.none-button').forEach(d => d.classList.remove('selected'));
			// Add 'selected' to the clicked one
			this.classList.add('selected');
		});
	});

	document.querySelectorAll('.none-button').forEach(function (div) {
		div.addEventListener('click', function () {
			// Remove 'selected' from all siblings in the same grid
			this.parentElement.querySelectorAll('.overlap').forEach(d => d.classList.remove('selected'));
			// Add 'selected' to the clicked one
			this.classList.add('selected');
		});
	});

	const textarea = document.getElementById('confirmation-code');
	if (textarea) {
		// Submit on Enter
		textarea.addEventListener('keydown', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				submitCode();
			}
		});
	}
});

async function submitCode() {
	const code = document.getElementById('confirmation-code').value.trim();

	if (!code) return alert("Please enter a code.");
	goToPage('page-loading');

	// Simulated server response for demo purposes
	const encodedUrl = encodeURIComponent("https://docs.google.com/spreadsheets/d/e/2PACX-1vT51-1ICfq3wcyyGniGbfYEymxOKJLFqCx6cz_EttxtzFEdGHyh5NcPCwVy8lFPFQ_MtGAbd11FER_s/pubhtml#");
	const response = await fetch(`https://us-central1-food-e9814.cloudfunctions.net/fetchHtml?url=${encodedUrl}`);
	const registrationsHTML = await response.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(registrationsHTML, "text/html");
	const registrations = [doc.getElementById("1373506325").querySelectorAll("tbody tr"), doc.getElementById("1263249048").querySelectorAll("tbody tr"), doc.getElementById("1782656223").querySelectorAll("tbody tr"), doc.getElementById("1560370955").querySelectorAll("tbody tr"), doc.getElementById("1364364484").querySelectorAll("tbody tr"), doc.getElementById("2058449702").querySelectorAll("tbody tr")];

	let validation = "invalid";
	outerLoop:
	for (let i = 0; i < registrations.length; i++) {
		const region = registrations[i];
		for (let j = 0; j < region.length; j++) {
			const entry = region[j];
			const values = entry.querySelectorAll("td");
			if (values[1].innerHTML == code) {
				if ((values[9].innerHTML == "35-44" || values[9].innerHTML == "45-Above")) {
					validation = "ineligible";
				} else {
					if (await getUserData(code)) {
						validation = "used";
					} else {
						validation = "valid";
					}
				}
				break outerLoop;
			}
		}
	}

	if (validation == "invalid") {
		goToPage('page-error');
	} else if (validation == "used") {
		goToPage('page-duplicate');
	} else if (validation == "ineligible") {
		goToPage('page-error-eligibility');
	} else if (validation == "valid") {
		goToPage('page-menu-thursday-lunch');
	}
}
window.submitCode = submitCode;

function selectMeal(day, meal) {
	mealChoices[day] = meal;
}
window.selectMeal = selectMeal;

async function submitForm(event) {
	saveUserChoice(
		document.getElementById('confirmation-code').value.trim(),
		mealChoices['thursday-lunch'],
		mealChoices['thursday-dinner'],
		mealChoices['friday-lunch'],
		mealChoices['friday-dinner'],
		mealChoices['saturday-lunch'],
		mealChoices['saturday-dinner']
	);
	console.log("Form submitted.");
	goToPage('page-confirmation');
}
window.submitForm = submitForm;
