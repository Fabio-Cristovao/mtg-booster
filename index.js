// test to fetch api to get data from mtg domain
document.addEventListener("DOMContentLoaded", init, false);

function init() {
  let cardsGrid = document.getElementById("cards-grid");
  let cards = [];

  fetch("https://api.magicthegathering.io/v1/cards")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let cards = data;
      console.log(cards);
    });

  // show cards

  function showCards(cards) {
    cardsGrid.innerHTML = "";

    cards.map((card) => {
      cardsGrid.innerHTML = `
        
        <article>
          <img src=${card.imageUrl} alt="card image" />
        </article>

        `;
    });
  }

  cards.map((card) => {
    cardsGrid.innerHTML += `
    
    
    `;
  });
}
