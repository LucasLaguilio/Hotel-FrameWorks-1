function mascararTelefone(input) {
    input.value = input.value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

function mascararCPF(input) {
    input.value = input.value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

async function formulario() {
    const cpfInput = document.getElementById('cpf');
    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById("idade");
    const sobrenomeInput = document.getElementById("sobrenome");
    const telefoneInput = document.getElementById("telefone");
    const emailInput = document.getElementById("email");
    const sexoInput = document.getElementById("sexo");

    const cpf = cpfInput.value;
    const nome = nomeInput.value;
    const idade = idadeInput.value;
    const sobrenome = sobrenomeInput.value;
    const telefone = telefoneInput.value;
    const email = emailInput.value;
    const sexo = sexoInput.value;

    // Validação do CPF (formato XXX.XXX.XXX-XX)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        alert("CPF inválido. Use o formato 000.000.000-00.");
        return;
    }

    // Validação do e-mail (qualquer domínio)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        alert("E-mail inválido. Use um formato válido como exemplo@dominio.com");
        return;
    }

    const usuario = {
        cpf: cpf,
        nome: nome,
        idade: idade,
        sobrenome: sobrenome,
        telefone: telefone,
        email: email,
        sexo: sexo
    };

    

    try {
        const resposta = await fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (resposta.ok) {
            alert("Usuário foi cadastrado com sucesso.");
        } else {
            const dados = await resposta.json();
            alert("Erro: " + (dados.mensagem || "Ocorreu um erro inesperado."));
        }
    } catch (erro) {
        console.log(erro);
        alert("Erro ao cadastrar usuário.");
    }
}
