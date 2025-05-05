import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2/promise';
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'

const servidor = fastify()
servidor.register(cors)

servidor.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Fastify está Funcionando!")
})

servidor.listen({ port: 8080 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou")
    }
    console.log(`Fastify iniciado na porta: ${endereco}`)
})  

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
        const [dados, Tabela] = results
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

servidor.get("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('SELECT * FROM users');
        const [dados, Tabela] = results
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
        const [dados, Tabela] = results
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

servidor.get("/veiculos", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('SELECT * FROM Veiculos');
        const [dados, Tabela] = results
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

