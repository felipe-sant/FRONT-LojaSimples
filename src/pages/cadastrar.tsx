import { useState } from "react";
import Navbar from "../components/navbar";
import Produto from "../models/produto";
import css from "../styles/cadastrar.module.css"
import post from "../functions/post";

export default function Cadastrar() {
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState(0)

    const cadastrar = async () => {
        const produto: Produto = { nome: nome, preco: preco }
        try {
            if (!produto.nome || !produto.preco) {
                alert("Preencha todos os campos")
                return
            }
            await post("http://localhost:3001/produto", produto)
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <main className={css.main}>
                <h1>Cadastrar Produtos</h1>
                <div className={css.cadastrar}>
                    <div className={css.input}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div className={css.input}>
                        <label>Preço:</label>
                        <input
                            className={css.numero}
                            type="number"
                            value={preco}
                            onChange={e => setPreco(Number(e.target.value))}
                        />
                    </div>
                    <div className={css.botao}>
                        <button onClick={cadastrar}>Cadastrar</button>
                    </div>
                </div>
            </main>
        </>
    )
}