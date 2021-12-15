import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { cateList } from '../Atom'
import { ErrMsg, Form } from './CreateToDo'

interface iCategory {
    category: string
}

const Title = styled.h1`
    width: 60px;
`
function CreateCategory () {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm<iCategory>()
    const [sCateList, setCateList] = useRecoilState(cateList)
    function saveLocalStorage (newCategory: string) {
        const tmpCategoryList = JSON.parse(JSON.stringify(sCateList))
        tmpCategoryList.unshift(newCategory)
        localStorage.setItem('categoryList', JSON.stringify(tmpCategoryList))
    }
    function onSaveCategory ({ category }: iCategory) {
        setCateList(oldList => {
            return [category, ...oldList]
        })
        saveLocalStorage(category)
        reset({ category: '' })
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSaveCategory)}>
                <Title>Category Register</Title>
                <input
                    type='text'
                    {...register('category', { required: 'input a category.' })}
                />
                <button>등록</button>
            </Form>
            <ErrMsg> {errors.category && errors.category.message}</ErrMsg>
        </>
    )
}

export default CreateCategory
