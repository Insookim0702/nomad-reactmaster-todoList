import { useForm, SubmitHandler } from 'react-hook-form'

function RhfToDoForm () {
    type Inputs = {
        toDo: string
        toDo1: string
    }
    const { register, handleSubmit, formState } = useForm<Inputs>()
    const onValid = (data: Inputs) => {
        console.log('data', data)
    }
    console.log('formState.errors', formState.errors)

    return (
        <>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    id='1'
                    {...register('toDo', {
                        required: 'toDo is required',
                        maxLength: 5
                    })}
                ></input>
                <input
                    id='2'
                    {...register('toDo1', {
                        required: 'toDo1 is required',
                        maxLength: {
                            value: 5,
                            message: 'Your password is too long.'
                        }
                    })}
                ></input>
                <button type='submit'>버튼</button>
            </form>
        </>
    )
}

export default RhfToDoForm
