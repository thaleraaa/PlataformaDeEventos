const esquerdaBtn = document.querySelector('#esquerdo');
const direitaBtn = document.querySelector('#direito');
const divCarrossel = document.querySelector('.cards');
const URL_API = 'http://localhost:3333/v1';
const logout = document.querySelector('#logout');
const meuseventos = document.querySelector('#eventos-role')
const meusingressos = document.querySelector('#ingressos-role')

esquerdaBtn.addEventListener('click', esquerda);
direitaBtn.addEventListener('click', direita);


let indiceAtual = 0;
let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    
    const token = localStorage.getItem('token');

    const response = await fetch(`${URL_API}/eventos`, {
        method: 'GET',

        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        alert('Token invalido!');
        window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
        return
    }  else if(!response.ok) {
        alert('Não foi possivel carregar os eventos');
        return;
    }

    const {role} = decodificarToken(token);

    if(role === 'ADMINISTRADOR') {
        meusingressos.style.display = 'none'
        meuseventos.style.display = 'block'
    } else {
        meusingressos.style.display = 'block'
        meuseventos.style.display = 'none'   
    }

    const dados = await response.json();
    return dados;
}

async function esquerda() {
    if(indiceAtual !== 0) {
        indiceAtual --;
        exibir();
    }
}

async function direita(e) {
    if(dados.length - 1 > indiceAtual) {
        indiceAtual ++;
        exibir();
    } 
}

async function exibir() {

    const evento = dados[indiceAtual];

    const imagemUrl =
    `${URL_API}/evento/imagem?filename=${evento.imagem}`;

    divCarrossel.innerHTML = `
        <img src="${imagemUrl}" alt="">

        <div class="infos">

            <p>${evento.nome}</p>
            <p>${evento.valor}</p>
            <p>${evento.data}</p>
            <p>${evento.horario}</p>
            <p>
                ${evento.rua} - ${evento.bairro}
            </p>
            <p>
                ${evento.cidade} - ${evento.estado}
            </p>
            <button id="comprar-btn">
                <img src="assets/imgs/carrinho.png" alt="">
            </button>

        </div>
    `;

    const botaoComprar = divCarrossel.querySelector('#comprar-btn');
    botaoComprar.addEventListener('click', () => {
            comprou(evento.id)
        }
    );
}

comprou = async (id) => {
    const response = await fetch(`${URL_API}/ingresso?evento_id=${id}`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },

        body: JSON.stringify({
            qrcode: 'XXXXX'
        })
    });

    if(!response.ok) {
        alert("Não foi possivel realizar a compra");
        return;
    }

    alert("Compra realizada!");

}

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
})

function decodificarToken(token) {
  const payload = token.split('.')[1]; // pega a parte do meio
  const decoded = atob(payload);       // decodifica base64
  return JSON.parse(decoded);
}



carregarDados();

