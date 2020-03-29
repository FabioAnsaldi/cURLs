'use strict';

import React from 'react'

const TextInput = props => {

    const { query, setCurlState, type } = props

    const handleSetQueryString = event => {

        const value = event.currentTarget.value

        setCurlState(value, 'query')
    }

    return (
        <div className="textinput-component">
            <x-input type={type} value={query} onBlur={handleSetQueryString}>
                <x-icon name="public"></x-icon>
            </x-input>
        </div>
    )
}

export default TextInput
