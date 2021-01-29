import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TogglableWrapper = styled.div`
    display: flex;
    padding-top: 80px;
    justify-content: center;
    width: 100%;
`

const StyledButton = styled.button`
    padding: 12px 20px;
    width: 100%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    }

    Togglable.displayName = 'Togglable'

    return (
        <TogglableWrapper>
            <div style={hideWhenVisible}>
                <StyledButton onClick={toggleVisibility}>{props.buttonLabel}</StyledButton>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <StyledButton onClick={toggleVisibility}>Cancel</StyledButton>
            </div>
        </TogglableWrapper>
    )
})

export default Togglable
