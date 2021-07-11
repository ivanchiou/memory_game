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

  shuffleAndConnectClick(document.querySelectorAll('.card-item'));
}

function flipCard(item) {
  if (lockBoard) return;
  if (item === firstCard) return;
  
  item.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = item;
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
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
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
      renderItems(data.items);
    });
}

function shuffleAndConnectClick(cards) {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
    $(card).on('click', function () {
        flipCard(this);
    });
  });
}

readJSONFile("seeders/data.json");