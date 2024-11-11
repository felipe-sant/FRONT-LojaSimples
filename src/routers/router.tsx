import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Carrinho from "../pages/carrinho";
import Cadastrar from "../pages/cadastrar";
import Historico from "../pages/historico";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}