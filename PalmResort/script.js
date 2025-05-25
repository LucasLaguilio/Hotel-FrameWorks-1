const comentarioslist = [
    "Um paraíso tropical com serviço de primeira classe! - Bradd",
    "As acomodações são impecáveis — voltaremos com certeza. - Léo",
    "Melhor experiência de resort que já tivemos. Incrível! - Sabrina",
    "Equipe simpática e atenciosa em todos os detalhes. - Thamires",
    "Vista deslumbrante e conforto que supera expectativas. - Joe"
];

let temporizador = 0;
const comentarioselemento = document.getElementById("comment-text");

function atualizacomentarios() {
    comentarioselemento.classList.add("fade-out");

    setTimeout(() => {
        comentarioselemento.textContent = comentarioslist[temporizador];
        comentarioselemento.classList.remove("fade-out");
        temporizador = (temporizador + 1) % comentarioslist.length;
        
    }, 500)
    
}

atualizacomentarios();

setInterval(atualizacomentarios, 5000);


function avaliar(nota) {
    if (nota === 1 || nota === 2) {
      alert("Pedimos desculpas pela sua avaliação ruim. Entre em contato com nossa equipe de suporte — seu feedback é importante para nós!");
    } else if (nota === 3) {
      alert("Obrigado por nos avaliar positivamente. Agradecemos seu feedback!");
    } else if (nota === 4 || nota === 5) {
      alert("Perfeito! A equipe Palm agradece muito sua excelente avaliação. Obrigado(a)!");
    }
  
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(`star${i}`);
      star.style.color = i <= nota ? "gold" : "white";
    }
}
  