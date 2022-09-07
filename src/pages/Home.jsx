import { React, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Container } from "react-bootstrap"

export default function Home() {
  const produtos = [
    { id: uuidv4(), descricao: "PRODUTO1", valor: 20 },
    { id: uuidv4(), descricao: "PRODUTO2", valor: 29.3 },
    { id: uuidv4(), descricao: "PRODUTO3", valor: 39.1 },
  ]

  useEffect(() => {
    return localStorage?.produtos
      ? undefined
      : localStorage.setItem("produtos", JSON.stringify(produtos))
  }, [])

  return (
    <Container className="size-container">
      <h1>Coviduana</h1>
      <p>Máscaras e importados</p>
    </Container>
  )
}
