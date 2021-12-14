import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, Categories, selectCategory, selectedList } from '../Atom'

const ToDoListWrap = styled.ul`
    color: whitesmoke;
`

const ToDo = styled.li``
function ToDoListPresent () {
    const [toDoList, setToDoList] = useRecoilState(atomToDoList)
    function changeCategory (id: number, category: Categories) {
        const deepCopyToDoList = JSON.parse(JSON.stringify(toDoList))
        const toDoIndex = toDoList.findIndex(todo => todo.id === id)
        const newToDo = JSON.parse(JSON.stringify(toDoList[toDoIndex]))
        newToDo.category = category
        deepCopyToDoList.splice(toDoIndex, 1, newToDo)

        setToDoList(deepCopyToDoList)
    }
    const selectedCategory = useRecoilValue(selectCategory)
    const showList = useRecoilValue(selectedList)
    return (
        <>
            <ToDoListWrap>
                <h1>{selectedCategory}</h1>
                {showList.map(item => (
                    <ToDo key={item.id}>
                        {JSON.stringify(item)}
                        {item.category === Categories.TO_DO ? null : (
                            <button
                                onClick={() =>
                                    changeCategory(item.id, Categories.DONE)
                                }
                            >
                                DONE
                            </button>
                        )}
                        {item.category === Categories.DOING ? null : (
                            <button
                                onClick={() =>
                                    changeCategory(item.id, Categories.DOING)
                                }
                            >
                                DOING
                            </button>
                        )}
                        {item.category === Categories.DONE ? null : (
                            <button
                                onClick={() =>
                                    changeCategory(item.id, Categories.TO_DO)
                                }
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
