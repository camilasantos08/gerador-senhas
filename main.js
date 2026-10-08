const numeroSenha = document.querySelector('.parametro-senhatexto');

let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

// CARACTERES

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';

const numeros = '0123456789';

const simbolos = '!?*#%@';

// ELEMENTOS

const botoes = document.querySelectorAll('.parametro-senhabotao');

const campoSenha = document.querySelector('#campo-senha');

const checkbox = document.querySelectorAll('.checkbox');

const forcaSenha = document.querySelector('.forca');

const nivelSenha = document.querySelector('#nivel');

const mensagem = document.querySelector('.entropia');

const copiar = document.querySelector('#copiar');

const pontuacao = document.querySelector('#pontuacao');

// BOTÕES DE TAMANHO

botoes[0].onclick = diminuiTamanho;

botoes[1].onclick = aumentaTamanho;

// DIMINUIR TAMANHO

function diminuiTamanho() {

if (tamanhoSenha > 4) { tamanhoSenha--; }

numeroSenha.textContent = tamanhoSenha;

geraSenha(); }

// AUMENTAR TAMANHO

function aumentaTamanho() {

if (tamanhoSenha < 30) { tamanhoSenha++; }

numeroSenha.textContent = tamanhoSenha;

geraSenha(); }

// CHECKBOXES

for (let i = 0; i < checkbox.length; i++) {

checkbox[i].onclick = geraSenha;

}

// COPIAR SENHA

copiar.onclick = function() {

campoSenha.select();

navigator.clipboard.writeText( campoSenha.value );

copiar.textContent = 'COPIADO!';

setTimeout(function() {

copiar.textContent = 'COPIAR';

}, 1000); };

// GERAR SENHA AO ABRIR

geraSenha();

// FUNÇÃO PARA GERAR SENHA

function geraSenha() {

let alfabeto = '';

if (checkbox[0].checked) {

alfabeto += letrasMaiusculas;

}

if (checkbox[1].checked) {

alfabeto += letrasMinusculas;

}

if (checkbox[2].checked) {

alfabeto += numeros;

}

if (checkbox[3].checked) {

alfabeto += simbolos;

}

// NENHUMA OPÇÃO

if (alfabeto.length == 0) {

campoSenha.value = 'Selecione uma opção';

classificaSenha(0);

return; }

let senha = '';

// GERA OS CARACTERES

for ( let i = 0; i < tamanhoSenha; i++ ) {

let numeroAleatorio = Math.floor( Math.random() * alfabeto.length );

senha += alfabeto[numeroAleatorio]; }

campoSenha.value = senha;

classificaSenha( alfabeto.length ); }

// CLASSIFICAR SEGURANÇA

function classificaSenha( tamanhoAlfabeto ) {

// SEM OPÇÕES

if (tamanhoAlfabeto == 0) {

forcaSenha.style.width = '0%';

nivelSenha.textContent = 'SEM SENHA';

mensagem.textContent = 'Escolha pelo menos uma característica.';

pontuacao.textContent = '0';

return; }

// CALCULA ENTROPIA

let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

forcaSenha.style.width = '0%';

// MUITO FRACA

if (entropia < 30) {

forcaSenha.style.width = '20%';

forcaSenha.style.backgroundColor = '#6b1010';

nivelSenha.textContent = 'MUITO FRACA';

}

// FRACA

else if (entropia < 45) {

forcaSenha.style.width = '40%';

forcaSenha.style.backgroundColor = '#e32626';

nivelSenha.textContent = 'FRACA';

}

// MODERADA

else if (entropia < 60) {

forcaSenha.style.width = '60%';

forcaSenha.style.backgroundColor = '#ff9d00';

nivelSenha.textContent = 'MODERADA';

}

// FORTE

else if (entropia < 75) {

forcaSenha.style.width = '80%';

forcaSenha.style.backgroundColor = '#00c853';

nivelSenha.textContent = 'FORTE';

}

// LEGENDÁRIA

else {

forcaSenha.style.width = '100%';

forcaSenha.style.backgroundColor = '#8b35ff';

nivelSenha.textContent = 'LEGENDÁRIA'; }

// ATUALIZA O SCORE

pontuacao.textContent = Math.floor(entropia);

// MENSAGEM

mensagem.textContent = 'Nível de segurança: ' + Math.floor(entropia) + ' pontos.'; }
