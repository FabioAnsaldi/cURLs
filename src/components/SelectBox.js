'use strict';

import React from 'react'

const getDefaultMethods = (curlObject, methodsArray) => {

    let value = 'get'
    if (
        (curlObject.data && curlObject.data.length > 0) || 
        (curlObject.dataBinary && curlObject.dataBinary.length > 0)
    ) {
        value = 'post'
    }
    if (curlObject.method) {
        value = curlObject.method.toLowerCase()
    }
    return methodsArray.map(obj => {
        obj.value === value ? obj.toggled = true : delete obj.toggled
        return obj;
    })
}

const SelectBox = props => {
    
    const { data, setCurlState, options } = props
    const optionsState = getDefaultMethods(data, options)

    const handleSetToggled = event => {

        const newState = {...data}
        const value = event.currentTarget.value

        optionsState.map(obj => {
            obj.value === value ? obj.toggled = true : delete obj.toggled
            return obj;
        })
        newState.method = optionsState.filter(obj => obj.toggled === true)[0]['value']
        setCurlState(newState)
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
