const all_exps = document.querySelectorAll(".experience__list__item"); // List of all experiences
const current_exp = document.querySelector(".experience__current"); // My current up to date experience
const footer_text = document.querySelector(".footer__text"); // Footer text with copyright content
const projects__container = document.querySelector(".projects__container");
const contact_form = document.querySelector(".contact"); // Contact form
const contact_show = document.querySelector(".contact-btn");
const contact_close = document.querySelector(".contact__close");

const data_json = {
	// Experience data list
	// Each data: id, name, date, description & link(?)
	exp_data: [
		{
			id: 1,
			name: "Freelance Web Designer 📱",
			date: ["Sep '17", "Nov '17"],
			desc:
				"I helped design and develop a landing page as well as a logo for an app by independent iOS developer.",
			link: [
				/* "DDG", "https://ddg.gg" */
			],
		},
		{
			id: 2,
			name: "Mini-Projects 💻",
			date: ["Jul '17", "Present"],
			desc:
				"I like to work on small projects to solidify new concepts I'm learning.",
			link: ["@GitHub", "https://github.com/oneminch?tab=repositories"],
		},
		{
			id: 3,
			name: "OpenGenus Foundation 📝",
			date: ["Sep '19", "Feb '20"],
			desc:
				"As a Software Developer Intern at the OpenGenus Foundation, I was mainly involved in writing articles related to various web development topics.",
			link: ["Profile", "https://iq.opengenus.org/author/durg"],
		},
		{
			id: 4,
			name: "Tennessee Tech 🎓",
			date: ["Aug '17", "Dec '21 (exp.)"],
			desc:
				"I'm currently a junior at Tennessee Tech University majoring in computer science; I transferred half-way from a 2 year college at which I majored in Information Management Systems.",
			link: ["Homepage", "https://tntech.edu"],
		},
	],

	// Projects data list
	// Each data: id, name, url, image url & description
	proj_data: [
		{
			name: "Newsfeed",
			url: "https://oneminch.dev/newsfeed/",
			app_icon: "img/logos/newsfeed.svg",
			desc:
				"A news app that loads the latest 20 headlines using the NewsAPI based on a category selected.",
		},
		{
			name: "EncryptedList",
			url: "https://oneminch.dev/encryptedlist/",
			app_icon: "img/logos/encryptedlist.svg",
			desc:
				"A collective list of apps and services offering end-to-end encryption with filtering options.",
		},
		{
			name: "Dolist",
			url: "https://oneminch.dev/dolist/",
			app_icon: "img/logos/dolist.svg",
			desc:
				"A to-do app built with jQuery with ability to add, complete, edit and delete tasks (First JS Project)",
		},
		{
			name: "Timer",
			url: "https://oneminch.dev/timer/",
			app_icon: "img/logos/timer.png",
			desc:
				"A simple task-based timer app: records time and saves it to a certain task.",
		},
	],
};

// Renders text with current year to footer
const footerText = () => {
	let d = new Date();

	let markup = `
      Designed && Coded by Me
      <br>
      &copy; ${d.getFullYear()}
   `;
	footer_text.innerHTML = markup;
};

// Returns experience data markup: text, description + link(if applicable)
const loadExpData = (id) => {
	let markup = ``;
	const exp_data_list = data_json.exp_data;

	exp_data_list.forEach((item) => {
		// if id matches, fill basic data
		if (item.id === id) {
			markup = `
            <h2 class="experience__current__title">${item.name}</h2>
            <h3 class="experience__current__date">(${item.date[0]} - ${item.date[1]})</h3>
            <div class="experience__current__desc">
               ${item.desc}
            </div>
         `;

			// Hides button if there's no link
			if (item.link.length === 0) {
				markup += `<a href="#" class="experience__current__link experience__current__link--inexistent">Inexistent</a>`;
			} else {
				markup += `<a href="${item.link[1]}" target="_blank" class="experience__current__link">${item.link[0]}</a>`;
			}
		}
	});
	return markup;
};

// Renders experience from given id to container
const renderExp = (id, container) => {
	let curr_exp_markup = loadExpData(id);
	container.innerHTML = curr_exp_markup;
};

// Load footer text & renders current experience on load
window.addEventListener("load", () => {
	// Render footer text
	footerText();

	// Highlights current experience indicator circle
	const curr_exp_indicator = all_exps[all_exps.length - 1];
	curr_exp_indicator.classList.add("experience__list__item--active");

	// Current experience from json file
	const exp_obj_list = data_json.exp_data;
	const curr_exp_obj = exp_obj_list[exp_obj_list.length - 1];

	renderExp(curr_exp_obj.id, current_exp);
	renderProjectData(data_json.proj_data);
});

// Renders projects to UI
const renderProjectData = (projectList) => {
	let markup = ``;
	for (let i = 0; i < projectList.length; i++) {
		markup += `
         <a href="${projectList[i].url}" target="_blank" class="projects__project">
            <div class="icon">
               <img src="${projectList[i].app_icon}" alt="Project Icon"/>
            </div> 
            <h4 class="name">${projectList[i].name}</h4>
            <div class="desc">${projectList[i].desc}</div>
         </a>
      `;
	}
	projects__container.innerHTML = markup;
};

// Switch to different experiences with timeline
all_exps.forEach((el) =>
	el.addEventListener("click", (e) => {
		let active_exp = document.querySelector(
			".experience__list__item--active"
		); // Currently active experience
		const clicked_exp = e.target.closest(".experience__list__item");
		const exp_id = parseInt(clicked_exp.dataset.exp_id);

		if (!clicked_exp.classList.contains("experience__list__item--active")) {
			// Adds active class to clicked experience circle in timeline
			active_exp.classList.remove("experience__list__item--active");
			clicked_exp.classList.add("experience__list__item--active");

			// Loads experience data correponding clicked circle
			const exp_container =
				clicked_exp.parentElement.parentElement.previousElementSibling;
			renderExp(exp_id, exp_container);
		}
	})
);

// Toggle to show/hide contact form
contact_show.addEventListener("click", () => {
	contact_form.classList.add("show-form");
	contact_form.classList.remove("hide-form");
});

contact_close.addEventListener("click", () => {
	contact_form.classList.remove("show-form");
	contact_form.classList.add("hide-form");
});
