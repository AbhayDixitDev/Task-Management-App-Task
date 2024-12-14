import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const [tasks, setTasks] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        axios.get('http://localhost:5000/api/tasks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(res => {
            setTasks(res.data.tasks)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tasks</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul>
                                    {tasks.map(task => (
                                        <li key={task._id}>
                                            <Link to={`/user/task/${task._id}`}>
                                                {task.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" as={Link} to="/user/create-task">
                                Create Task
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
