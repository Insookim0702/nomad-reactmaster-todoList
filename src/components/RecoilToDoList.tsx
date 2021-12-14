import styled from 'styled-components'
import CreateToDo from './CreateToDo'
import ToDoListPresent from './ToDoListPresent'

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
`
const Title = styled.h1`
    font-size: 40px;
    color: white;
    text-align: center;
`
function RecoilToDoList () {
    return (
        <Container>
            <Title>To Do List</Title>
            <CreateToDo />
            <ToDoListPresent />
        </Container>
    )
}

export default RecoilToDoList
