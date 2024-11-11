import PropsModalEditar from "../types/propsModalEditar";
import css from "../styles/modalEditar.module.css"
import { useState } from "react";
import del from "../functions/delete";
import update from "../functions/update";

export default function ModalEditar(props: PropsModalEditar) {
    const { produto, onClose } = props;
    const [nome, setNome] = useState(produto.nome);
    const [preco, setPreco] = useState(produto.preco);

    const limparCarrinho = () => {
        localStorage.removeItem("carrinho")
        window.location.reload()
    }

    const deletarProduto = async () => {
        try {
            if (produto._id) await del(`http://localhost:3001/produto`, produto._id)
            else return
            limparCarrinho()
        } catch (error) {
            console.log(error)
        }
    }

    const atualizarProduto = async () => {
        try {
            if (!nome || !preco) {
                alert("Preencha todos os campos")
                return
            }
            if (produto._id) await update(`http://localhost:3001/produto`, produto._id, { nome, preco })
            else return
            limparCarrinho()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={css.background} onClick={onClose} />
            <div className={css.modal}>
                <div className={css.header}>
                    <h3>{produto.nome}</h3>
                    <p>{produto._id}</p>
                </div>
                <div className={css.body}>
                    <div className={css.input}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            placeholder={produto.nome}
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div className={css.input}>
                        <label>Preço:</label>
                        <input
                            type="number"
                            className={css.numero}
                            placeholder={produto.preco.toString()}
                            value={preco}
                            onChange={e => setPreco(Number(e.target.value))}
                        />
                    </div>
                    <button className={css.delete} onClick={deletarProduto}>Deletar</button>
                    <button onClick={atualizarProduto}>Salvar</button>
                </div>
            </div>
        </>
    )
}