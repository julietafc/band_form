"use strict";
const endpoint = "https://database1-8b34.restdb.io/rest/bands";
const apiKey = "617696a38597142da1745a34";

window.addEventListener("load", (e) => {
  document.querySelector(".add-button").addEventListener("click", () => {
    const data = {
      name: "The Smiths" + Math.floor.toFix(2),
      members: 4,
      country: "jofh@kea.dk",
      alive: true,
      year: 1999,
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
  copy.querySelector("h1").textContent = band.name;
  copy.querySelector(".members span").textContent = band.members;
  copy.querySelector(".country span").textContent = band.country;

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
    name: "Juli",
    members: 4,
    country: "jofh@kea.dk",
    alive: true,
    year: 1999,
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
      copy.querySelector(".members span").textContent = data.members;
      copy.querySelector(".country span").textContent = data.country;
    });
}

const form = document.querySelector("form");
// to change content (is like text Content)
// form.elements.name.value = "Jonas";

// altered HTML content
form.elements.name.disabled = true;

// other options if needed
// form.elements.name.setAttribute("disabled", true);
// console.log(form.elements.name.disabled);
// console.log(form.elements.name.getAttribute("disabled"));

// using focus
// document.querySelector("a").addEventListener("click", () => {
//   e.preventDefault();
//   form.elements.name.focus();
// });

// using JS

// form.setAttribute("novalidate", true);
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (form.checkValidity()) {
//     const data = {
//       name: form.elements.name.value,
//       members: form.elements.memebers.value,
//       country: form.elements.country.value,
//       alive: form.elements.alive.value,
//       year: form.elements.year.value,
//     };
//     console.log(data);
//     post(data, showFunction);
//   } else {
//     form.reportValidity();
//   }
// });
