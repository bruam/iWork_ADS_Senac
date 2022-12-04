import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import ListTrophies from "./ListTrophies";
import MaxScoreDataService from "../services/MaxScoreService";

import { getScores } from "../http-common";

export default function NavBar({ maxScore, concluded, concludedProject }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getScores();
      getScores(response.data.score);
      setLoading(false);
    })();
    // retrieveMaxScore();
  }, [concluded, concludedProject]);

  const retrieveMaxScore = () => {
    MaxScoreDataService.getAll()
      .then((response) => {
        console.log(response.data.maxScores);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (loading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mb-3 secondary-bg-color"
        >
          <Container fluid>
            <Navbar.Brand href="/" style={{ color: "#7f26fb" }}>
              iWork
            </Navbar.Brand>
            <Nav>Pontuação: {maxScore.score}</Nav>
            <Nav>Projetos concluídos: {maxScore.projects_done}</Nav>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="secondary-bg-color">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Troféus
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="secondary-bg-color">
                <ListTrophies maxScore={maxScore} />
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
