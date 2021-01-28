import React from 'react'
import styled, { css } from 'styled-components'
import NavLinks from './NavLinks'

const Navbar = () => {
    return (
        <StyledNavigation>
            <NavLinks />
        </StyledNavigation>
    )
}

export default Navbar

const StyledNavigation = styled.nav`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    transition: all 150ms linear;

    border-bottom: 2px solid #f1f1f1;
    justify-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    padding: 0 60px;
    z-index: 2;

    ${(props) =>
        props.isScrolled &&
        css`
            background: var(--headerBg);
            box-shadow: var(--headerBoxShadow)
    `}

    @media screen and (max-width: 768px) {
        justify-content: space-between;
        padding: 0 30px;
    }

`