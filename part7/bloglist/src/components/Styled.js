import styled from 'styled-components'

export const Button = styled.button`
  width: 100px;
  background-color: whitesmoke;
  border: solid 1px;
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow: 1px 2px 2px lightslategrey;
  border-radius: 5px;
  height: 30px;
  margin: 20px;
  cursor: pointer;
  outline: none;
`

export const RemoveButton = styled(Button)`
    background-color: lightpink;
`

export const LikeButton = styled(Button)`
    background-color: lightskyblue;
`
