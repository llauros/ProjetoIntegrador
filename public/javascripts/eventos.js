// definindo variaveis que serão manipuladas
const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const mesAnterior = document.getElementById('mesAnterior');
const mesAtivo = document.getElementById('mesAtivo');
const mesSeguinte = document.getElementById('mesSeguinte');
const mes = document.getElementById('mes');
const botaoLeft = document.getElementById("botaoLeft");
const botaoRight = document.getElementById("botaoRight");

// definindo o mes padrão que irá aparecer no primeiro carregamento
const date = new Date;
var mesAtual = date.getMonth();
mesAtivo.innerText = meses[date.getMonth()];
// console.log(`Mês atual: ${meses.indexOf(mesAtual.innerText)+1}`)
buscarEventos(meses.indexOf(mesAtivo.innerText));

var indice = 0;
var eventosDoMes = {};


// comentar os resto do código
function alterarMes(event) {
    // recupera apenas o botao que foi clicado
    let botao = event.target.className.baseVal.split("-")[2];
    // let botao = event.target;

    if(botao == "right"){
        if(mesAtivo.innerText == "Dezembro"){
            indice = 0;
        } else {
            indice += 1;
        }
    }

    if(botao == "left"){
        if(mesAtivo.innerText == "Janeiro"){
            indice = 11;
        } else {
            indice -= 1;
        }
    }

    mesAtivo.innerText = meses[indice];
    exibirEventos(eventosDoMes)
}

botaoLeft.addEventListener('click', (event) => {
    alterarMes(event);
    buscarEventos(meses.indexOf(mesAtivo.innerText));
});

botaoRight.addEventListener('click', (event) => {
    alterarMes(event);
    buscarEventos(meses.indexOf(mesAtivo.innerText));
});

// busca os dados no back-end
function buscarEventos(mes) {
    fetch(`/calendarioEscolar/${mes}`)
    .then((resposta) => {
        return resposta.json()
    })
    .then((dadosRecebidos) => {
        console.log(dadosRecebidos)
    })
}

// imprime os dados encontrados na view calendarioEscolar
function exibirEventos(eventos){
    console.log(eventos)  
}

/* 
    O que precisa ser feito nesse arquivo e no back-end:

    1. criar rotas para acesso à tabela eventos;
    2. criar uma função para acessar a tabela eventos via fetch;
    3. criar lógica para trazer somente os eventos do mês atual;
    4. criar lógica que realize requisição de acordo com o botão clicado (next, previous) 
*/