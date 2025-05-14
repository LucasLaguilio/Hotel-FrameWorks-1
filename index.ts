import mysql from 'mysql2/promise';
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'

const servidor = fastify()
servidor.register(cors)

servidor.get("/", (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Fastify está Funcionando!")
})

servidor.listen({ port: 8080 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou")
    }
    console.log(`Fastify iniciado na porta: ${endereco}`)
})  


// Lucas
servidor.post("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
    const { cpf,nome,sobrenome,idade,telefone,email,sexo, } = request.body as any;
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('insert into Users (cpf,nome,sobrenome,idade,telefone,email,sexo) values (?,?,?,?,?,?,?)', [cpf,nome,sobrenome,idade,telefone,email,sexo]);
        const [dados] = results
        reply.status(200).send(dados)

    } catch (erro:any) {
        if (erro.code === "ECONNREFUSED") {
            console.log("ERRO: LIGUE SUA INSTANCIA DO MYSQL. ")
            reply.status(400).send({ mensagem: "ERRO: LIGUE SUA INSTANCIA DO MYSQL." })
        } else if (erro.code === "ER_BAD_DB_ERROR") {
            console.log("ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO")
            reply.status(400).send({ mensagem: "ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO"})
        } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
            reply.status(400).send({ mensagem: "ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO"})
        } else if (erro.code === "ER_NO_DEFAULT_FOR_FIELD") {
            console.log("ERRO: EXISTE ALGUM CAMPO QUE NÃO PODE SER NULO, E NÃO FOI PASSADO VALOR.")
            reply.status(400).send({ mensagem: "ERRO: EXISTE ALGUM CAMPO QUE NÃO PODE SER NULO, E NÃO FOI PASSADO VALOR." })
        } else {
            console.log(erro)
            reply.send({mensagem:"ERRO DESCONHECIDO"})
        }   
        
    }
})

// Lucas
servidor.get("/usuarios", async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('SELECT * FROM users');
        const [dados] = results
        reply.status(200).send(dados)

    } catch (erro:any) {
        if (erro.code === "ECONNREFUSED") {
            console.log("ERRO: LIGUE SUA INSTANCIA DO MYSQL. ")
            reply.status(400).send({mensagem:"ERRO: LIGUE SUA INSTANCIA DO MYSQL."})	
        } else if (erro.code === "ER_BAD_DB_ERROR") {
            console.log("ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO")
            reply.status(400).send({mensagem:"ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO"}) 
        } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
            reply.status(400).send({mensagem: "ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO"})
        } else {
            console.log(erro)
            reply.status(400).send({mensagem:"ERRO DESCONHECIDO"})
        }   
    }
})

// Lucas
servidor.get("/filtro/:tipo/:valor", async (request: FastifyRequest, reply: FastifyReply) => {
  const { tipo, valor } = request.params as any;

  const camposPermitidos = ['cpf', 'nome', 'telefone', 'email'];
  if (!camposPermitidos.includes(tipo)) {
    return reply.status(400).send({ mensagem: "Tipo de filtro inválido." });
  }

  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ServerDatabase',
      port: 3306
    });

    const query = `SELECT * FROM users WHERE ${tipo} LIKE ?`;
    const results = await conn.query(query, [`%${valor}%`]);
    const [dados] = results;
    reply.status(200).send(dados);
  } catch (erro: any) {
    console.log(erro);
    reply.status(500).send({ mensagem: "Erro ao buscar os usuários." });
  }
});



//Laurizy
servidor.post("/veiculos", async (request: FastifyRequest, reply: FastifyReply) => {
    const { placa, modelo, ano, marca, cor, tipo_veiculo  } = request.body as any;
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('insert into Veiculos ( placa, modelo, ano, marca, cor, tipo_veiculo) values (?,?,?,?,?,?)', [ placa, modelo,ano ,marca, cor, tipo_veiculo]);
        const [dados] = results
        reply.status(200).send(dados)

    } catch (erro:any) {
        if (erro.code === "ECONNREFUSED") {
            console.log("ERRO: LIGUE SUA INSTANCIA DO MYSQL. ")
            reply.status(400).send({ mensagem: "ERRO: LIGUE SUA INSTANCIA DO MYSQL." })
        } else if (erro.code === "ER_BAD_DB_ERROR") {
            console.log("ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO")
        } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
        } else if (erro.code === "ER_NO_DEFAULT_FOR_FIELD") {
            console.log("ERRO: EXISTE ALGUM CAMPO QUE NÃO PODE SER NULO, E NÃO FOI PASSADO VALOR.")
            reply.status(400).send({ mensagem: "ERRO: EXISTE ALGUM CAMPO QUE NÃO PODE SER NULO, E NÃO FOI PASSADO VALOR." })
        } else {
            console.log(erro)
            reply.send({mensagem:"ERRO DESCONHECIDO"})
        }   
        
    }
})




//Laurizy
servidor.get("/veiculos", async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('SELECT * FROM Veiculos');
        const [dados] = results
        reply.status(200).send(dados)

    } catch (erro:any) {
        if (erro.code === "ECONNREFUSED") {
            console.log("ERRO: LIGUE SUA INSTANCIA DO MYSQL. ")
            reply.status(400).send({mensagem:"ERRO: LIGUE SUA INSTANCIA DO MYSQL."})	
        } else if (erro.code === "ER_BAD_DB_ERROR") {
            console.log("ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO")
        } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
        } else {
            console.log(erro)
            reply.send({mensagem:"ERRO DESCONHECIDO"})
        }   
    }
})


// Duda
servidor.post("/quartos", async (_request: FastifyRequest, reply: FastifyReply) => {
     
    try {
       const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ServerDatabase',
        port: 3306
       })
        const results = await conn.query('SELECT * FROM Quartos');
        const [dados] = results
        reply.status(200).send(dados)
    } catch (erro: any) {
        console.log(erro);
        reply.status(500).send({ mensagem: "Erro ao buscar os quartos." });
    }
}); 