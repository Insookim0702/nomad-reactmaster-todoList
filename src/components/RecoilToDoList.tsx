import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { atomToDoList } from '../Atom'
import CreateToDo from './CreateToDo'
import ToDoListPresent from './ToDoListPresent'

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
`
function RecoilToDoList () {
    const setToDoList = useSetRecoilState(atomToDoList)
    const toDoList = localStorage.getItem('todoList')

    setToDoList(JSON.parse(toDoList || '[]')) // JSON.parse는 string만을 매개변수로 받는다. null 안 된다.
    return (
        <Container>
            <CreateToDo />
            <ToDoListPresent />
        </Container>
    )
}

export default RecoilToDoList
