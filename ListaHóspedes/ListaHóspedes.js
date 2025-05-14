async function buscadedados() {
    const resposta = await fetch('http://localhost:8080/usuarios');
    const lista = document.getElementById('userlist');

    if (resposta.status === 200) {
      const dados = await resposta.json();
      if (dados.length === 0) {
        lista.innerHTML = '<li style="text-align:center; font-style:italic; color:gray;">Nenhum hóspede cadastrado.</li>';
      }

      dados.forEach(objeto => {
        const listadosusuarioscriados = document.createElement('li');
        listadosusuarioscriados.innerHTML = `
            <strong>CPF:</strong> ${objeto.cpf}<br>
            <strong>Hóspede:</strong> ${objeto.nome} ${objeto.sobrenome}<br>
            <strong>Idade:</strong> ${objeto.idade} anos<br>
            <strong>Telefone:</strong> ${objeto.telefone}<br>
            <strong>Email:</strong> ${objeto.email}<br>
            <strong>Sexo:</strong> ${objeto.sexo}
        `;
        lista.appendChild(listadosusuarioscriados);
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

 async function EnviaFiltro() {
  const filtroInput = document.getElementById('Filtro');
  const tipoFiltro = document.getElementById('TipoFiltro').value;
  const filtro = filtroInput.value.trim();
  const lista = document.getElementById('userlist');

  if (!filtro) {
    alert("Digite um valor para filtrar.");
    return;
  }

  try {
    const resposta = await fetch(`http://localhost:8080/filtro/${tipoFiltro}/${encodeURIComponent(filtro)}`);

    if (resposta.status === 200) {
      const dadosFiltrados = await resposta.json();

      lista.innerHTML = '';

      if (dadosFiltrados.length === 0) {
        lista.innerHTML = '<li style="text-align:center; font-style:italic; color:gray;">Nenhum hóspede encontrado.</li>';
        return;
      }

      dadosFiltrados.forEach(objeto => {
        const listadosusuarioscriados = document.createElement('li');
        listadosusuarioscriados.innerHTML = `
            <strong>CPF:</strong> ${objeto.cpf}<br>
            <strong>Hóspede:</strong> ${objeto.nome} ${objeto.sobrenome}<br>
            <strong>Idade:</strong> ${objeto.idade} anos<br>
            <strong>Telefone:</strong> ${objeto.telefone}<br>
            <strong>Email:</strong> ${objeto.email}<br>
            <strong>Sexo:</strong> ${objeto.sexo}
        `;
        lista.appendChild(listadosusuarioscriados);
      });

    } else {
      alert("Erro ao aplicar o filtro.");
    }

  } catch (error) {
    console.error("Ocorreu um erro:", error);
    alert("Erro ao buscar dados filtrados.");
  }
}


function atualizaMascara() {
  const input = document.getElementById('Filtro');
  input.value = ""; // Limpa o campo quando troca o tipo
}

function aplicarMascara() {
  const tipo = document.getElementById('TipoFiltro').value;
  const input = document.getElementById('Filtro');

  if (tipo === "cpf") {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  if (tipo === "telefone") {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }

 
}
