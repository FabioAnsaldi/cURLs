'use strict';

import React from 'react'
import TableGrig from './TableGrid'
import TextInput from './TextInput';
import SelectBox from './SelectBox';

const queryMethods = [
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

const getDefaultMethod = (curlObject) => {

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
    return value
}

const KeyValue = props => {

    const { curlState, setCurlState } = props

    const handleSetCurlState = (state, groupName) => {
        
        const newState = {...curlState}

        if (groupName) {
            newState[groupName] = state
            setCurlState(newState)
        } else {
            setCurlState(state)
        }
    }

    return (
        <div className="keyvalue-component">
            <x-box>
                <SelectBox method={getDefaultMethod(curlState)} options={queryMethods} setCurlState={handleSetCurlState} />
                <TextInput type="url" query={curlState.query} setCurlState={handleSetCurlState} />
            </x-box>
            <x-box>
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
            </x-box>
            <x-box>
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
            </x-box>
        </div>
    )
}

export default KeyValue
