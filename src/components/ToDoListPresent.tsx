import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import { AtomToDoList } from './CreateToDo'
const ToDoListWrap = styled.ul`
    color: whitesmoke;
    font-size: 50px;
`
const ToDo = styled.li``
function ToDoListPresent () {
    // const toDoList = useRecoilValue(AtomToDoList)
    const [toDoList, setToDoList] = useRecoilState(AtomToDoList)
    function changeCategory (id: number, category: string) {
        const toDoIndex = toDoList.findIndex(todo => todo.id === id)
        const newToDo = JSON.parse(JSON.stringify(toDoList[toDoIndex]))
        newToDo.category = category
        console.log('newToDo', newToDo)

        const newToDoList = JSON.parse(JSON.stringify(toDoList))
        newToDoList.splice(toDoIndex, 1, newToDo)

        setToDoList(newToDoList)
        console.log(toDoList)
    }
    return (
        <>
            <ToDoListWrap>
                {toDoList.map(toDo => (
                    <ToDo key={toDo.id}>
                        {JSON.stringify(toDo)}
                        {toDo.category === 'DONE' ? null : (
                            <button
                                onClick={() => changeCategory(toDo.id, 'DONE')}
                            >
                                DONE
                            </button>
                        )}
                        {toDo.category === 'DOING' ? null : (
                            <button
                                onClick={() => changeCategory(toDo.id, 'DOING')}
                            >
                                DOING
                            </button>
                        )}
                        {toDo.category === 'TO_DO' ? null : (
                            <button
                                onClick={() => changeCategory(toDo.id, 'TO_DO')}
                            >
                                TODO
                            </button>
                        )}
                    </ToDo>
                ))}
            </ToDoListWrap>
        </>
    )
}

export default ToDoListPresent
