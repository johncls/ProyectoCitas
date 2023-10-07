import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
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
        console.log('respuesta', JSON.stringify(contacto));
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