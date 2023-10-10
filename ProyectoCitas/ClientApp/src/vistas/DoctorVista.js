import { Button, Table } from "reactstrap";


const TablaDoctor = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarDoctor }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Identificacion</th>
                    <th>Direccion</th>
                    <th>telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="6"> Sin regitros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td> {item.nombre}</td>
                                <td> {item.correo}</td>
                                <td> {item.identificacion}</td>
                                <td> {item.direccion}</td>
                                <td> {item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}
                                    > Editar </Button>
                                    <Button color="danger" size="sm"
                                        onClick={() => eliminarDoctor(item.id)}
                                    > Eliminar </Button>
                                </td>
                            </tr>

                        ))
                    )

                }
            </tbody>
        </Table>
    )
}

export default TablaDoctor;