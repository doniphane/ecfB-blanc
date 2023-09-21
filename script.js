let entries = [];
const cardcontainer = document.querySelector(".card-container");
const searchInput = document.getElementById("searchInput");
const rangeDisplay = document.getElementById("rangeDisplay");
const rangeInput = document.getElementById("rangeInput");
const sortBtn = document.getElementById("sortBtn");
const checks = document.getElementById("check");
const httpsCheck = document.getElementById("httpsCheck");
const authCheck = document.getElementById("authCheck");
let sortMethod = true;

async function fetchEntries() {
  const api = await fetch("https://api.publicapis.org/entries");
  const data = await api.json();
  entries = data.entries;
  displayEntries();
}

fetchEntries();

function displayEntries() {
  cardcontainer.innerHTML = "";
  entries
    .sort((a, b) => {
      if (sortMethod) {
        return a.API.localeCompare(b.API);
      } else {
        return b.API.localeCompare(a.API);
      }
    })
    .filter((a) => {
      if (httpsCheck.checked && authCheck.checked) {
        return (
          a.API.toLowerCase().includes(searchInput.value.toLowerCase()) &&
          a.HTTPS === true &&
          a.Auth === "apiKey"
        );
      }
      else if (httpsCheck.checked) {
        return (
          a.API.toLowerCase().includes(searchInput.value.toLowerCase()) &&
          a.HTTPS === true
        );
      } else if (authCheck.checked) {
        return (
          a.API.toLowerCase().includes(searchInput.value.toLowerCase()) &&
          a.Auth === "apiKey"
        );
      } else {
        return a.API.toLowerCase().includes(searchInput.value.toLowerCase());
      }
    })
    

    .slice(0, rangeInput.value)
    .forEach((e) => {
      cardcontainer.innerHTML += `<div class="carte">
          <div class="titre">
            <h1>${e.API}</h1>
          </div>
          <div class="decriptif">
            <p>
             ${e.Description}
            </p>
          </div>
          <div class="lien">
            <p>${e.Link}</p>
          </div>
          <div class="icons">
            <i class="fa-solid fa-lock"></i>
            <p>https ${e.HTTPS}</p>
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="icons2">
            <i class="fa-solid fa-user-lock"></i>
            <p>Auth ${e.Auth}</p>
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>`;
    });
}

rangeInput.addEventListener("change", (e) => {
  rangeDisplay.innerHTML = rangeInput.value;
  displayEntries();
});

searchInput.addEventListener("input", (e) => {
  displayEntries();
});

sortBtn.addEventListener("click", (e) => {
  sortMethod = !sortMethod;
  sortBtn.innerHTML = !sortMethod ? "A" : "D";
  displayEntries();
});

httpsCheck.addEventListener("change", () => {
  displayEntries();
});


authCheck.addEventListener("change", () => {
  displayEntries();
});
