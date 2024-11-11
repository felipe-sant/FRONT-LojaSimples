import css from "../styles/navbar.module.css"

export default function Navbar() {
    return (
        <>
            <nav className={css.nav}>
                <ul>
                    <li>
                        <a href="/">Inicio</a>
                    </li>
                    <li>
                        <a href="/carrinho">Carrinho</a>
                    </li>
                    <li>
                        <a href="/cadastrar">Cadastrar Produto</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}