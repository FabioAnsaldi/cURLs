'use strict';

import React from 'react'

const TextInput = props => {

    const { data, setCurlState, type } = props

    const handleSetQueryString = event => {

        const newState = {...data}
        const value = event.currentTarget.value

        newState.query = value
        setCurlState(newState)
    }

    return (
        <div className="textinput-component">
            <x-input type={type} value={data.query} onBlur={handleSetQueryString}>
                <x-icon name="public"></x-icon>
            </x-input>
        </div>
    )
}

export default TextInput
