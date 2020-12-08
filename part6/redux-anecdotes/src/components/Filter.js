import React from 'react'
import { handleFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        props.handleFilter(event.target.value)
    }
    const style = {
        marginBottom: 10,
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

//Second param for connect function. Allows the use of action creators from the connected component's props
const mapDispatchToProps = {
    handleFilter,
}
//Connect-function accepts the 'mapStateToProps' -function as a parameter
//The Anecdotes component has direct access for inspecting the state in the store
const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter)

export default ConnectedFilter