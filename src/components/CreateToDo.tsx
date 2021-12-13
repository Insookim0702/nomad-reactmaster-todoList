import { useForm } from 'react-hook-form'
import { atom, useSetRecoilState } from 'recoil'
import styled from 'styled-components'

const Input = styled.input`
    height: 30px;
    font-size: 20px;
`
const Button = styled.button`
    height: 30px;
    font-size: 20px;
`

const ErrMsg = styled.span`
    color: #fc427b;
    font-size: 40px;
`

interface IForm {
    toDo: string
    id: number
    category: 'TO_DO' | 'DOING' | 'DONE'
}

export const AtomToDoList = atom<IForm[]>({
    key: 'ToDoList',
    default: []
})
function CreateToDo () {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<IForm>()
    const setGToDoList = useSetRecoilState(AtomToDoList)
    function onValid (data: IForm) {
        setGToDoList(oldToDoList => {
            return [
                { toDo: data.toDo, id: Number(new Date()), category: 'TO_DO' },
                ...oldToDoList
            ]
        })
        reset({ toDo: '' })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onValid)}>
                <Input
                    type='text'
                    {...register('toDo', {
                        required: 'input a todo.'
                    })}
                ></Input>
                <ErrMsg>{errors.toDo && errors.toDo.message}</ErrMsg>
                <Button>등록</Button>
            </form>
        </>
    )
}

export default CreateToDo
