import React from "react"
import { Navbar, Nav, Container, Dropdown, DropdownButton } from "react-bootstrap"
import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container style={{display: "flex", flexWrap: "wrap"}}>
          <Navbar.Brand href="#home">Coviduana</Navbar.Brand>
          <Nav className="me-auto" style={{display: "flex", flexWrap: "wrap"}}>
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/cadastro-produto">+Produto</Nav.Link>
            <Nav.Link as={Link} to="/cadastro-estoque">Estoque</Nav.Link>            
            {/* <Nav.Link as={Link} to="/cadastro-venda"  className="me-2">+Venda</Nav.Link>             */}
            <DropdownButton id="dropdown-basic-button" title="Relatórios">              
              <Dropdown.Item as={Link} to="/relatorio-produtos">Relatorio Produtos</Dropdown.Item>
              {/* <Dropdown.Item as={Link} to="/relatorio-vendas">Relatorio vendas</Dropdown.Item> */}
            </DropdownButton>
          </Nav>
        </Container>
      </Navbar>
      <br />   
    </>
  )
}
