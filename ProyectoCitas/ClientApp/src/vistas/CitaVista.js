import { Button, Table } from "reactstrap";


const TablaCitas = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarCita }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Cita</th>
                    <th>Direccion</th>
                    <th>Fecha Consulta</th>
                    <th>Paciente</th>
                    <th>Doctor</th>
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
                                <td> {item.direccion}</td>
                                <td> {item.fechaconsulta}</td>
                                <td> {item.doctor}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}
                                    > Editar </Button>
                                    <Button color="danger" size="sm"
                                        onClick={() => eliminarCita(item.id)}
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

export default TablaCitas;