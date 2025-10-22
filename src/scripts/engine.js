// Jogo da Memória — versão final (2 cartas por vez, com flip)
const emojis = [
  "😺","😺","🦝","🦝","🦊","🦊","🐶","🐶",
  "🐵","🐵","🦁","🦁","🐯","🐯","🐮","🐮",
];

const game = document.querySelector(".game");
let openCards = [];
let lockBoard = false;

// monta o tabuleiro
[...emojis].sort(() => Math.random() - 0.5).forEach(emoji => {
  const card = document.createElement("div");
  card.className = "item";
  card.dataset.emoji = emoji;      // valor para comparar
  card.textContent = emoji;        // conteúdo da face
  card.addEventListener("click", onCardClick);
  game.appendChild(card);
});

function onCardClick(e) {
  const card = e.currentTarget;

  // bloqueios: checando par, clicando na mesma carta ou já pareada
  if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  openCards.push(card);

  if (openCards.length === 2) {
    lockBoard = true; // trava até verificar o par
    const [c1, c2] = openCards;
    const isMatch = c1.dataset.emoji === c2.dataset.emoji;

    if (isMatch) {
      c1.classList.add("matched");
      c2.classList.add("matched");
      endTurn();
      checkWin();
    } else {
      setTimeout(() => {
        c1.classList.remove("flipped");
        c2.classList.remove("flipped");
        endTurn();
      }, 600);
    }
  }
}

function endTurn() {
  openCards = [];
  lockBoard = false;
}

function checkWin() {
  if (document.querySelectorAll(".item.matched").length === emojis.length) {
    setTimeout(() => alert("🎉 Você venceu!"), 150);
  }
}
