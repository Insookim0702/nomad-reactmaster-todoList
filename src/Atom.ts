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

export const nowCategory = atom<Categories>({
    key: 'category',
    default: Categories.TO_DO
})
export const selectedList = selector({
    key: 'categoryList',
    get: ({ get }) => {
        const selectedCategory = get(nowCategory)
        return get(atomToDoList).filter(
            todo => todo.category === selectedCategory
        )
    }
})

export const leftCategory = selector({
    key: 'leftCategory',
    get: ({ get }) => {
        /* < 가 보일 때는 DONE과 DOING일 경우이다. */
        return get(nowCategory) === Categories.DONE
            ? Categories.DOING
            : Categories.TO_DO
    }
})

export const rightCategory = selector({
    key: 'rightCategory',
    get: ({ get }) => {
        // >가 보일 때는 TODO와 DOING이다.
        return get(nowCategory) === Categories.TO_DO
            ? Categories.DOING
            : Categories.DONE
    }
})
