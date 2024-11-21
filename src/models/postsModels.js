import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Obtém todos os posts da coleção "posts" no banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array.
  return colecao.find().toArray();
}

// Cria um novo post na coleção "posts" no banco de dados.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados.
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da operação.
  return colecao.insertOne(novoPost);
}