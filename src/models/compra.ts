import Produto from "./produto";

type Compra = {
    _id?: string;
    produtos: Produto[];
    data: Date;
}

export default Compra