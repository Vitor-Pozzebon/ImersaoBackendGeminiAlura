import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// função para o windows - uso do multer para imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});
//linux ou mac
//const upload = multer({ dest: "./uploads" });

const routes = (app) => {
    // permite que o servidor interprete JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // rota para fazer upload de imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;