import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, ModalFooter, Button, Input } from "reactstrap";

const modeloContacto = {
    id:0,
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    constraseña: "",
    identificacion: "",
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto}) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + ":" + e.target.value);
        setContacto(
            {
                ...contacto,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (contacto.Id == 0) {
            guardarContacto(contacto)
        } else {
            editarContacto(contacto)
        }

        setContacto(modeloContacto)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        } else {
            setContacto(modeloContacto)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.Id == 0 ? "Nuevo Contacto":"Editar Contacto"}
                Nuevo Contacto
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={ contacto.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Direcciòn</Label>
                        <Input name="direccion" onChange={(e) => actualizarDato(e)} value={contacto.direccion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={ contacto.telefono}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Constraseña</Label>
                        <Input name="constraseña" onChange={(e) => actualizarDato(e)} value={contacto.constraseña} />
                    </FormGroup>
                    <FormGroup>
                        <Label>identificacion</Label>
                        <Input name="identificacion" onChange={(e) => actualizarDato(e)} value={contacto.identificacion} />
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

export default ModalContacto;