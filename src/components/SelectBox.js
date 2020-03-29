'use strict';

import React from 'react'

const getDefaultOptions = (value, methodsArray) => {

    return methodsArray.map(obj => {
        obj.value === value ? obj.toggled = true : delete obj.toggled
        return obj;
    })
}

const SelectBox = props => {
    
    const { method, setCurlState, options } = props
    const optionsState = getDefaultOptions(method, options)

    const handleSetToggled = event => {

        const value = event.currentTarget.value

        optionsState.map(obj => {
            obj.value === value ? obj.toggled = true : delete obj.toggled
            return obj;
        })
        const newValue = optionsState.filter(obj => obj.toggled === true)[0]['value']

        setCurlState(newValue, 'method')
    }

    return (
        <div className="selectbox-component">
            <x-select>
                <x-menu>
                {optionsState.map(obj => (
                    <x-menuitem key={obj.value} onClick={handleSetToggled} {...obj}>
                        <x-label>{obj.value.toUpperCase()}</x-label>
                    </x-menuitem>
                ))}
                </x-menu>
            </x-select>
        </div>
    )
}

export default SelectBox
