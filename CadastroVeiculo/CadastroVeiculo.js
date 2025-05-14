 // Função chamada ao enviar o formulário
 async function formulario() {

    // Pega os elementos do formulário pelo ID
    const placaInput = document.getElementById('placa');
    const modeloInput = document.getElementById('modelo');
    const marcaInput = document.getElementById("marca");
    const anoInput = document.getElementById("ano");
    const corInput = document.getElementById("cor");
    const tipoInput = document.getElementById("tipo_veiculo");

    // Armazena os valores digitados pelo usuário em variáveis
    const placa = placaInput.value.toUpperCase(); // Transforma a placa em maiúsculas
    const modelo = modeloInput.value;
    const marca = marcaInput.value;
    const ano = anoInput.value;
    const cor = corInput.value;
    const tipo_veiculo = tipoInput.value;

    //valida o formato da placa (ABC-1234)
    const placaRegex = /^[A-Z]{3}-?\d{4}$/;

    // Verifica se a placa é válida
    if (!placaRegex.test(placa)) {
        alert("Placa inválida. Use o formato ABC-1234."); // Exibe alerta se estiver errada
        return; // Encerra a função
    }

    // Cria um objeto com os dados do veículo
    const veiculo = {
        placa: placa,
        modelo: modelo,
        marca: marca,
        ano: ano,
        cor: cor,
        tipo_veiculo: tipo_veiculo,
    };


    try {
        // Faz uma requisição POST para o servidor local
        const resposta = await fetch('http://127.0.0.1:8080/veiculos', {
            method: 'POST', // Método de envio
            headers: {
                'Content-Type': 'application/json' // mostra que está enviando JSON
            },
            body: JSON.stringify(veiculo) // Converte o objeto para string JSON e envia
        });

        // Verifica a resposta do servidor
        if (resposta.status === 200) {
            alert("Veículo cadastrado com sucesso."); // Sucesso
        } else if (resposta.status === 400) {
            const dados = await resposta.json(); // Lê a mensagem de erro
            alert("Erro: " + dados.mensagem); // Exibe a mensagem vinda do servidor
        } else {
            alert("Erro ao cadastrar o veículo. Código: " + resposta.status); // Erros genéricos
        }

    } catch (erro) {
        console.log(erro); // Mostra erro no console (por exemplo, servidor não encontrado)
        alert("Erro ao conectar com o servidor."); // Mensagem de falha de conexão
    }
}