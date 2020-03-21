'use strict';

import React from 'react'
import TableGrig from './TableGrid'

const methods = [
    {value: 'get', toggled: true},
    {value: 'post'},
    {value: 'put'},
    {value: 'delete'}
]

const headersColumns = [
    { key: "key", name: "Key", editable: true },
    { key: "value", name: "Value", editable: true },
    { key: "action", name: "Action" }
];

const othersColumns = [
    { key: "key", name: "Key", editable: true },
    { key: "action", name: "Action" }
]

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

const KeyValue = props => {

    const { curlState, setCurlState } = props
    const methodsState = getDefaultMethods(curlState, methods)

    const handleSetCurlState = (state, groupName) => {
        
        const newState = {...curlState}

        newState[groupName] = state
        setCurlState(newState)
    }

    const handleSetToggled = event => {

        const newState = {...curlState}
        const value = event.currentTarget.value

        methodsState.map(obj => {
            obj.value === value ? obj.toggled = true : delete obj.toggled
            return obj;
        })
        newState.method = methodsState.filter(obj => obj.toggled === true)[0]['value']
        setCurlState(newState)
    }

    const handleSetQueryString = (event) => {

        const newState = {...curlState}
        const value = event.currentTarget.value

        newState.query = value
        setCurlState(newState)
    }

    return (
        <div className="keyvalue-component">
            <x-box>
                <x-select>
                    <x-menu>
                    {methodsState.map(obj => (
                        <x-menuitem key={obj.value} onClick={handleSetToggled} {...obj}>
                            <x-label>{obj.value.toUpperCase()}</x-label>
                        </x-menuitem>
                    ))}
                    </x-menu>
                </x-select>
                <x-input type="url" value={curlState.query} onBlur={handleSetQueryString}>
                    <x-icon name="public"></x-icon>
                </x-input>
            </x-box>
            {curlState.headers && curlState.headers.length > 0 &&
                <TableGrig
                    columns={headersColumns}
                    data={curlState.headers}
                    title={{
                        key: 'headers',
                        value: 'Headers parameters'
                    }}
                    setCurlState={handleSetCurlState}
                    enableCellSelect={true} />
            }
            {curlState.others && curlState.others.length > 0 &&
                <TableGrig
                    columns={othersColumns}
                    data={curlState.others}
                    title={{
                        key: 'others',
                        value: 'Others parameters'
                    }}
                    setCurlState={handleSetCurlState}
                    enableCellSelect={true} />
            }
        </div>
    )
}

export default KeyValue
