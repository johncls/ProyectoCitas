import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter, Button, Input } from "reactstrap";

const modeloDoctor = {
    id:0,
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    constraseña: "",
    identificacion: "",
}

const ModalDoctor = ({ mostrarModal, setMostrarModal, guardarDoctor, editar, setEditar, editarDoctor}) => {

    const [doctor, setDoctor] = useState(modeloDoctor);

    const actualizarDato = (e) => {
        console.log(e.target.name + ":" + e.target.value);
        setDoctor(
            {
                ...doctor,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (doctor.id == 0) {
            guardarDoctor(doctor)
        } else {
            editarDoctor(doctor)
        }

        setDoctor(modeloDoctor)
    }

    useEffect(() => {
        if (editar != null) {
            setDoctor(editar)
        } else {
            setDoctor(modeloDoctor)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {doctor.id == 0 ? "Nuevo Doctor":"Editar Doctor"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={ doctor.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Direcciòn</Label>
                        <Input name="direccion" onChange={(e) => actualizarDato(e)} value={doctor.direccion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={ doctor.telefono}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={doctor.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Constraseña</Label>
                        <Input name="constraseña" onChange={(e) => actualizarDato(e)} value={doctor.constraseña} />
                    </FormGroup>
                    <FormGroup>
                        <Label>identificacion</Label>
                        <Input name="identificacion" onChange={(e) => actualizarDato(e)} value={doctor.identificacion} />
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

export default ModalDoctor;