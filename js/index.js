const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  // Quando encostar no tubo a animação para!
  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 88) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "/assets/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "48px";

    clearInterval(loop);

    const deathSound = new Audio("/sounds/smb_mariodie.wav");
    deathSound.play();
  }
}, 10);

if (
  /Android|Motorola|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  const jumpSound = new Audio("/sounds/smb_jump-small.wav");

  // Adiciona eventos de toque na tela para dispositivos móveis
  let initialY = null;
  document.addEventListener("touchstart", (event) => {
    initialY = event.touches[0].clientY;
  });
  document.addEventListener("touchend", (event) => {
    if (initialY === null) return;
    const currentY = event.changedTouches[0].clientY;
    const diffY = initialY - currentY;
    if (diffY > 0) {
      jump();
      jumpSound.play();
    }
    initialY = null;
  });
} else {
  // Computador - adiciona o evento de keyup e remove o evento de keydown
  const keyDownHandler = () => {
    document.removeEventListener("keydown", keyDownHandler);
  };

  document.addEventListener("keydown", keyDownHandler);

  const jumpSound = new Audio("/sounds/smb_jump-small.wav");
  document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
      jump();
      jumpSound.play();
    }
  });
}
