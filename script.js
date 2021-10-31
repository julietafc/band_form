"use strict";
const endpoint = "https://database1-8b34.restdb.io/rest/bands";
const apiKey = "617696a38597142da1745a34";

window.addEventListener("load", (e) => {
  document.querySelector(".add-button").addEventListener("click", () => {
    const data = {
      name: "The Smiths" + Math.floor(Math.random() * (0 - 9)),
      year: 1999,
      country: "Australia",
      genre: "pop",
      live: true,
      comments: "Here there is some personal thoughts",
      color: "#6795A2",
    };
    post(data);
  });
});

function get() {
  document.querySelector(".listWrapper").innerHTML = "";
  fetch(endpoint + "?max=100", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then(showBands);
}

get();

function showBands(data) {
  data.forEach(showBand);
}

function showBand(band) {
  console.log(band);
  //grab the template
  const template = document.querySelector("template.postBand").content;

  //clone
  const copy = template.cloneNode(true);
  copy.querySelector("article").dataset.id = band._id;

  //adjust
  copy.querySelector(".name").textContent = band.name;
  copy.querySelector(".name").style.color = `#${band.color}`;
  copy.querySelector(".year span").textContent = band.country;
  copy.querySelector(".country span").textContent = band.year;
  copy.querySelector(".comments").textContent = `"${band.comments}"`;
  copy.querySelector(".band").style.setProperty("--band-color", `#${band.color}`);
  copy.querySelector("[data-genre]").textContent = band.genre;
  copy.querySelector("[data-live]").textContent = band.live;

  copy.querySelector(".delete").addEventListener("click", () => deleteIt(band._id));

  //append
  document.querySelector(".listWrapper").appendChild(copy);
}

function post(data) {
  // OPTIMISTIC INSERTS
  // showBand(data);
  const postData = JSON.stringify(data);
  fetch(endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => showBand(data));
}

function deleteIt(id) {
  document.querySelector(`article[data-id="${id}"]`).remove();
  fetch(`${endpoint}/${id}`, {
    // fetch("https://database1-8b34.restdb.io/rest/bands/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function put(id) {
  const data = {
    name: "Tame Impala",
    year: 2009,
    country: "Australia",
    genre: "alternative",
    live: true,
    comments: "Here there is some personal thoughts",
    color: "#6795A2",
  };

  const postData = JSON.stringify(data);
  fetch(`${endpoint}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": apiKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      const copy = document.querySelector(`article[data-id="${id}"]`);
      copy.querySelector("h1").textContent = data.name;
      copy.querySelector(".country span").textContent = data.country;
      copy.querySelector(".comments").textContent = data.comments;
    });
}

const form = document.querySelector("form");
console.log(form.elements);

form.setAttribute("novalidate", true);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    const data = {
      name: form.elements.name.value,
      year: form.elements.year.value,
      country: form.elements.country.value,
      genre: form.elements.genre.value,
      live: form.elements.live.value,
      comments: form.elements.comments.value,
      color: form.elements.color.value,
    };
    console.log(data);
    post(data, showBand);
  } else {
    form.reportValidity();
  }
});

// // to change content (is like text Content)
// form.elements.name.value = "Tash Sultana";

// altered HTML content
// form.elements.name.disabled = true;

// other options if needed
// form.elements.name.setAttribute("disabled", true);
// console.log(form.elements.name.disabled);
// console.log(form.elements.name.getAttribute("disabled"));

// using focus
// document.querySelector("a").addEventListener("click", () => {
//   e.preventDefault();
//   form.elements.name.focus();
// });
