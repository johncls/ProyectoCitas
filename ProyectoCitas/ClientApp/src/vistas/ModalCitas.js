import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter, Button, Input } from "reactstrap";

const modeloCitas = {
    id:0,
    nombre: "",
    direccion: "",
    fechaconsulta: "",
    paciente: 0,
    doctor: 0,
}

const ModalCitas = ({ mostrarModal, setMostrarModal, guardarCita, editar, setEditar, editarCita, getContacto, getDoctor }) => {

    const [cita, setCita] = useState(modeloCitas);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedPaciente(selectedValue);
    };
    const actualizarDato = (e) => {
        setCita(
            {
                ...cita,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (cita.id == 0) {
            guardarCita(cita)
        } else {
            editarCita(cita)
        }

        setCita(modeloCitas)
    }

    useEffect(() => {
        if (editar != null) {
            setCita(editar)
        } else {
            setCita(modeloCitas)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {cita.id == 0 ? "Agendar Cita":"Editar Cita"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Cita Medica</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={ cita.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Direcciòn</Label>
                        <Input name="direccion" onChange={(e) => actualizarDato(e)} value={cita.direccion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha Consulta</Label>
                        <Input type="date" name="fechaconsulta" onChange={(e) => actualizarDato(e)} value={ cita.fechaconsulta}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="getContacto">Paciente: </Label>

                        <Input type="select" name="paciente" onChange={handleSelectChange} value={selectedPaciente}>
                            <option>Selecciona...</option>
                            {getContacto.map((item) => (
                                <option onChange={(e) => actualizarDato(e)} key={item.id} value={item.id}>
                                    {item.nombre}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Doctor</Label>
                        <Input
                            type="select"
                            value={getDoctor.id}
                        >
                            <option value="">Selecciona...</option>
                            {getDoctor.map((item) => (
                                <option onChange={(e) => actualizarDato(e)} key={item.id} value={item.id}>
                                    {item.nombre}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={enviarDatos}> Guardar </Button>
                <Button color="danger" size="sm" onClick={() => setMostrarModal(cerrarModal)}> Cerrar </Button>
            </ModalFooter>
        </Modal>
            
        )
}

export default ModalCitas;