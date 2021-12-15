import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, cateList, IForm, nowCategory } from '../Atom'

export const ErrMsg = styled.span`
    width: 100%;
    color: #fc427b;
    text-align: center;
    font-size: 20px;
`
// const Button = styled.button`
//     height: 30px;
//     background-color: transparent;
//     font-size: 20px;
//     color: black;
// `
// const Select = styled.select`
//     background-color: transparent;
//     outline: none;
//     border: none;
//     color: black;
// `
export const Form = styled.form`
    border-radius: 15px;
    margin-top: 100px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(
        65deg,
        rgb(17, 236, 229) 30%,
        rgb(195, 27, 226) 114%
    );
    button {
        height: 30px;
        background-color: transparent;
        font-size: 20px;
        color: black;
    }

    select {
        background-color: transparent;
        outline: none;
        border: none;
        color: black;
    }

    input {
        height: 30px;
        font-size: 20px;
        width: 78%;
        font-size: 30px;
        border: none;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        &:focus {
            outline: none;
        }
    }
`

function CreateToDo () {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<IForm>()
    const categoryList = useRecoilValue(cateList)
    const category = useRecoilValue(nowCategory)
    const [toDoList, setToDoList] = useRecoilState(atomToDoList)
    function onValid (data: IForm) {
        const temptToDoList = JSON.parse(JSON.stringify(toDoList))
        temptToDoList.unshift({
            toDo: data.toDo,
            id: Number(new Date()),
            category
        })
        setToDoList(oldToDoList => {
            return [
                {
                    toDo: data.toDo,
                    id: Number(new Date()),
                    category
                },
                ...oldToDoList
            ]
        })

        localStorage.setItem('todoList', JSON.stringify(temptToDoList))
        reset({ toDo: '' })
    }
    const [selectedCategory, setSelectedCategory] = useRecoilState(nowCategory)
    function onInput (event: React.FormEvent<HTMLSelectElement>) {
        const {
            currentTarget: { value }
        } = event
        setSelectedCategory(value as any)
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                <select onInput={onInput} value={selectedCategory}>
                    {categoryList.map((cate, idx) => {
                        return (
                            <option key={idx} value={cate}>
                                {cate}
                            </option>
                        )
                    })}
                </select>
                <input
                    type='text'
                    {...register('toDo', {
                        required: 'input a todo.'
                    })}
                ></input>
                <button>등록</button>
            </Form>
            <ErrMsg>{errors.toDo && errors.toDo.message}</ErrMsg>
        </>
    )
}

export default CreateToDo
