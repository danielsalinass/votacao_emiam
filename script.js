// Lista de chapas
const chapas = [
    { nome: "Chapa 1", representante: "Maria", vice: "Carlos", imagemRep: "maria.png", imagemVice: "carlos.png" },
    { nome: "Chapa 2", representante: "João", vice: "Ana", imagemRep: "joao.png", imagemVice: "ana.png" },
    { nome: "Chapa 3", representante: "Pedro", vice: "Julia", imagemRep: "pedro.png", imagemVice: "julia.png" }
];

let votos = JSON.parse(localStorage.getItem('votos')) || {};
let votacaoEncerrada = JSON.parse(localStorage.getItem('votacaoEncerrada')) || false;

const listaCandidatos = document.getElementById("listaCandidatos");
const voteSound = new Audio("urna.mp3");

// Gerar lista de chapas dinamicamente
chapas.forEach(chapa => {
    if (!(chapa.nome in votos)) votos[chapa.nome] = 0;

    const div = document.createElement("div");
    div.className = "chapa-card";
    div.innerHTML = `
        <div class="chapa-info">
            <img src="${chapa.imagemRep}" alt="${chapa.representante}">
            <p>${chapa.representante} (Representante)</p>
        </div>
        <div class="chapa-info">
            <img src="${chapa.imagemVice}" alt="${chapa.vice}">
            <p>${chapa.vice} (Vice)</p>
        </div>
        <div class="chapa-selecao">
            <input type="radio" name="chapa" value="${chapa.nome}" id="${chapa.nome}" ${votacaoEncerrada
