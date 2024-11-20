import express from "express";

const posts = [
    { id: 1, descricao: 'Uma foto teste', imagem: 'https://placecats.com/millie/300/150' },
    { id: 2, descricao: 'Gato curioso olhando pela janela', imagem: 'https://placecats.com/millie/300/150' },
    { id: 3, descricao: 'Gato fazendo panqueca', imagem: 'https://placecats.com/millie/300/150' }
];

// configurações do servidor
const app = express();
app.use(express.json());    //uso do json na aplicação

// iniciando o servidor em node js
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

//rota para acessar todos os posts
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// função para buscar um post que contenha o mesmo id da requisição URL
function buscarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

//inserindo um dado variável na rota - buscar um post específico
app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});
