'use strict';

import React, { useState } from 'react'

const getDefaultData = obj => {

    if (obj.dataBinary && obj.dataBinary != '') {
        return obj.dataBinary;
    } else {
        return obj.data
    }
}

const getDefaultTabState = obj => {

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
    const [tabState, setTabState] = useState(getDefaultTabState(dataSet))

    const handleTabClick = event => {

        const index = parseInt(event.currentTarget.dataset.index)

        setTabState(index)
    }
    
    const handleTextKeyUp = event => {

        const type = tabState == 0 ? 'data' : 'dataBinary'
        const value = event.currentTarget.value

        setCurlState(value, type)
    }

    return (
        <div className="dataform-component">
            <x-radios>
                <x-box>
                    <div className="__radio">
                        <x-radio onClick={handleTabClick} data-index="0" id="data-radio" {...getToggledState(0, tabState)}></x-radio>
                        <x-label for="data-radio" id="data-label">Data</x-label>
                    </div>
                    <div className="__radio">
                        <x-radio onClick={handleTabClick} data-index="1" id="data-binary-radio" {...getToggledState(1, tabState)}></x-radio>
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
