const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;

numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!?*#%@';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');

const forcaSenha = document.querySelector('.forca');
const nivelSenha = document.querySelector('#nivel');
const mensagem = document.querySelector('.entropia');
const copiar = document.querySelector('#copiar');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {

    if (tamanhoSenha > 4) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {

    if (tamanhoSenha < 30) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

copiar.onclick = function() {
    campoSenha.select();
    navigator.clipboard.writeText(campoSenha.value);
    copiar.textContent = 'COPIADO!';

    setTimeout(function() {
        copiar.textContent = 'COPIAR';
    }, 1000);
};

geraSenha();

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

    if (alfabeto.length == 0) {
        campoSenha.value = 'Selecione uma opção';
        classificaSenha(0);
        return;
    }

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {

        let numeroAleatorio = Math.floor(
            Math.random() * alfabeto.length
        );

        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;

    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {

    if (tamanhoAlfabeto == 0) {
        forcaSenha.style.width = '0%';
        nivelSenha.textContent = 'SEM SENHA';
        mensagem.textContent = 'Escolha pelo menos uma característica.';
        return;
    }

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.style.width = '0%';

    if (entropia < 30) {

        forcaSenha.style.width = '20%';
        forcaSenha.style.backgroundColor = '#6b1010';
        nivelSenha.textContent = 'MUITO FRACA';

    } else if (entropia < 45) {

        forcaSenha.style.width = '40%';
        forcaSenha.style.backgroundColor = '#e32626';
        nivelSenha.textContent = 'FRACA';

    } else if (entropia < 60) {

        forcaSenha.style.width = '60%';
        forcaSenha.style.backgroundColor = '#ff9d00';
        nivelSenha.textContent = 'MODERADA';

    } else if (entropia < 75) {

        forcaSenha.style.width = '80%';
        forcaSenha.style.backgroundColor = '#00c853';
        nivelSenha.textContent = 'FORTE';

    } else {

        forcaSenha.style.width = '100%';
        forcaSenha.style.backgroundColor = '#7b2cff';
        nivelSenha.textContent = 'LEGENDÁRIA';
    }

    mensagem.textContent =
        'Nível de segurança: ' + Math.floor(entropia) + ' pontos.';
}