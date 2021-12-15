import { useRecoilState, useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Categories, leftCategory, nowCategory, rightCategory } from '../Atom'
const Title = styled.h1`
    font-size: 40px;
    color: #2cffff;
    text-align: center;
    margin: 30px 0;
`
const HeaderWrap = styled.header`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-item: center;
`

const Button = styled.button`
    color: ${props => (props.disabled ? 'gray' : 'white')};
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    &:hover {
        color: ${props => (props.disabled ? 'gray' : 'rgb(17, 236, 229)')};
    }
`

function Header () {
    const [sNowCategory, setSelectedCategory] = useRecoilState(nowCategory)
    const sLeftCategory = useRecoilValue(leftCategory)
    const sRightCategory = useRecoilValue(rightCategory)
    function onClick (category: Categories) {
        setSelectedCategory(category)
    }

    return (
        <HeaderWrap>
            {
                <Button
                    disabled={sNowCategory === Categories.TO_DO}
                    onClick={() => onClick(sLeftCategory)}
                >
                    &larr;
                </Button>
            }

            <Title>{sNowCategory} List</Title>
            {
                <Button
                    disabled={sNowCategory === Categories.DONE}
                    onClick={() => onClick(sRightCategory)}
                >
                    &rarr;
                </Button>
            }
        </HeaderWrap>
    )
}

export default Header
