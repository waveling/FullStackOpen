import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from './Styled'
import styled from 'styled-components'

const TogglableWrapper = styled.div`
    display: flex;
    padding-top: 80px;
    justify-content: center;
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
        <div>
            <TogglableWrapper>
                <div style={hideWhenVisible}>
                    <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
                </div>
                <div style={showWhenVisible}>
                    {props.children}
                    <Button onClick={toggleVisibility}>Cancel</Button>
                </div>
            </TogglableWrapper>
        </div>
    )
})

export default Togglable
