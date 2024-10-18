const URL = "https://superheroapi.com/api.php/";
const API_KEY = "7456440694115f87d4e6a5fe0be9cfcd";
const FULL_URL = `https://superheroapi.com/api.php/${API_KEY}`;
const inputEL = document.querySelector(".input-el");
const search = document.querySelector(".search");
const name = document.querySelector(".name");
const heroImg = document.querySelector(".hero-img");
const statsEl = document.querySelector(".stats");
const imageDiv = document.querySelector(".image");
const stats = document.querySelector(".stats");
const bio = document.querySelector(".bio");
const info = document.querySelector(".info");
const nameP = document.querySelector(".name-p");
const nameW = document.querySelector(".name-w");
const nameH = document.querySelector(".name-h");

const getSearchApi = async (name) => {
  try {
    const response = await fetch(`${FULL_URL}/search/${name}`);
    const data = await response.json();
    let hero = data.results[0];
    displayInfo(hero);
    if (name === "batman") {
      let hero = data.results[1];
      displayInfo(hero);
    }
  } catch (error) {
    console.log(error);
  }
};
const randomHeroApi = async (id) => {
  try {
    const response = await fetch(`${FULL_URL}/${id}`);
    const data = await response.json();
    displayInfo(data);
  } catch (error) {
    console.log(error);
  }
};
const randomHero = () => {
  let randomNumber = Math.floor(Math.random() * 731) + 1;
  randomHeroApi(randomNumber);
  info.classList.remove("hidden");
};

random.onclick = () => randomHero();

const searchHero = () => {
  let input = inputEL.value.toLowerCase();
  if (input === "") {
    return;
  } else if (input === "spiderman") {
    inputEL.value = "spider-man";
    getSearchApi(input);
    info.classList.remove("hidden");
  } else {
    getSearchApi(input);
    info.classList.remove("hidden");
  }
};
search.onclick = () => searchHero();

const displayInfo = (character) => {
  name.innerText = character.name;
  nameP.innerHTML = `Name: <strong>${
    Object.values(character.biography)[0]
  }</strong>`;
  nameW.innerHTML = `Weight: <strong>${character.appearance.weight[0]}</strong>`;
  nameH.innerHTML = `Height: <strong>${character.appearance.height[0]}</strong>`;
  imageDiv.innerHTML = `<img class='hero-img' src='${character.image.url}'>`;
  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      const statValue = character.powerstats[stat];
      const percentage = (statValue / 100) * 100; // Assuming 100 is the maximum stat value
      return `
      <div class="stat-wrapper">
        ${stat.toUpperCase()}: <span><strong>${statValue}</strong><span>
        <div class="line">
          <div class="fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
    })
    .join("");

  statsEl.innerHTML = stats;
};
