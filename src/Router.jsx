import { Routes, Route } from "react-router-dom"

import React from "react"
import Home from "./pages/Home"
import CadastroProduto from "./pages/CadastroProduto"
import CadastroVenda from "./pages/CadastroVenda"
import ProdutosCadastrados from "./pages/ProdutosCadastrados"
import Vendas from "./pages/Vendas"
import CadastroEstoque from "./pages/CadastroEstoque"

import Header from "./components/Header"

export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/cadastro-estoque" element={<CadastroEstoque />} />
        <Route path="/cadastro-venda" element={<CadastroVenda />} />
        <Route path="/relatorio-produtos" element={<ProdutosCadastrados />} />
        <Route path="/relatorio-vendas" element={<Vendas />} />
      </Routes>
    </>
  )
}
