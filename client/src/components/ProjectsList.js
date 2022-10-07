import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/ProjectService";
import { Link } from "react-router-dom";
import Moment from "moment";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    retrieveProjects();
  }, []);

  const initialProjectState = {
    id: null,
    title: "",
    deadline: null
  };

  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(value)
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline
    };

    ProjectDataService.create(data)
      .then(response => {
        setProject({
          id: response.data.id,
          title: response.data.title,
          deadline: response.data.deadline
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then(response => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProjects();
    setCurrentProject(null);
    setCurrentIndex(-1);
  };

  const setActiveProject = (project, index) => {
    setCurrentProject(project);
    setCurrentIndex(index);
  };

  const removeAllProjects = () => {
    ProjectDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Container fluid>  
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Iniciar novo projeto
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Novo Projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Título do seu projeto" 
                    required
                    value={project.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Prazo estipulado</Form.Label>
                  <Form.Control 
                    type="date" 
                    placeholder="Prazo do seu projeto" 
                    value={project.deadline}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>              
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="primary" 
                onClick={saveProject}
              >
                Criar
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>        
      </Row> 
      <Row>
        <Col md={5}>
          <h4>Lista de Projetos</h4>

          <ListGroup as="ul">
            {projects &&
              projects.map((project, index) => (
                <ListGroup.Item
                  action               
                  onClick={() => setActiveProject(project, index)}
                  key={index}
                >
                  {project.title}
                </ListGroup.Item>
            ))}          
          </ListGroup>        

          <Button className="mt-3" variant="danger" onClick={removeAllProjects}>
            Deletar todos
          </Button>
        </Col>
      </Row>
      <Row className="mt-10">
        <Col lg={true}>
          {currentProject ? (
            <div>
              <h4>Projeto</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {currentProject.title}
              </div>
              <div>
                <label>
                  <strong>Prazo:</strong>
                </label>{" "}
                {Moment(currentProject.deadline).format('DD/MM/YYYY')}
              </div>            

              <Link
                to={"/projects/" + currentProject.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor selecione um projeto...</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectsList;