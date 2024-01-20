import express from "express";
import "dotenv/config";
import{ routes } from "./routes/Index"
import db from "./Repository/db"
import cors from "cors"

db.on("error", () => console.log("erro em estabelecer"));
db.once("open", () =>{ console.log("conexão estabelecida");})

// cria uma instancia do express
const app = express();

app.use(cors());

routes(app);

const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`O app está ouvindo a porta ${PORT}`);
})
