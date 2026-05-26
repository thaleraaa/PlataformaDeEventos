const URL_API = 'http://localhost:3333/v1';
const eventos = document.querySelector('.ingressos');

let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    const token = localStorage.getItem('token');

    const response = await fetch(`${URL_API}/eventos/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const dados = await response.json();
    return dados
}

async function exibir() {
    const meusEventos = dados;
    meusEventos.forEach(evento => {
        const imagemUrl = `${URL_API}/evento/imagem?filename=${evento.imagem}`;
        eventos.innerHTML += `
            <div class="ingresso">
                <div class="ingresso-info">
                    <p>${evento.nome}</p>
                    <p>${evento.valor}</p>
                    <p>${evento.data}</p>
                    <p>${evento.horario}</p>
                </div>
                <img src="${imagemUrl}" alt="">
            </div>
        `;
    });
}

carregarDados();
