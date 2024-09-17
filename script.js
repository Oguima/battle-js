let rodadas = 0;
let dadosMantidos = [];
let resultadosRolados = []; // Array para armazenar os resultados dos dados
let dadosMantidosPorRodada = [[], [], []]; // Armazenar dados mantidos por rodada

const MAX_DADOS_MANTIDOS = 6; // Limite de dados mantidos
const MAX_RODADAS = 3; // Limite de rodadas

document.getElementById('rolar').addEventListener('click', function() {
    if (rodadas < MAX_RODADAS) {
        mostrarResultados();

        const dadosContainer = document.getElementById('dados');
        dadosContainer.innerHTML = ''; // Limpa os dados anteriores
        resultadosRolados = []; // Limpa os resultados anteriores
    
        for (let i = 0; i < (6 - resultadosRolados.length); i++) {
            const dado = document.createElement('div');
            dado.className = 'dado';
            dado.dataset.index = i; // Armazena o índice do dado

            // Simula o rolamento
            setTimeout(() => {
                const resultado = Math.floor(Math.random() * 6) + 1; // Gera um número entre 1 e 6
                resultadosRolados[i] = resultado;
                dado.innerHTML = formatarDado(resultado);

                // Adiciona o evento de clique para manter o dado
                dado.addEventListener('click', () => {
                    dado.classList.toggle('mantido');
                    const indexDado = dado.dataset.index; // Obtem o índice do dado
                    
                    //if (!dadosMantidos.includes(resultado)) {
                      //  dadosMantidos.push(resultado); // Adiciona o resultado aos mantidos
                        //dado.classList.add('mantido'); // Adiciona classe para estilização
                    
                    /*if (dadosMantidos.includes(indexDado)) {
                        // Remove o índice se já estiver na lista
                        dadosMantidos = dadosMantidos.filter(index => index !== indexDado);
                    } else {
                        // Adiciona o índice se não estiver na lista
                        dadosMantidos.push(indexDado);
                    }*/

                    if (dadosMantidosPorRodada[rodadas].includes(indexDado)) {
                        // Remove o índice se já estiver na lista
                        dadosMantidosPorRodada[rodadas] = dadosMantidosPorRodada[rodadas].filter(index => index !== indexDado);
                    } else {
                        // Adiciona o índice se não estiver na lista
                        dadosMantidosPorRodada[rodadas].push(indexDado);
                    }

                    // Atualiza a exibição dos dados mantidos
                    exibirDadosMantidos();
                });

                dadosContainer.appendChild(dado); // Adiciona o dado ao container

            }, i * 100); // Rolagem em intervalos de 200ms
        }

        rodadas++;
        if (rodadas === MAX_RODADAS) {
            setTimeout(() => {
                mostrarResultados();
            }, 1000); // Espera um pouco antes de mostrar resultados
        }
    }
});

function mostrarResultadosBase() {
    const dadosContainer = document.getElementById('dados');
    dadosContainer.innerHTML = 'Resultados finais: ' + dadosMantidos.join(', ');
    document.getElementById('mantidos').innerHTML = 'Dados mantidos: ' + dadosMantidos.join(', ');
    dadosMantidos = []; // Limpa os mantidos para nova rodada, se necessário
    rodadas = 0; // Reseta as rodadas
}

// Função para obter o valor do dado pelo índice
function obterValorPorIndice(indice) {
    return resultadosRolados[indice]; // Retorna o valor do dado armazenado no índice
}

function exibirDadosMantidos() {
    const mantidosContainer = document.getElementById('mantidos');
    mantidosContainer.innerHTML = ''; // Limpa os mantidos anteriores

    /*dadosMantidos.forEach(index => {
        const dadoElement = document.querySelector(`.dado[data-index='${index}']`);
        //const valor = dadoElement.textContent;
        const valor = obterValorPorIndice(index);

        // Cria um novo elemento para o dado mantido
        const dadoMantido = document.createElement('div');
        dadoMantido.className = 'dado';
        dadoMantido.innerHTML = formatarDado(valor); // Define o conteúdo formatado
        
        mantidosContainer.appendChild(dadoMantido); // Adiciona ao contêiner de mantidos
    });*/

    // Adiciona um título para os dados mantidos
    const titulo = document.createElement('h3');
    titulo.textContent = 'Dados mantidos:';
    mantidosContainer.appendChild(titulo);

    dadosMantidosPorRodada[rodadas - 1].forEach(index => {
        const valor = obterValorPorIndice(index);

        // Cria um novo elemento para o dado mantido
        const dadoMantido = document.createElement('div');
        dadoMantido.className = 'dado';
        dadoMantido.innerHTML = formatarDado(valor); // Define o conteúdo formatado
        
        mantidosContainer.appendChild(dadoMantido); // Adiciona ao contêiner de mantidos
    });
}

function mostrarResultados() {
    const dadosContainer = document.getElementById('dados');
    dadosContainer.innerHTML = ''; // Limpa os dados anteriores

    // Cria um contêiner para os dados mantidos
    const mantidosContainer = document.createElement('div');
    mantidosContainer.id = 'mantidos';
    

    /*
    // Para cada índice mantido, formata e adiciona ao contêiner
    dadosMantidos.forEach(index => {
        const dadoElement = document.querySelector(`.dado[data-index='${index}']`);
        const valor = dadoElement.textContent;

        // Cria um novo elemento para o dado mantido
        const dadoMantido = document.createElement('div');
        dadoMantido.className = 'dado';
        
        // Define o conteúdo formatado usando a função
        dadoMantido.innerHTML = formatarDado(valor);
        
        mantidosContainer.appendChild(dadoMantido); // Adiciona ao contêiner de mantidos
    });

    dadosContainer.appendChild(mantidosContainer); // Adiciona os mantidos ao container principal
    document.getElementById('mantidos').innerHTML = 'Dados mantidos: ' + dadosMantidos.join(', ');
    dadosMantidos = []; // Limpa os mantidos para nova rodada, se necessário
    rodadas = 0; // Reseta as rodadas
    */

    // Para cada índice mantido na rodada atual, formata e adiciona ao contêiner
    dadosMantidosPorRodada.forEach((mantidos, rodadaIndex) => {
        mantidos.forEach(index => {
            const valor = obterValorPorIndice(index);
            const dadoMantido = document.createElement('div');
            dadoMantido.className = 'dado';
            dadoMantido.innerHTML = formatarDado(valor); // Define o conteúdo formatado
            mantidosContainer.appendChild(dadoMantido); // Adiciona ao contêiner de mantidos
        });
    });

    dadosContainer.appendChild(mantidosContainer); 

    //dadosContainer.appendChild(mantidosContainer); // Adiciona os mantidos ao container principal
    //document.getElementById('mantidos').innerHTML = 'Dados mantidos: ' + dadosMantidosPorRodada.flat().join(', ');    
}

// Função para formatar o resultado do dado
function formatarDado(resultado) {
    if (resultado === 4) {
        return '<i class="fas fa-paw"></i>';  // Garra
    } else if (resultado === 5) {
        return '<i class="fas fa-bolt"></i>'; // Raio
    } else if (resultado === 6) {
        return '<i class="fas fa-heart"></i>'; // Coração
    } else {
        return resultado; // Para 1, 2 e 3, retorna o número
    }
}
