
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

servidor.get("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
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

servidor.post("/usuarios", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, nome } = request.body as any;
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ServerDatabase',
            port: 3306
        });
        const results = await conn.query('insert into users (id,nome) values (?,?)', [id,nome]);
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
            console.log("ERRO: Existe algum campo que não pode ser nulo, e você não passou o valor dele.")
            reply.status(400).send({ mensagem: "Existe algum campo que não pode ser nulo, e você não passou o valor dele." })
        } else {
            console.log(erro)
            reply.send({mensagem:"ERRO DESCONHECIDO"})
        }   
        
    }
})