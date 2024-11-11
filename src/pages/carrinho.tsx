import { useEffect, useState } from "react"
import Produto from "../models/produto"
import Navbar from "../components/navbar"
import css from "../styles/carrinho.module.css"
import post from "../functions/post"

export default function Carrinho() {
    const [produtos, setProdutos] = useState<Produto[]>([])

    const remover = (index: number) => {
        const carrinho = [...produtos]
        carrinho.splice(index, 1)
        setProdutos(carrinho)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }

    const esvaziarCarrinho = () => {
        localStorage.removeItem("carrinho")
        setProdutos([])
    }

    const comprar = async () => {
        try {
            if (produtos.length === 0) {
                alert("Carrinho vazio!")
                return
            }
            await post("http://localhost:3001/compra", { data: new Date(), produtos: produtos })
            esvaziarCarrinho()
            window.location.href = "/"
        } catch (error) {
            console.log(error)
            alert("Erro ao realizar a compra!")
        }
    }

    useEffect(() => {
        const localStorageItem = localStorage.getItem("carrinho")
        const carrinho = localStorageItem ? JSON.parse(localStorageItem) : []
        setProdutos(carrinho)
    }, [])

    return (
        <>
            <Navbar />
            <main className={css.main}>
                <h1>Carrinho</h1>
                <div className={css.carrinho}>
                    <div className={css.produtos}>
                        {produtos.map((produto, key) => (
                            <div key={key} className={css.produto}>
                                <div className={css.texto}>
                                    <h3>{produto.nome}</h3>
                                    <p>R$ {produto.preco.toFixed(2)}</p>
                                </div>
                                <div className={css.botao}>
                                    <button
                                        onClick={() => remover(key)}
                                    >Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={css.comprar}>
                        <h2>Comprar Produto</h2>
                        <div className={css.texto}>
                            {produtos.map((produto, key) => (
                                <p key={key}>R$ {produto.preco.toFixed(2)}</p>
                            ))}
                            {produtos.length > 0 &&
                                <>
                                    <hr />
                                    <p>Total: R$ {produtos.reduce((acc, produto) => acc + produto.preco, 0).toFixed(2)}</p>
                                </>
                            }
                        </div>
                        <button onClick={comprar}>Comprar</button>
                    </div>
                </div>
            </main>
        </>
    )
}