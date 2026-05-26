const URL_API = 'http://localhost:3333/v1';
const eventos = document.querySelector('.ingressos');

let dados = [];

async function carregarDados() {
    dados = await response();
    exibir();
}

async function response () {
    const response = await fetch(`${URL_API}/eventos/me`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        alert('Token invalido!');
        window.location.href = 'http://127.0.0.1:5500/public/pages/login.html';
        return
    }

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
