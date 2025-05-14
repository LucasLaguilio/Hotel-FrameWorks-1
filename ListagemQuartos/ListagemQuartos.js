async function buscadedados() {
    const resposta = await fetch('http://localhost:8080/quarto');
    const lista = document.getElementById('userlist');

    if (resposta.status === 200) {
      const dados = await resposta.json();

      if (dados.length === 0) {
        lista.innerHTML = '<li style="text-align:center; font-style:italic; color:gray;">Nenhum quarto cadastrado.</li>';
      }

      dados.forEach(objeto => {
        const listadosquartoscriados = document.createElement('li');
        listadosquartoscriados.innerHTML = `
            <strong>Número: </strong> ${objeto.numero}<br>
            <strong>QuantidadeQ: </strong> ${objeto.quantidadeq} <br>
            <strong>QuantidadeC:</strong> ${objeto.quantidadec} <br>
            <strong>QuantidadeB:</strong> ${objeto.quantidadeb}<br>
            <strong>localizacao:</strong> ${objeto.localizacao}<br>
            <strong>valor:</strong> ${objeto.valor}<br>
            <strong>vista:</strong> ${objeto.vista}
        `;
  
        lista.appendChild(listadosquartoscriados);
      });

    } else {
      if (resposta.status === 400) {
        const dados = await resposta.json();
        alert(dados.mensagem);
      } else {
        alert("Erro desconhecido ao buscar dados.");
      }
    }
  }

  buscadedados();