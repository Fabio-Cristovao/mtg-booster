// getting data from magic the gathering API from another file

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  // declaration of global variables
  let cardsGrid = document.querySelector(".main-content")
  console.log(cardsGrid)
  let allCardsGrid = document.querySelector("#all-cards-container");
  let showCardsBtn = document.querySelector("#search-btn");
  let searchInput = document.querySelector("#title-search");
  //console.log(searchInput.value);
  let colorCheckboxes = document.querySelectorAll(".color-checkbox");
  let myCollection = document.querySelector("#my-cards-container");
  //console.log(myCollection);
  let myCollectionGrid = document.querySelector("#my-cards-container");
  //console.log(myCollectionGrid);
  let seeDetailsSection = document.querySelector("#see-details");
  console.log(seeDetailsSection)
  let filters = document.querySelector(".filters-form")
  console.log(filters);
  let warning = document.createElement('h1');

  //console.log(seeDetails);

  // form color variables

  /* let red = document.querySelector("#red");
  let blue = document.querySelector("#blue");
  let green = document.querySelector("#green");
  let black = document.querySelector("#black");
  let white = document.querySelector("#white"); */

  // console.log(cardsGrid);\

  // page addEventListener

  colorCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', enableColors, false);
  })
  showCardsBtn.addEventListener("click", showCards, false);
  searchInput.addEventListener("keypress", showCardsUsingEnter, false);
  allCardsGrid.addEventListener("click", allCardsGridEvents, false);
  myCollectionGrid.addEventListener("click", myCollectionGridEvents, false);
  //console.log(myCollectionGrid);
  seeDetailsSection.addEventListener("click", seeDetailsEvents, false);

  //script logic

  let cards = [];
  let enabledColors = [];
  let myCards = [];
  let url = "";

  function allCardsGridEvents(e) {
    if (e.target.className === "add-btn") {
      let id = e.target.dataset.id;
      console.log(id);
      addToMyCards(id);
    }

    if (e.target.nodeName === "IMG") {
      console.log(e.target.id);
      let id = e.target.id;
      seeDetails(id);
    }



    e.preventDefault();
  }

  function myCollectionGridEvents(e) {


    if (e.target.className === "del-btn") {
      let delId = e.target.dataset.delbtn;
      console.log(delId);
      deleteCard(delId);
    }

    if (e.target.className === "add-note-btn") {
      let noteId = e.target.dataset.add_note;
      console.log(noteId);
      showNote(noteId);
    }

    if (e.target.nodeName === "IMG") {
      let imgId = e.target.id;
      console.log(imgId);
      seeMyDetails(imgId)
    }

    e.preventDefault();
  }

  function seeDetailsEvents(e) {
    console.log(e.target)
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

  function enableColors() {
    enabledColors = Array.from(colorCheckboxes).filter(i => i.checked).map(i => i.id);
    console.log(enabledColors);

    let searchColors = enabledColors.toString();
    console.log(searchColors);

    return searchColors;
  }

  function seeMyDetails(imgId) {

    seeDetailsSection.classList.toggle("open");

    myCards.filter(c => {

      let { imageUrl, name, text, type, rarity, set, date } = c;

      if (c.id === imgId) {

        seeDetailsSection.innerHTML = `
        
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
            <button class="cancel">X</button>
          </article>
        `
      }
    })
  }

  function seeDetails(id) {

    seeDetailsSection.classList.toggle("open");


    let card = cards.filter(c => {

      let { imageUrl, name, text, type, rarity, set, date } = c;

      if (c.id === id) {


        seeDetailsSection.innerHTML = `
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
            <button class="cancel">X</button>
          </article>
          `;
      }

    })
    console.log(card)
  }

  function subNote(subNoteId) {

    let textArea = document.querySelector(".note-text");
    let filteredCard = myCards.find(c => c.id === subNoteId)

    let newObject = {
      ...filteredCard,
      note: textArea.value
    };
    // find and replace the card object with a new object containing the new note property and push it to my cards array

    const indexOfCard = myCards.indexOf(filteredCard);
    console.log(indexOfCard);

    if (indexOfCard !== -1) {
      myCards[indexOfCard] = newObject;
    }
    showMyCards(myCards);
    hideDetails();
  }

  function showNote(noteId) {

    seeDetailsSection.classList.toggle("open");

    myCards.filter((c) => {
      let { imageUrl, name, id } = c;

      if (id === noteId) {
        seeDetailsSection.innerHTML = `
          <section class="popup">
          <article class="img-section">
          <h1>${name}</h1>
          <img src='${imageUrl}' alt='${name}'>
          </article>
          <article class="text-section">
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

  function hideDetails() {
    seeDetailsSection.classList.toggle("open");
  }

  function addToMyCards(id) {
    console.log(myCards)
    let addedCard = cards.find(c => c.id === id);
    console.log(addedCard)
    myCards.push(addedCard);
    showMyCards(myCards);
  }

  function deleteCard(delId) {
    console.log(delId);
    console.log(myCards);
    let myNewCards = myCards.filter((card) => card.id !== delId);
    myCards = myNewCards;
    showMyCards(myNewCards);
  }

  function showMyCards(array) {

    myCollection.innerHTML = ''

    array.map((card) => {

      let { imageUrl, name, id, note } = card;

      if (!note) {

        myCollection.innerHTML += `
          
          <article class="see-details-details" data-card=${id}>
          <img src='${imageUrl}' alt='${name}' id=${id} />
          <p></p>
          <button class="del-btn" data-delbtn=${id}>Remove card</button>
          <button class="add-note-btn" data-add_note=${id}>Add note</button>
          </article>
          `;
      } else {
        myCollection.innerHTML += `
          
          <article class="see-details-details" data-card=${id}>
          <img src='${imageUrl}' alt='${name}' id=${id} />
          <p>${note}</p>
          <button class="del-btn" data-delbtn=${id}>Remove card</button>
          <button class="add-note-btn" data-add_note=${id}>Add note</button>
          </article>
          `;
      }
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

    let colorSearch = enabledColors.toString();
    console.log(searchInput.value);
    console.log(colorSearch);
    console.log(url);

    if (searchInput.value === "" && colorSearch !== "") {
      url = `https://api.magicthegathering.io/v1/cards?contains=imageUrl&colors=${colorSearch}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = error));
    } else if (searchInput.value !== "" && colorSearch === "") {
      url = `https://api.magicthegathering.io/v1/cards?contains=imageUrl&name=${searchInput.value}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = error));
    } else if (searchInput.value !== "" && colorSearch !== "") {
      url = `https://api.magicthegathering.io/v1/cards?contains=imageUrl&name=${searchInput.value}&colors=${colorSearch}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = error));
    } else if (searchInput.value === "" && colorSearch === "") {
      url = `https://api.magicthegathering.io/v1/cards?contains=imageUrl&random=true`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cards = data.cards;
          showCardsFilters();
        })
        .catch((error) => (cardsGrid.textContent = error));
    }
  }

  function showCardsFilters() {

    if (cards.length === 0) {


      warning.textContent = "No cards found!"
      filters.appendChild(warning);

    } else {

      warning.textContent = ""

      allCardsGrid.innerHTML = "";

      cards.map((card) => {
        let { imageUrl, id } = card;

        allCardsGrid.innerHTML += `
          
          <article>
                <img src='${imageUrl}' alt='${name}' id=${id} />
                <button class="add-btn" data-id=${id}>Add card</button>
              </article>
              `;
      });
    }
  }
}
