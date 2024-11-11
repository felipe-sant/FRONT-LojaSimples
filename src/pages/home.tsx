import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import Produto from "../models/produto"
import css from "../styles/home.module.css"
import ProdutoComponent from "../components/produto"
import get from "../functions/get"

function Home() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    const limparCarrinho = () => {
        localStorage.removeItem("carrinho")
        window.location.reload()
    }

    const getProdutos = async () => {
        const produtos: Produto[] = await get("http://localhost:3001/produtos")
        setProdutos(produtos)
    }

    useEffect(() => {
        getProdutos()
    }, [])

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