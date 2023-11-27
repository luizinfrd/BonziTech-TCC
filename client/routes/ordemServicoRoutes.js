require("dotenv").config();
const express = require("express");
const osRouter = express.Router();

const validarSessao = require("../modules/validarSessao");

osRouter.get("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/ordem-servico`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

osRouter.get("/:codOS", validarSessao, (req, res) => {
    const codOS = req.params.codOS;

    fetch(process.env.APIURL + `/ordem-servico/${codOS}`, {
        method: "GET",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

osRouter.post("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/ordem-servico`, {
        method: "POST",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

osRouter.put("/", validarSessao, (req, res) => {
    fetch(process.env.APIURL + `/ordem-servico`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        },
        body: JSON.stringify(req.body)
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

osRouter.delete("/:codOS", validarSessao, (req, res) => {
    const codOS = req.params.codOS;

    fetch(process.env.APIURL + `/ordem-servico/${codOS}`, {
        method: "DELETE",
        headers: {
            "Content-type": "Application/JSON",
            "codSessao": req.session.codSessao
        }
    })
    .then((response) => response.json())
    .then((response) => res.json(response))
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Erro ao conectar com o servidor." });
    });
});

module.exports = osRouter