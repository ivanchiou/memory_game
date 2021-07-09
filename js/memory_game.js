const items_layout = document.querySelector("#items-layout");
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function renderItems(items) {
  items.forEach(function (item) {
    items_layout.innerHTML +=
        `<div class="card-item" data-name="${item.name}">
            <img class="front-face" src="${item.image_link}" />
            <img class="back-face" src="images/pineapple_bun_large.png" />
        </div>`;
  });

  const elements = document.getElementsByClassName("card-item");
  for (let index = 0; index < elements.length; index++) {
    elements[index].onclick = function () {
        flipCard(this);
    };
  }
}

function flipCard(item) {
  if (lockBoard) return;

  if (item === firstCard) return;
  
  item.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = item;
    return;
  } else {
    secondCard = item;
    checkForMatch();
  }
}

function checkForMatch() {
  firstCard.dataset.name === secondCard.dataset.name ? disableMatchedCards() : unflipCards();
}

function disableMatchedCards() {
  firstCard.onclick = null;
  secondCard.onclick = null;
  
  setTimeout(() => {
      alert("match!");
      resetBoard();
  }, 1000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function readJSONFile(file) {
  fetch(file)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      totalItems = data.items;
      renderItems(totalItems);
    });
}

readJSONFile("seeders/data.json");