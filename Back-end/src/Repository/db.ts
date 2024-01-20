// Importa o mongoose
import mongoose from "mongoose";

// Função assíncrona auto-executável para conectar ao banco de dados
(async( ) => {
    // Verifica se a variável de ambiente DB_URL está definida
    if(process.env.DB_URL){
        // Conecta ao banco de dados usando a URL definida na variável de ambiente DB_URL
        await mongoose.connect(process.env.DB_URL)
        // Se a conexão for bem-sucedida, exibe uma mensagem no console
        .then(res=>{console.log("Mongodb atlas conectado")})
        // Se ocorrer um erro, exibe uma mensagem no console com o erro
        .catch((err)=>{
            console.log("Error in db collection" + err)
        })
    }else{
        // Se a variável de ambiente DB_URL não estiver definida, exibe uma mensagem no console
        console.log("arquivo env nao configurado")
    }
})();

// Define a variável db como a conexão do mongoose
const db = mongoose.connection;

// Exporta a conexão do mongoose como padrão
export default db;
