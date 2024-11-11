import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Compra from "../models/compra";
import css from "../styles/historico.module.css"
import get from "../functions/get";

export default function Historico() {
    const [compra, setCompra] = useState<Compra[]>([])

    const getCompra = async () => {
        const compra: Compra[] = await get("http://localhost:3001/compra")
        setCompra(compra)
    }

    useEffect(() => {
        getCompra()
    }, [])

    return (
        <>
            <Navbar />
            <main className={css.main}>
                <h1>Histórico de Compra</h1>
                <div className={css.compras}>
                    {compra.map((compra, i) => {
                        const dia = new Date(compra.data).getDate()
                        const mes = new Date(compra.data).getMonth() + 1
                        const ano = new Date(compra.data).getFullYear()
                        const horario = new Date(compra.data).toLocaleTimeString()
                        return (
                            <div className={css.texto}>
                                <h2>{dia}/{mes}/{ano} - {horario}</h2>
                                <hr />
                                <ul className={css.produtos}>
                                    {compra.produtos.map((produto, i) => (
                                        <li>{produto.nome}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </main>
        </>
    )
}