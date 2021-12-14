import { atom, selector } from 'recoil'
export enum Categories {
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE'
}
export interface IForm {
    toDo: string
    id: number
    category: Categories
}

export const atomToDoList = atom<IForm[]>({
    key: 'ToDoList',
    default: []
})

export const selectCategory = atom<Categories>({
    key: 'category',
    default: Categories.TO_DO
})
export const selectedList = selector({
    key: 'categoryList',
    get: ({ get }) => {
        const selectedCategory = get(selectCategory)
        return get(atomToDoList).filter(
            todo => todo.category === selectedCategory
        )
    }
})
