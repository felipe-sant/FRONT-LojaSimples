import Produto from "../models/produto"

type PropsModalEditar = {
    produto: Produto;
    onClose: () => void;
}

export default PropsModalEditar;