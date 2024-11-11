import { useState } from "react"
import Navbar from "../components/navbar"
import Produto from "../models/produto"
import css from "../styles/home.module.css"
import ProdutoComponent from "../components/produto"

function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([
        { nome: "Produto 1", preco: 100 },
        { nome: "Produto 2", preco: 200 },
        { nome: "Produto 3", preco: 300 },
        { nome: "Produto 4", preco: 400 },
        { nome: "Produto 5", preco: 500 }
    ])

    const limparCarrinho = () => {
        localStorage.removeItem("carrinho")
        window.location.reload()
    }

    return (
        <>
            <Navbar />
            <main className={css.main}>
                <h1>Produtos</h1> 
                <button onClick={limparCarrinho}>LIMPAR</button>
                <div className={css.produtos}>
                    {produtos.map((produto, i) => {
                        return (
                            <ProdutoComponent produto={produto} key={i} />
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default Home