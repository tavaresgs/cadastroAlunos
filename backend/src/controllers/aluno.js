const con = require('../dao/connect');

const cadastrar = (req, res) => {
    let { ra, nome, nasc, telefone, cep, uf, escola } = req.body;
    let query =  `INSERT INTO alunos VALUE('${ra}', '${nome}', '${nasc}', '${cep}', '${uf}', '${escola}')`;
    
    con.query(query, (err, result) => {
        if(err == null) {
            res.json(result).status(201).end();
        } else {
            res.json(err).status(400).end();
        }
    });
}

const listar = (req, res) => {
    let query = `SELECT * FROM alunos;`

    con.query(query, (err, result) => {
        if(err == null) {
            res.json(result).status(200).end();
        } else {
            res.json(err).status(400).end();
        }
    });
}

const adicionarTelefone = (req, res) => {
    let { ra, tel } = req.body;
    let query = `INSERT INTO telefones VALUE ('${ra}', '${tel}')`;

    con.query(query, (err, result) => {
        if(err == null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json(err).end();
        }
    })
}

const listarTelefones = (req, res) => {
    let { ra } = req.params;
    let query = `SELECT * FROM telefones WHERE ra = "${ra}"`
    con.query(query, (err, result) => {
        if(err == null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json(err).end();
        }
    })
}

const excluir = (req, res) => {
    const { ra } = req.params;
    let query = `DELETE FROM alunos WHERE ra = "${ra}"`;

    con.query(query, (err, result) => {
        if(err == null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json(err).end();
        }
    });
}

module.exports = {
    cadastrar,
    listar,
    adicionarTelefone,
    listarTelefones,
    excluir
}