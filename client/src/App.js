import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import ProjectsList from './components/ProjectsList';
import AddProject from './components/AddProject';
import Project from './components/Project';

class App extends Component {
  render() {
    return (
      <div>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/projects">iWork</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Projetos" id="basic-nav-dropdown">
                  <NavDropdown.Item href={"/add"}>Adicionar</NavDropdown.Item>                  
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={<ProjectsList/>} />
            <Route path="/projects" element={<ProjectsList/>} />
            <Route path="/add" element={<AddProject/>} />
            <Route path="/projects/:id" element={<Project/>} />
          </Routes>
        </Container>

      </div>
    )      
  }
}

export default App;
