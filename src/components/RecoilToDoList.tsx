import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, cateList } from '../Atom'
import CreateCategory from './CreateCategory'
import CreateToDo from './CreateToDo'
import ToDoListPresent from './ToDoListPresent'

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
`
function RecoilToDoList () {
    const setToDoList = useSetRecoilState(atomToDoList)
    const setCateList = useSetRecoilState(cateList)
    const toDoList = localStorage.getItem('todoList')
    setToDoList(JSON.parse(toDoList || '[]')) // JSON.parse는 string만을 매개변수로 받는다. null 안 된다.
    const categoryList = JSON.parse(
        localStorage.getItem('categoryList') || '["TO_DO","DOING", "DONE"]'
    )
    setCateList(categoryList)

    return (
        <Container>
            <CreateCategory />
            <CreateToDo />
            <ToDoListPresent />
        </Container>
    )
}

export default RecoilToDoList
