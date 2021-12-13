import styled from 'styled-components'
import CreateToDo from './CreateToDo'
import ToDoListPresent from './ToDoListPresent'

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
`
const Title = styled.h1`
    font-size: 40px;
    color: white;
`
function RecoilToDoList () {
    return (
        <Container>
            <Title>투두리스트</Title>
            <CreateToDo />
            <ToDoListPresent />
        </Container>
    )
}

export default RecoilToDoList
