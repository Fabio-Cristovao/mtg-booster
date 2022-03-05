// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  // declaration of global variables

  let cardsGrid = document.querySelector("#all-cards-container");
  let showCardsBtn = document.querySelector("#search-btn");
  let searchInput = document.querySelector("#title-search");
  console.log(searchInput.value);
  let colorSection = document.querySelector(".search-for-color");
  let myCollection = document.querySelector("#my-cards-container");
  console.log(myCollection);

  // form color variables

  let red = document.querySelector("#red");
  let blue = document.querySelector("#blue");
  let green = document.querySelector("#green");
  let black = document.querySelector("#black");
  let white = document.querySelector("#white");

  // console.log(cardsGrid);\

  // page addEventListener

  //colorSection.addEventListener("change", colorSelection, false);
  showCardsBtn.addEventListener("click", showCards, false);
  cardsGrid.addEventListener("click", gridEvents, false);

  //script logic

  let cards = [];
  let cardColor = [];
  let colorString;
  let myCards = [];

  /* function colorSelection(e) {
    let color = e.target.id;
    if (e.target.checked === true) {
      //console.log(e.target.id);

      cardColor.push(color);

      colorString = cardColor.toString();
      console.log(colorString);
    }
  } */

  function gridEvents(e) {
    if (e.target.className === "add-btn") {
      let id = e.target.dataset.id;
      // console.log(id);

      cards.filter((card) => {
        if (card.id === id) {
          myCards.push(card);
        }

        showMyCards();
      });

      //console.log(myCards);
    }

    e.preventDefault();
  }

  function showMyCards() {
    myCollection.innerHTML = "";

    myCards.map((card) => {
      let { imageUrl, name, id } = card;

      console.log(myCards);

      myCollection.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
              <button class="add-btn" data-id=${id}>Add card</button>
              <button>Remove card</button>
            </article>
            `;
    });
  }

  function showCards(e) {
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
      let { imageUrl, id } = card;

      cardsGrid.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
              <button class="add-btn" data-id=${id}>Add card</button>
              <button>Remove card</button>
            </article>
            `;
    });

    // console.log(showCards);
  }
}
