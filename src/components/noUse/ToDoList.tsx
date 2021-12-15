import React, { useState } from 'react'

function ToDoList () {
    const [toDo, setToDo] = useState('')
    const [toDoList, setToDoList] = useState<string[]>([])
    function onchange (e: React.FormEvent<HTMLInputElement>) {
        const {
            currentTarget: { value }
        } = e
        setToDo(value)
    }
    function onSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const localToDoList = toDoList
        localToDoList.push(toDo)
        setToDo('')
        setToDoList(localToDoList)
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={toDo}
                    onChange={onchange}
                    placeholder='write what to do.'
                ></input>
                <button>등록</button>
            </form>
        </>
    )
}

export default ToDoList
