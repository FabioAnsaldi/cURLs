'use strict';

import React from 'react'

const getDefaultData = obj => {

    if (obj.dataBinary && obj.dataBinary != '') {
        return obj.dataBinary;
    } else {
        return obj.data
    }
}

const getDefaultTabSelected = obj => {

    if (obj.dataBinary && obj.dataBinary != '') {
        return 1
    } else {
        return 0
    }
}

const getToggledState = (index, state) => {

    if (index == state) {
        return { toggled: true }
    } else {
        return {}
    }
}

const DataForm = props => {

    const { dataSet, setCurlState } = props
    const defaultData = getDefaultData(dataSet)
    
    let tabSelected = getDefaultTabSelected(dataSet)

    const handleTabClick = event => {

        tabSelected = parseInt(event.currentTarget.dataset.index)
        const newState = {...dataSet}

        if (tabSelected == 0) {
            newState.data = defaultData
            delete newState.dataBinary
        } else {
            newState.dataBinary = defaultData
            delete newState.data
        }
        setCurlState(newState)
    }
    
    const handleTextKeyUp = event => {

        const value = event.currentTarget.value

        if (tabSelected == 0) {
            newState.data = value
            delete newState.dataBinary
        } else {
            newState.dataBinary = value
            delete newState.data
        }
        setCurlState(newState)
    }

    return (
        <div className="dataform-component">
            <x-radios>
                <x-box>
                    <div className="__radio">
                        <x-radio onClick={handleTabClick} data-index="0" id="data-radio" {...getToggledState(0, tabSelected)}></x-radio>
                        <x-label for="data-radio" id="data-label">Data</x-label>
                    </div>
                    <div className="__radio">
                        <x-radio onClick={handleTabClick} data-index="1" id="data-binary-radio" {...getToggledState(1, tabSelected)}></x-radio>
                        <x-label for="data-binary-radio" id="data-binary-label">Data-Binary</x-label>
                    </div>
                </x-box>
            </x-radios>
            <x-box>
                <x-textarea tabIndex={0} value={defaultData} onBlur={handleTextKeyUp}>
                    <x-label>[{'"name" : "value"'}, ...]</x-label>
                </x-textarea>
            </x-box>
        </div>
    )
}

export default DataForm
