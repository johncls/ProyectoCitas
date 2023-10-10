import { useEffect, useState, React } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaDoctor from "../vistas/DoctorVista"
import ModalDoctor from "../vistas/ModalDoctor";

const DoctorLogic = () => {

    const [doctores, setDoctores] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarDoctor = async () => {
        const response = await fetch("api/doctor/ListaDoctor");

        if (response.ok) {
            const data = await response.json();
            setDoctores(data)

        } else {
            console.log("error en la lista");
        }
    }


    useEffect(() => {
        mostrarDoctor()
    }, []);

    const guardarDoctor = async (doctor) => {

        const response = await fetch("api/doctor/GuardarDoctor", {
            method: 'POST',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(doctor),
        })
        console.log('respuesta', JSON.stringify(doctor));
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarDoctor();
        }
    }

    const editarDoctor = async (doctor) => {

        const response = await fetch("api/doctor/EditarDoctor", {
            method: 'PUT',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(doctor),
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarDoctor();
        }
    }

    const eliminarDoctor = async (id) => {

        var respuesta = window.confirm("desea eliminar el dcctor");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/doctor/EliminarDoctor/" + id, {
            method: 'DELETE',
            timeout: 60000,
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarDoctor();
        }
    }

    return (
        <div>
            <Row className="mt-5">
            <Col sm="12">
                <Card>
                    <CardHeader>
                        <h5>
                            Lista de doctores
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}> Nuevo Doctor </Button>
                        <hr></hr>

                        <TablaDoctor
                            data={doctores}
                            setEditar={setEditar}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}

                            eliminarContacto={eliminarDoctor}
                        />
                    </CardBody>
                </Card>
            </Col>
            </Row>
            <ModalDoctor
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarDoctor={guardarDoctor}
                editar={editar}
                setEditar={setEditar}
                editarDoctor={editarDoctor} />
        </div>
        
    )
}

export default DoctorLogic;