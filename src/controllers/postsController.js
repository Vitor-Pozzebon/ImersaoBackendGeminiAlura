import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postsModels.js";

// Lista todos os posts existentes no sistema.
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados.
  const posts = await getTodosPosts();
  // Retorna os posts em formato JSON com status 200 (sucesso).
  res.status(200).json(posts);
}

// Cria um novo post no sistema.
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados na requisição.
  const novoPost = req.body;

  try {
    // Cria o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);
    // Retorna o post criado em formato JSON com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para facilitar a depuração.
    console.error(erro.message);
    // Retorna uma mensagem de erro genérica ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ "Erro: ": "Falha na requisição" });
  }
}

// Cria um novo post e faz o upload da imagem associada.
export async function uploadImagem(req, res) {
  // Obtém os dados do novo post enviados na requisição.
  const novoPost = req.body;

  try {
    // Cria o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);

    // Obtém o caminho completo para salvar a imagem.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Move a imagem temporária para o destino final.
    fs.renameSync(req.file.path, imagemAtualizada);

    // Retorna o post criado em formato JSON com status 200 (sucesso).
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para facilitar a depuração.
    console.error(erro.message);
    // Retorna uma mensagem de erro genérica ao cliente com status 500 (erro interno do servidor).
    res.status(500).json({ "Erro: ": "Falha na requisição" });
  }
}