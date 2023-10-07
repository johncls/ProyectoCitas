import { useEffect, useState, React  } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TablaContacto from "./componentes/contacto";
import ModalContacto from "./componentes/ModalContacto";


const App = () => {

    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);


    const mostrarContacto = async () => {
        const response = await fetch("api/contacto/ListaContacto");

        if (response.ok) {
            const data = await response.json();
            setContactos(data)

        } else {
            console.log("error en la lista");
        }
    }


    useEffect(() => {
        mostrarContacto()
    }, []);

    const guardarContacto = async (contacto) => {

        const response = await fetch("api/contacto/GuardarContacto", {
            method: 'POST',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto),
        })
        console.log('respuesta', JSON.stringify(contacto));
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContacto();
        }
    }

    const editarContacto = async (contacto) => {

        const response = await fetch("api/contacto/EditarContacto", {
            method: 'PUT',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto),
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContacto();
        }
    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("desa elimianr el contacto");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/EliminarContacto/" + id, {
            method: 'DELETE',
            timeout: 60000,
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContacto();
        }
    }
    return (
         
        <Container>
            {/*<Router>*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Citas Medicas</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Contacto</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/perfil">Perfil</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

                {/*<Route path="/" exact component={TablaContacto} />*/}
               {/* <Route path="/perfil" component={Perfil} />*/}
           {/* </Router>*/}
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>
                                Lista de contactos
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}> Nuevo Contacto </Button>
                            <hr></hr>

                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarContacto={eliminarContacto}
                           />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalContacto
                mostrarModal={mostrarModal}

                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}


                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
        )
}


export default App;