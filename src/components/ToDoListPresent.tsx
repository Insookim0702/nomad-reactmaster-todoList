import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, cateList, IForm, selectedList } from '../Atom'
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
    const categoryList = useRecoilValue(cateList)
    const [toDoList, setToDoList] = useRecoilState(atomToDoList)
    function onClickChangeCategory (aId: number, aCategory: IForm['category']) {
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
                            {categoryList.map((cate, idx) => {
                                if (item.category !== cate) {
                                    return (
                                        <Button
                                            key={idx}
                                            onClick={() =>
                                                onClickChangeCategory(
                                                    item.id,
                                                    cate
                                                )
                                            }
                                        >
                                            {cate}
                                        </Button>
                                    )
                                }
                                return null
                            })}
                            {/* {item.category === 'TO_DO' ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(item.id, 'TO_DO')
                                    }
                                >
                                    TODO
                                </Button>
                            )}
                            {item.category === 'DOING' ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(item.id, 'DOING')
                                    }
                                >
                                    DOING
                                </Button>
                            )}
                            {item.category === 'DONE' ? null : (
                                <Button
                                    onClick={() =>
                                        onClickChangeCategory(item.id, 'DONE')
                                    }
                                >
                                    DONE
                                </Button>
                            )} */}
                        </ButtonWrap>
                    </ToDo>
                ))}
            </ToDoListWrap>
        </>
    )
}

export default ToDoListPresent
