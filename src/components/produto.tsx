import { useEffect, useState } from "react";
import Produto from "../models/produto";
import css from "../styles/produto.module.css"
import carrinho_imagem from "../images/shopping-cart.svg"
import ModalEditar from "./modal";

export default function ProdutoComponent(props: { produto: Produto }) {
    const { produto } = props

    const verificar = (): boolean => {
        const localStorageItem = localStorage.getItem("carrinho")
        const carrinho = localStorageItem ? JSON.parse(localStorageItem) : []
        const index = carrinho.findIndex((p: Produto) => p.nome === produto.nome)
        return index !== -1
    }

    const [adicionado, setAdicionado] = useState<boolean>(verificar() ? true : false)

    const adicionar = () => {
        const localStorageItem = localStorage.getItem("carrinho")
        const carrinho = localStorageItem ? JSON.parse(localStorageItem) : []
        carrinho.push(produto)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }

    const remover = () => {
        const localStorageItem = localStorage.getItem("carrinho")
        const carrinho = localStorageItem ? JSON.parse(localStorageItem) : []
        const index = carrinho.findIndex((p: Produto) => p.nome === produto.nome)
        if (index === -1) return
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }

    const interagir = () => {
        if (verificar()) {
            remover()
            setAdicionado(false)
        } else {
            adicionar()
            setAdicionado(true)
        }
    }

    const [open, setOpen] = useState<boolean>(false)

    const onClose = () => setOpen(false)
    const onOpen = () => setOpen(true)

    return (
        <>
            <div className={css.produto}>
                <div>
                    <h2>{produto.nome}</h2>
                    <p>R$ {produto.preco.toFixed(2)}</p>
                    {produto.quantidade && <p>Quantidade: {produto.quantidade}</p>}
                    <button onClick={onOpen} className={css.editar}>EDITAR</button>
                </div>
                <button className={verificar() ? css.adicionado : css.remover} onClick={interagir}>
                    <img src={carrinho_imagem} alt="" />
                </button>
            </div>
            <hr />
            {open ? <ModalEditar onClose={onClose} produto={produto} /> : null}
        </>
    )
}