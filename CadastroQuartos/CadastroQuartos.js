async function cadastrarQuarto() {
    const numeroInput = document.getElementById("numero");
    const quantidadeQInput = document.getElementById("quantidadeQ");
    const quantidadeCInput = document.getElementById("quantidadeC");
    const quantidadeBInput = document.getElementById("quantidadeB");
    const localizacaoInput = document.getElementById("localizacao");
    const valorInput = document.getElementById("valor");
    const vistaInput = document.getElementById("vista");

     const numero = numeroInput.value;
     const quantidadeQ = quantidadeQInput.value;
     const quantidadeC = quantidadeCInput.value;
     const quantidadeB = quantidadeBInput.value;
     const localizacao =  localizacaoInput.value;
     const valor = valorInput.value;
     const vista = vistaInput.value;
    
        const Quarto = {
        numero:  numero,
        quantidadeQ: quantidadeQ,
        quantidadeC: quantidadeC,
        quantidadeB: quantidadeB,
        localizacao: localizacao,
        valor: valor,
        vista: vista
    };

    console.log(Quarto);

    try {
        const resposta = await fetch('http://localhost:8080/quartos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Quarto)
        });

        if (resposta.ok) {
            alert("Quarto cadastrado com sucesso.");
        } else {
            const dados = await resposta.json();
            alert("Erro: " + (dados.mensagem || "Ocorreu um erro inesperado."));
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro ao cadastrar quarto.");
    }
}