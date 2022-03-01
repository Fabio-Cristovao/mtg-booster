// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {

  // declaration of global vasriables

  let showAllCardsBtn = document.querySelector("#show-all-cards");
  let searchInput = document.querySelector("#title-search");
  console.log(searchInput);


  // console.log(cardsGrid);\

  // page addEventListener

  showAllCardsBtn.addEventListener("click", showAllCards, false);
  searchInput.addEventListener("input", (e) => searchForTitle(e.target.value), false);


  //script logic
  let cards = [];
  
  showAllCards();
  let titleSearchCards = [];



  // methods

  function showAllCards() {

    let cardsGrid = document.querySelector('#grid-container')
    console.log(cardsGrid)
    

    fetch('https://api.magicthegathering.io/v1/cards')
        .then(response => response.json())
        .then(data => { 

        cards = data.cards;
        
        showCards()
        console.log(cards)
        });
     
          /* .catch(error => cardsGrid.textContent = 'erro ao carregar cartas'); */  

        function showCards() {

        cards.map(card => {
      
          let {
      
            imageUrl,
            name,
      
          } = card;

          cardsGrid.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
            </article>
            `
          });

         // console.log(showCards);
            
          }    
        }
  
  function searchForTitle (text) {

    titleSearchCards = cards.filter( c => c.name.search(text) > -1);
    showAllCards(titleSearchCards);


  }

  
  };

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





