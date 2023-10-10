import { React  } from "react";
import { Container} from "reactstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactoLogic from "./componentes/contacto";
import DoctorLogic from "./componentes/doctor";
import Layout from "./vistas/Layout"

const App = () => {



    return (
         
        <Container>
            <Router>
                <Layout />
                <Routes>
                    <Route exact path="/" element={<ContactoLogic />} />
                    <Route path="/Doctor" element={<DoctorLogic />} />
                </Routes>                
            </Router>
            

        </Container>
        )
}


export default App;