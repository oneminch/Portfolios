const data_json = {
   // Experience data list
   // Each data: id, name, date, description & link(?)
   exp_data: [
      {
         id: 1,
         name: "School 1",
         date: ["Jan '16","Dec '19"],
         desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum autem ab dolorem excepturi beatae fugit nulla deleniti voluptas reprehenderit temporibus consequuntur animi vero a ullam, nesciunt quam maiores minima et?",
         link: ["DDG", "https://ddg.gg"]
      },
      {
         id: 2,
         name: "School 2",
         date: ["Jan '16","Dec '19"],
         desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum autem ab dolorem excepturi beatae fugit nulla deleniti voluptas reprehenderit temporibus consequuntur animi vero a ullam, nesciunt quam maiores minima et?",
         link: ["DDG", "https://ddg.gg"]
      },
      {
         id: 3, 
         name: "School 3",
         date: ["Jan '16","Dec '19"],
         desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum autem ab dolorem excepturi beatae fugit nulla deleniti voluptas reprehenderit temporibus consequuntur animi vero a ullam, nesciunt quam maiores minima et?", 
         link: ["DDG", "https://ddg.gg"]
      },
      {
         id: 4,
         name: "School 4",
         date: ["Jan '16","Dec '19"],
         desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum autem ab dolorem excepturi beatae fugit nulla deleniti voluptas reprehenderit temporibus consequuntur animi vero a ullam, nesciunt quam maiores minima et?",
         link: ["DDG", "https://ddg.gg"]
      },
   ],
   // Projects data list
   proj_data: []
};


const all_exps = document.querySelectorAll(".experience__list__item");        // List of all experiences


// TODO
// - Fill experiences and projects on load with default values

// Loads experiences to UI: text, description + link(if applicable)
const loadExpData = (id) => {
   let markup = ``;
   const exp_data_list = data_json.exp_data;

   exp_data_list.forEach(item => {
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

// Loads projects to UI
const loadProjectData = (id) => {

};

// Switch to different experiences with timeline
all_exps.forEach(el => el.addEventListener('click', (e) => {
   let active_exp = document.querySelector(".experience__list__item--active"); // Currently active experience
   const clicked_exp = e.target.closest(".experience__list__item");
   const exp_id = parseInt(clicked_exp.dataset.exp_id);
   
   if (!clicked_exp.classList.contains("experience__list__item--active")) {
      // Adds active class to clicked experience circle in timeline
      active_exp.classList.remove("experience__list__item--active");
      clicked_exp.classList.add("experience__list__item--active");
      
      // Loads experience data correponding clicked circle
      const markup = loadExpData(exp_id);
      const exp_details = clicked_exp.parentElement.parentElement.previousElementSibling;
      exp_details.innerHTML = markup;
   }
}));