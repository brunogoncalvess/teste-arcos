import { React, useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function CadastroEstoque() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("produtos")))
  }, [])

  const handleChange = e => {
    const index = e.target.selectedIndex
    const attElement = e.target.childNodes[index]
    const id = attElement?.getAttribute("id")
    const valor = attElement?.getAttribute("valor")
    
    if (id) {
      setProduct(prev => ({
        ...prev,
        "id": id,
        [e.target.name]: e.target.value,
        "valor": valor
      }))
    } else {
      setProduct(prev => ({
        ...prev, 
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleAddStorageProduct = () => {
    const local = JSON.parse(localStorage.getItem("estoque"))

    local.push({
      id: product.id,
      produto: product.produto,
      estoque: +product.estoque,
      value: product.value
    })

    localStorage.setItem("estoque", JSON.stringify(local))
    navigate('/relatorio-produtos')
  }

  const handleIncrementStorageProduct = () => {
    const local = JSON.parse(localStorage.getItem("estoque"))

    for (let i = 0; i < local.length; i++) {
      if (local[i].id === product.id) {
        local[i].estoque += +product.estoque
      }
    }

    localStorage.setItem("estoque", JSON.stringify(local))
    navigate('/relatorio-produtos')
  }

  const handleClick = e => {    
    e.preventDefault()

    if (localStorage?.estoque) {
      if (
        JSON.parse(localStorage.getItem("estoque")).filter(
          i => i.id === product.id
        ).length
      ) {
        handleIncrementStorageProduct()
      } else {
        handleAddStorageProduct()
      }
    } else {
      localStorage.setItem(
        "estoque",
        JSON.stringify([
          {
            id: product.id,
            produto: product.produto,
            estoque: +product.estoque,
            valor: +product.valor
          },
        ])
      )
      navigate('/relatorio-produtos')
    }
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Produto</Form.Label>
          <Form.Select name="produto" required onChange={handleChange}>
            <option></option>
            {products.map(product => (
              <option key={product.id} id={product.id} valor={product.valor}>
                {product.descricao}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label required >Qtd. Estoque</Form.Label>
          <Form.Control
            name="estoque"
            type="number"
            placeholder="Insira a quantidade de estoque"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => navigate("/")}
          >
            Cancelar
          </Button>

          <Button onClick={handleClick} variant="primary" type="submit">
            Adicionar / Subtrair
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}