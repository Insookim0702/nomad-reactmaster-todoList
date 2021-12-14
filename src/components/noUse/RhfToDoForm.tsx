import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    height: 40px;
    font-size: 20px;
`
const ErrorMessage = styled.p`
    font-size: 40px;
    color: #fc427b;
`
const Button = styled.button`
    height: 40px;
    font-size: 20px;
`
function RhfToDoForm () {
    type Inputs = {
        toDo: string
        toDo1: string
        email: string
        password1: string
        password2: string
    }
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<Inputs>()
    const onValid = (data: Inputs) => {
        if (data.password1 !== data.password2) {
            setError('password2', { message: '비밀번호가 다릅니다.' })
        }
        console.log('data', data)
    }
    console.log('formState.errors', errors)

    return (
        <>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    placeholder='TODO'
                    {...register('toDo', {
                        required: 'toDo is required',
                        maxLength: {
                            value: 5,
                            message: 'text length max is 5.'
                        }
                    })}
                />
                <ErrorMessage>
                    {errors.toDo && errors.toDo?.message}
                </ErrorMessage>
                <Input
                    placeholder='TODO1'
                    {...register('toDo1', {
                        required: 'toDo1 is required',
                        maxLength: {
                            value: 5,
                            message: 'Your text is too long.'
                        }
                    })}
                />
                <ErrorMessage>
                    {errors.toDo1 && errors.toDo1.message}
                </ErrorMessage>
                eamil
                <Input
                    placeholder='EMAIL'
                    type='text'
                    {...register('email', {
                        required: 'input the email.',
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address.'
                        }
                    })}
                />
                <ErrorMessage>
                    {errors.email && errors.email.message}
                </ErrorMessage>
                <Input
                    placeholder='PASSWORD1'
                    type='password'
                    {...register('password1', {
                        required: 'input the password.'
                    })}
                ></Input>
                <ErrorMessage>
                    {errors.password1 && errors.password1.message}
                </ErrorMessage>
                <Input
                    placeholder='PASSWORD2'
                    type='password'
                    {...register('password2', {
                        required: 'input the password.'
                    })}
                ></Input>
                <ErrorMessage>
                    {errors.password2 && errors.password2.message}
                </ErrorMessage>
                <Button type='submit'>버튼</Button>
            </Form>
        </>
    )
}

export default RhfToDoForm
