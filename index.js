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
  seeDetails.addEventListener("click", seeDetailsEvents, false);

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
      //console.log(seeDetail);

      showDetails(seeDetail);
    }

    if (e.target.className === "add-note-btn") {
      let noteId = e.target.dataset.add_note;
      console.log(addNote);
      addNote(noteId);
    }

    e.preventDefault();
  }

  function seeDetailsEvents(e) {
    if (e.target.className === "cancel") {
      hideDetails();
    }

    if (e.target.className === "submit-note-btn") {
      let subNoteId = e.target.dataset.add_note;
      let card = e.target.parentElement.parentElement;
      console.log(card);
      console.log(subNoteId);
      subNote(subNoteId);
    }

    e.preventDefault();
  }

  // APP METHODS

  function subNote(subNoteId) {
    myNotes = [];
    //console.log(myCards);

    let textArea = document.querySelector(".note-text");

    let filteredCard = myCards.filter((c) => c.id === subNoteId);

    myNotes.push({
      note: textArea.value,
      cardId: subNoteId,
    });

    filteredCard.push(myNotes);

    console.log(filteredCard);

    /* console.log(filteredCard[0]);

    let newObjectCard = {
      note: textArea.value,
      cardId: subNoteId,
      ...filteredCard[0],
    };

    console.log(newObjectCard);

    myCards.shift();
    console.log(myCards);

    let myNewCards = [newObjectCard, ...myCards];
    console.log(myNewCards);

    showMyNewCards(myNewCards);
  } */

    /* function showMyNewCards(myNewCards) {
    myCollection.innerHTML = "";

    myNewCards.map((card) => {
      let { imageUrl, name, id, note } = card;

      if (note === "") {
        myCollection.innerHTML += `

            <article class="see-details-details" data-card=${id}>
              <img src='${imageUrl}' alt='${name}' data-detail=${id} />
              <button class="del-btn" data-delbtn=${id}>Remove card</button>
               <button class="add-note-btn" data-add_note=${id}>Add note</button>
            </article>
            `;
      } else {
        myCollection.innerHTML += `

            <article class="see-details-details" data-card=${id}>
              <img src='${imageUrl}' alt='${name}' data-detail=${id} />
              <button class="del-btn" data-delbtn=${id}>Remove card</button>
               <button class="add-note-btn" data-add_note=${id}>Add note</button>
               <p>${note}</>
            </article>

            `;
      }

      //console.log(myCards);
    });
    */
  }

  function addNote(noteId) {
    // wanother way to add notes to the cards articles
    /* let textArea = document.querySelector(`[data-note="${subNote}"]`);
    let noteSubmitBtn = document.querySelector(
      `[data-submit_note="${subNote}"]`
    );
    let noteText = document.querySelector(`[data-note_text="${subNote}"]`);

    console.log(textArea.value);

    noteText.innerHTML = textArea.value;
    console.log(noteText.innerHTML); */
    // get the card where i want to add a note

    seeDetails.classList.toggle("open");

    myCards.filter((c) => {
      let { imageUrl, name, text, type, rarity, set, date, id } = c;

      if (id === noteId) {
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
            <h4>Add a note to your card:</h4>
            <textarea class="note-text"></textarea>
            <button class="submit-note-btn" data-add_note=${id}>Add note</button>
            <p data-note=${id}></p>
            <button class="cancel">X</button>
          </article>
          
        </section>
        
        `;
      }
    });
  }

  /* let textArea = document.querySelector(".note-text");

  myNotes.push([{ note: textArea.value, id: subNote }]);
  console.log(myNotes); */

  function hideDetails() {
    seeDetails.classList.toggle("open");
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
      let { imageUrl, name, id, note } = card;

      //console.log(myCards);

      myCollection.innerHTML += `

            <article class="see-details-details" data-card=${id}>
              <img src='${imageUrl}' alt='${name}' data-detail=${id} />
              <button class="del-btn" data-delbtn=${id}>Remove card</button>
               <button class="add-note-btn" data-add_note=${id}>Add note</button>
               

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
