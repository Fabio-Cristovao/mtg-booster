// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {

  // declaration of global vasriables

  let cardsGrid = document.querySelector('#all-cards-container');
  let showCardsBtn = document.querySelector("#search-btn");
  let searchInput = document.querySelector("#title-search");
  console.log(searchInput);
  let colorSearch = document.querySelector(".color-search");
  console.log(colorSearch);





  // console.log(cardsGrid);\

  // page addEventListener

  //showCardsBtn.addEventListener("click", showCards, false);
  showCardsBtn.addEventListener("click", showCards, false);
  /* searchColor.addEventListener("change", chooseColor, false)
  console.log(searchColor); */
  colorSearch.addEventListener("click", chooseColor, false)

  //script logic

  function chooseColor(e) {

    let color = e.target.id;

    if (color.checked === true) {

      console.log("color selected",)

    }




  }

  function showCards(e) {

    e.preventDefault();

    let cardName = "";
    cardName = searchInput.value

    //console.log(cardName);

    let cards = [];

    if (cardName !== "") {
      fetch(`https://api.magicthegathering.io/v1/cards?name=${cardName}`)
        .then(response => response.json())
        .then(data => {

          cards = data.cards;

          showCards()
          //console.log(cards)
        })
        .catch(error => cardsGrid.textContent = 'erro ao carregar cartas');
    } else {

    }






    function showCards() {

      cardsGrid.innerHTML = "";

      cards.map(card => {

        let {

          imageUrl,
          name,

        } = card;

        cardsGrid.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
              <button>Add card</button>
              <button>Remove card</button>
            </article>
            `
      });



      // console.log(showCards);

    }

    cardName = "";
  }


}


;

//show all cards




/* function paginated_fetch(
  url = "https://api.magicthegathering.io/v1/cards?", // Improvised required argument in JS
  page = 1,
  previousResponse = []
) {
  return fetch(`${url}&page=${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(newResponse => {
      const response = [...previousResponse, ...newResponse]; // Combine the two arrays

      if (response.length !== 0) {
        page++;

        return paginated_fetch(url, page, response);
      }

      return response;
    });
}

let cards = paginated_fetch(`https://api.magicthegathering.io/v1/cards?`)
console.log(cards) */