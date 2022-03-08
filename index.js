// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  // declaration of global variables

  let allCardsGrid = document.querySelector("#all-cards-container");
  let showCardsBtn = document.querySelector("#search-btn");
  let searchInput = document.querySelector("#title-search");
  //console.log(searchInput.value);
  /*  let colorSection = document.querySelector(".search-for-color"); */
  let myCollection = document.querySelector("#my-cards-container");
  //console.log(myCollection);
  let myCollectionGrid = document.querySelector("#my-cards-container");
  //console.log(myCollectionGrid);
  let seeDetails = document.querySelector("#see-details");

  //console.log(seeDetails);

  // form color variables

  /* let red = document.querySelector("#red");
  let blue = document.querySelector("#blue");
  let green = document.querySelector("#green");
  let black = document.querySelector("#black");
  let white = document.querySelector("#white"); */

  // console.log(cardsGrid);\

  // page addEventListener

  //colorSection.addEventListener("change", colorSelection, false);
  showCardsBtn.addEventListener("click", showCards, false);
  searchInput.addEventListener("keypress", showCardsUsingEnter, false);
  allCardsGrid.addEventListener("click", allCardsGridEvents, false);
  myCollectionGrid.addEventListener("click", myCollectionGridEvents, false);
  //console.log(myCollectionGrid);
  seeDetails.addEventListener("click", hideDetails, false);

  //script logic

  let cards = [];
  let colorString;
  let myCards = [];
  let myNotes = [];

  function allCardsGridEvents(e) {
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

  function myCollectionGridEvents(e) {
    //console.log(e.target.id);

    if (e.target.className === "del-btn") {
      let delId = e.target.dataset.delbtn;
      console.log(delId);
      deleteCard(delId);
    }

    if (e.target.nodeName === "IMG") {
      //console.log("this section");
      let seeDetail = e.target.dataset.detail;
      console.log(seeDetail);

      showDetails(seeDetail);
    }

    if (e.target.className === "submit-note-btn") {
      let subNote = e.target.dataset.submit_note;
      console.log(subNote);
      addNote(subNote);
    }

    e.preventDefault();
  }

  // APP METHODS

  function addNote(subNote) {
    let textArea = document.querySelector(`[data-note="${subNote}"]`);
    let noteSubmitBtn = document.querySelector(
      `[data-submit_note="${subNote}"]`
    );
    let noteText = document.querySelector(`[data-note_text="${subNote}"]`);

    console.log(textArea.value);

    noteText.innerHTML = textArea.value;
    console.log(noteText.innerHTML);

    // get the card where i want to add a note
  }

  function hideDetails() {
    seeDetails.classList.toggle("open");
  }

  function showDetails(seeDetail) {
    seeDetails.classList.toggle("open");

    myCards.filter((c) => {
      let { imageUrl, name, text, type, rarity, set, date, id } = c;

      if (id === seeDetail) {
        seeDetails.innerHTML = `
        
        <section class="popup">
          <article class="img-section">
            <h1>${name}</h1>
            <img src='${imageUrl}' alt='${name}'>
          </article>
          <article class="text-section">
            <p>Card text: ${text}</p>
            <h5>Type:${type}</h5>
            <h5>Rarity: ${rarity}</h5>
            <h5>Set: ${set}</h5>
            <h5>Date of release: ${date}</h5>
          </article>
        </section>
        
        `;
      }
    });
  }

  function deleteCard(delId) {
    console.log(delId);
    console.log(myCards);
    let myNewCards = myCards.filter((card) => card.id !== delId);

    console.log(myNewCards);

    myCards = myNewCards;

    console.log(myCards);

    showMyCards(myNewCards);
  }

  function showMyCards() {
    myCollection.innerHTML = "";

    myCards.map((card) => {
      let { imageUrl, name, id } = card;

      //console.log(myCards);

      myCollection.innerHTML += `

            <article class="see-details-details" data-card=${id}>
              <img src='${imageUrl}' alt='${name}' data-detail=${id} />
              <button class="del-btn" data-delbtn=${id}>Remove card</button>
              <textarea id="textArea" class="show" data-note=${id}>add a note here ...</textarea>
              <p class="note" data-note_text=${id}></p>
              <button class="submit-note-btn" data-submit_note=${id}>Submit note</button>
            </article>
            `;
    });
  }

  function showCardsUsingEnter(e) {
    if (e.keyCode === 13) {
      showCards();
      console.log(e.keyCode);

      e.preventDefault();
    }
  }

  function showCards() {
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
        .catch(
          (error) => (allCardsGrid.textContent = "erro ao carregar cartas")
        );
    }
  }

  //console.log(cardName);

  function showCardsFilters() {
    allCardsGrid.innerHTML = "";

    cards.map((card) => {
      let { imageUrl, id } = card;

      allCardsGrid.innerHTML += `

            <article>
              <img src='${imageUrl}' alt='${name}'/>
              <button class="add-btn" data-id=${id}>Add card</button>
            </article>
            `;
    });

    // console.log(showCards);
  }
}
