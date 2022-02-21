
export let cards = [];

export let cardsGrid = document.querySelector('#grid-container')
console.log(cardsGrid)

export let getInfo = () => {

  fetch('https://api.magicthegathering.io/v1/cards')
        .then(response => response.json())
        .then(data => { 

        cards = data.cards;


        showCards();
        // console.log(data.cards)
                  
  })

        .catch(error => cardsGrid.textContent = 'erro ao carregar cartas');

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
          })
      
          // console.log(cards)
      }
}

  




  





   

