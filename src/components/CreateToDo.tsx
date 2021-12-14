import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { atomToDoList, Categories, IForm, selectCategory } from '../Atom'

const Input = styled.input`
    height: 30px;
    font-size: 20px;
    width: 80%;
    font-size: 30px;
    color: #5352ed;
    border: none;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    &:focus {
        outline: none;
    }
`
const ErrMsg = styled.span`
    width: 100%;
    color: #fc427b;
    text-align: center;
    font-size: 20px;
`
const Button = styled.button`
    height: 30px;
    background-color: transparent;
    font-size: 20px;
    outline: none;
    border: none;
    color: white;
`
const Select = styled.select`
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
`
const From = styled.form`
    border-radius: 15px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    background-color: #5352ed;
`

function CreateToDo () {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<IForm>()

    const setToDoList = useSetRecoilState(atomToDoList)
    const category = useRecoilValue(selectCategory)
    function onValid (data: IForm) {
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
        reset({ toDo: '' })
    }
    const [selectedCategory, setSelectedCategory] = useRecoilState(
        selectCategory
    )
    function onInput (event: React.FormEvent<HTMLSelectElement>) {
        const {
            currentTarget: { value }
        } = event
        setSelectedCategory(value as any)
    }
    return (
        <>
            <From onSubmit={handleSubmit(onValid)}>
                <Select onInput={onInput} value={selectedCategory}>
                    <option value={Categories.TO_DO}>TODO</option>
                    <option value={Categories.DOING}>DOING</option>
                    <option value={Categories.DONE}>DONE</option>
                </Select>
                <Input
                    type='text'
                    {...register('toDo', {
                        required: 'input a todo.'
                    })}
                ></Input>

                <Button>등록</Button>
            </From>
            <ErrMsg>{errors.toDo && errors.toDo.message}</ErrMsg>
        </>
    )
}

export default CreateToDo
