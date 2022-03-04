// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  // declaration of global vasriables

  let cardsGrid = document.querySelector("#all-cards-container");
  let showCardsBtn = document.querySelector("#search-btn");
  let searchInput = document.querySelector("#title-search");
  console.log(searchInput.value);
  let colorSection = document.querySelector(".search-for-color");

  // form color variables

  let red = document.querySelector("#red");
  let blue = document.querySelector("#blue");
  let green = document.querySelector("#green");
  let black = document.querySelector("#black");
  let white = document.querySelector("#white");

  // console.log(cardsGrid);\

  // page addEventListener

  colorSection.addEventListener("change", colorSelection, false);
  showCardsBtn.addEventListener("click", showCards, false);

  //script logic

  let cardName = searchInput.value;
  console.log();
  let cards = [];
  let cardColor = [];
  let colorString;
  let url;

  function colorSelection(e) {
    let color = e.target.id;
    if (e.target.checked === true) {
      //console.log(e.target.id);

      cardColor.push(color);

      colorString = cardColor.toString();
      console.log(colorString);
    }
  }

  function showCards(e) {
    console.log(searchInput.value);
    if (searchInput.value == "") {
      fetch(`https://api.magicthegathering.io/v1/cards?colors=${colorString}`)
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = "erro ao carregar cartas"));
    } else {
      console.log("false");

      fetch(
        `https://api.magicthegathering.io/v1/cards?name=${searchInput.value}`
      )
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = "erro ao carregar cartas"));
    }

    e.preventDefault();
  }

  //console.log(cardName);

  function showCardsFilters() {
    cardsGrid.innerHTML = "";

    cards.map((card) => {
      let { imageUrl, name } = card;

      cardsGrid.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
              <button>Add card</button>
              <button>Remove card</button>
            </article>
            `;
    });

    // console.log(showCards);
  }

  cardName = "";
}
