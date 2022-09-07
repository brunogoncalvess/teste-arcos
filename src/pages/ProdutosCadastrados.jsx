import React, { useEffect, useState } from "react"
import { Container, Card, Button, Modal, Form } from "react-bootstrap"

export default function ProdutosCadastrados() {
  const [products, setProducts] = useState([])
  const [storage, setStorage] = useState([])
  const [report, setReport] = useState([])
  const [product, setProduct] = useState({})

  //Modal Edit
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = (product) => {
    setShow(true)
    setProduct(product)    
  }
  //Modal Delete 
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = (product) => {
    setShow1(true)
    setProduct(product)
  }

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("produtos")))
    setStorage(JSON.parse(localStorage.getItem("estoque")))
  }, [])

  useEffect(() => {
    handleReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const handleReport = () => {
    const productsCopy = JSON.parse(JSON.stringify(products))
    const storageCopy = JSON.parse(JSON.stringify(storage))
    const reportLocal = [...productsCopy]

    for (let i = 0; i < productsCopy.length; i++) {
      for (let j = 0; j < storageCopy?.length; j++) {
        if (productsCopy[i].id == storageCopy[j].id) {
          reportLocal[i].estoque = storageCopy[j].estoque
        }
      }
    }

    setReport(reportLocal)
  }

  const handleChangeDescricao = e => {
    setProduct(prev => ({
      ...prev,
      'descricao': e.target.value
    }))
  
  }

  const handleChangeValor = e => {
    setProduct(prev => ({
      ...prev,
      'valor': +e.target.value
    }))
  }

  const handleSave = () => {
    const productsCopy = JSON.parse(JSON.stringify(products))
    productsCopy.filter(p => {
      if (p.id == product.id) {
        p.descricao = product.descricao
        p.valor = product.valor
      }
    })
    setProducts(productsCopy)
    localStorage.setItem('produtos', JSON.stringify(productsCopy))
    handleClose()
  }

  const handleDelete = () => {
    const productsCopy = JSON.parse(JSON.stringify(products))
    productsCopy.filter(p => {
      if (p.id == product.id) {
        productsCopy.splice(productsCopy.indexOf(p), 1)
      }
    })
    setProducts(productsCopy)
    localStorage.setItem('produtos', JSON.stringify(productsCopy))    
    handleClose1()
  }

  return (
    <>
      <Container>
        {report.map(product => {
          return (
            <Card key={product.id} className="mb-2">
              <Card.Body>
                <Card.Title>{product.descricao}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Código: {product.id}
                </Card.Subtitle>
                <Card.Text>
                  Qtd. em estoque: <strong>{product.estoque || 0}</strong><br/>
                  Valor: <strong>{product.valor?.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) || 0}</strong><br/>
                  Valor do estoque: <strong>{((product.estoque || 0) * product.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong><br/>
                </Card.Text>

                <Button variant="secondary" className="me-2" onClick={() => handleShow(product)}>
                  Alterar
                </Button>
                <Button variant="danger" onClick={() => handleShow1(product)}>Exlcuir</Button>
              </Card.Body>
            </Card>
          )
        })}
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                defaultValue={product.descricao}
                onChange={handleChangeDescricao}
              />
            </Form.Group> 
            <Form.Group>
              <Form.Label>Valor</Form.Label>
              <Form.Control defaultValue={product.valor} onChange={handleChangeValor}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Alterar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Produto?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>{product.descricao}</h6>
            <span className="text-muted">Código: {product.id}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Exlcuir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}