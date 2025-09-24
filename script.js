document.addEventListener("DOMContentLoaded", function() {

  // Variáveis
  let mobile_media_query = window.matchMedia("(max-width: 400px)");
  let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
  const notes = document.querySelectorAll(".js-note");

  // Reset das notas
  function recize_notes() {
    notes.forEach((note) => {
      if(note.classList.contains("active")) {
        note.classList.remove("active");
        gsap.set(note, { height: "30%", clearProps:"all" });
      }
    });
  }

  // Inicializa interação das notas
  function notes_ready() {
    gsap.to(".js-envelop-content", { height:"110%", duration:0.5 });
    notes.forEach((note, i) => {
      note.addEventListener("click", function() {
        if(this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, { height:"30%", clearProps:"all" });
        } else {
          recize_notes();
          this.classList.add("active");
          let h = mobile_media_query.matches ? 125+40*i : tablet_media_query.matches ? 80+21*i : 70+20*i;
          gsap.set(this, { height: h+"%" });
        }
      });
    });
  }

  // Configura o up-paper do envelope
  function set_up_paper() {
    var arr=[0,0,100,0,50,61];
    gsap.set(".js-up-paper", {
      bottom:"97%", rotation:180, zIndex:200,
      clipPath:`polygon(${arr[0]}%${arr[1]}%,${arr[2]}%${arr[3]}%,${arr[4]}%${arr[5]}%)`,
      onComplete: notes_ready
    });
  }

  // Animação do envelope
  function envelop_transition() {
    gsap.to(".js-up-paper",{ bottom:"1%", duration:0.25, onComplete:set_up_paper });
    document.querySelector(".js-up-paper").classList.remove("cursor");
    // Mantemos o clique ativo para poder abrir novamente
  }

  // Sticker (corte)
  function sticker() {
    gsap.set(".js-sticker", { width:"20%", left:"-80%" });
    document.body.classList.remove("scissors");
    // Sticker só funciona uma vez
    document.querySelector(".js-sticker").removeEventListener("click", sticker);
    // Envelope agora pode ser clicado várias vezes
    document.querySelector(".js-up-paper").addEventListener("click", envelop_transition);
    document.querySelector(".js-up-paper").classList.add("cursor");
  }

  document.querySelector(".js-sticker").addEventListener("click", sticker);
  window.onresize = recize_notes;

});
