import React from "react";
import Header from "../../layout/Header";
import Resume from "../../pages/Resume";
import Container from '../../layout/Container';
import './index.css';

function App() {
    return (
    <>
        <Header/>
        <Container>
            <Resume/>
        </Container>
    </>
  )
}

export default App;
