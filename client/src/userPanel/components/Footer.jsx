import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="bg-black text-white p-4 text-center">
            <Container>
                <Row>
                    <Col md={12}>
                        <p className="mb-0">
                            &copy; {new Date().getFullYear()} Copyright: Abhay Dixit
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
