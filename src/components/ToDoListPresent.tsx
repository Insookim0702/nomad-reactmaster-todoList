import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, Categories, nowCategory, selectedList } from '../Atom'
import Header from './Header'

const ToDoListWrap = styled.ul`
    color: whitesmoke;
`

const ToDo = styled.li`
    background-color: black;
    border-radius: 15px;
    padding: 10px;
    margin: 10px 0;
    color: rgb(146, 171, 207);
    display: grid;
    grid-template-columns: 9fr 1fr;
    align-items: center;
    &:hover {
        background-color: #111c2e;
        color: white;
    }
`

const Button = styled.button`
    background-color: #2cffff;
    border-radius: 20px;
    width: 60px;
    color: black;
    padding: 4px;
    font-size: 10px;
    font-weight: 900;
    z-index: 9;
    margin: 4px;
`

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
function ToDoListPresent () {
    const [toDoList, setToDoList] = useRecoilState(atomToDoList)
    function onClickChangeCategory (aId: number, aCategory: Categories) {
        const tempToDoList = JSON.parse(JSON.stringify(toDoList))
        const matchIndex = toDoList.findIndex(todo => todo.id === aId)
        const changedToDo = JSON.parse(JSON.stringify(tempToDoList[matchIndex]))
        changedToDo.category = aCategory
        tempToDoList.splice(matchIndex, 1, changedToDo)
        localStorage.setItem('todoList', JSON.stringify(tempToDoList))
        setToDoList(tempToDoList)
    }
    const showList = useRecoilValue(selectedList)
    return (
        <>
            <Header />
            <ToDoListWrap>
                {showList.map(item => (
                    <ToDo key={item.id}>
                        {item.toDo}
                        <ButtonWrap>
                            {item.category === Categories.TO_DO ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(
                                            item.id,
                                            Categories.TO_DO
                                        )
                                    }
                                >
                                    TODO
                                </Button>
                            )}
                            {item.category === Categories.DOING ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(
                                            item.id,
                                            Categories.DOING
                                        )
                                    }
                                >
                                    DOING
                                </Button>
                            )}
                            {item.category === Categories.DONE ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(
                                            item.id,
                                            Categories.DONE
                                        )
                                    }
                                >
                                    DONE
                                </Button>
                            )}
                        </ButtonWrap>
                    </ToDo>
                ))}
            </ToDoListWrap>
        </>
    )
}

export default ToDoListPresent
