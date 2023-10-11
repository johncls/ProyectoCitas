import { useEffect, useState, React } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaCita from "../vistas/CitaVista";
import ModalCita from "../vistas/ModalCitas";

const CitaLogic = () => {

    const [citas, setCitas] = useState([]);
    const [contacto, setContacto] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarCita = async () => {

        const response = await fetch("api/citasmedicas/ListaCita");
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            setCitas(data)

        } else {
            console.log("error en la lista");
        }
    }

    const getContacto = async () => {

        const response = await fetch("api/contacto/GetContacto");
 
        if (response.ok) {
            const data = await response.json();
            setContacto(data)

        } else {
            console.log("error en la lista");
        }
    }

    const getDoctor = async () => {

        const response = await fetch("api/doctor/GetDoctor");

        if (response.ok) {
            const data = await response.json();
            setDoctor(data)

        } else {
            console.log("error en la lista doctores");
        }
    }


    useEffect(() => {
        mostrarCita();
        getContacto();
        getDoctor();
    }, []);

    const guardarCita = async (cita) => {

        const response = await fetch("api/citasmedicas/GuardarCita", {
            method: 'POST',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cita),
        })
        console.log('respuesta', JSON.stringify(cita));
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCita();
        }
    }

    const editarCita = async (citas) => {

        const response = await fetch("api/citasmedicas/EditarCita", {
            method: 'PUT',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(citas),
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCita();
        }
    }

    const eliminarCita = async (id) => {

        var respuesta = window.confirm("desea eliminar la cita medica");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/citasmedicas/EliminarCita/" + id, {
            method: 'DELETE',
            timeout: 60000,
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarCita();
        }
    }

    

    return (
        <div>
            <Row className="mt-5">
            <Col sm="12">
                <Card>
                    <CardHeader>
                        <h5>
                            Citas Medicas
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}> Nueva Cita Medica </Button>
                        <hr></hr>

                        <TablaCita
                            data={citas}
                            setEditar={setEditar}
                            mostrarModal={mostrarModal}
                            setMostrarModal={setMostrarModal}

                            eliminarCita={eliminarCita}
                        />
                    </CardBody>
                </Card>
            </Col>
            </Row>
            <ModalCita
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarCita={guardarCita}
                editar={editar}
                setEditar={setEditar}
                editarCita={editarCita}
                getContacto={contacto}
                getDoctor={doctor}
            />
        </div>
        
    )
}

export default CitaLogic;