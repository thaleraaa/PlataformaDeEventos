const esquerdaBtn = document.querySelector('#esquerdo');
const direitaBtn = document.querySelector('#direito');
const divCarrossel = document.querySelector('.cards');
const URL_API = 'http://localhost:3333/v1';


esquerdaBtn.addEventListener('click', esquerda);
direitaBtn.addEventListener('click', direita);


let indiceAtual = 0;
let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    const response = await fetch(`${URL_API}/eventos`);
    const dados = await response.json();
    return dados;
}

async function esquerda() {
    console.log("Apertou o esquerdo!");
    if(indiceAtual !== 0) {
        indiceAtual --;
        exibir();
    }
}

async function direita(e) {
    console.log("Apertou o direito!");
    if(dados.length - 1 > indiceAtual) {
        indiceAtual ++;
        exibir();
    } 
}

async function exibir() {
    const evento = dados[indiceAtual];
    const imagemUrl = `${URL_API}/evento/imagem?filename=${evento.imagem}`;
    divCarrossel.innerHTML = `
        <img src="${imagemUrl}" alt="">
        <div class="infos">
            <p>${evento.nome}</p>
            <p>${evento.valor}</p>
            <p>${evento.data}</p>
            <p>${evento.horario}</p>
        </div>
    `;
}

async function carrossel() {
    
}

carregarDados();

