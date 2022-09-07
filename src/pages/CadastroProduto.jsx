import { React, useEffect, useState } from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import "bootstrap/dist/css/bootstrap.min.css"

export default function CadastroProduto() {

  
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('produtos')))    
  }, [])

  const [products, setProducts] = useState({})
  const [product, setProduct] = useState({})

  const handleChange = e => {
    setProduct(prev => {
      return (
        {
          ...prev, 
          [e.target.name]: e.target.value,          
        }
      )
    })
  }

  const navigate = useNavigate()
  
  const  handleClick = () => {
    const productsCopy = JSON.parse(JSON.stringify(products))

    productsCopy.push({id: uuidv4(), descricao: product.descricao, valor: +product.valor})

    localStorage.setItem('produtos', JSON.stringify(productsCopy))
  }
  

  return (
    <Container >
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descrição</Form.Label>
          <Form.Control  type="text" name="descricao" placeholder="Insira a descrição do item" onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Valor</Form.Label>
          <Form.Control type="number" name="valor" step="0.01" placeholder="Insira o valor" onChange={handleChange}/>
        </Form.Group>
        
        <Button variant="secondary" className="me-2" onClick={() => navigate('/')}>
          Cancelar
        </Button>

        <Button onClick={handleClick} variant="primary" type="submit">
          Adicionar
        </Button>
      </Form>
    </Container>
  )
}
