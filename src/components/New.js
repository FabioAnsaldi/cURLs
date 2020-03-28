'use strict';

import React, { useState } from 'react'
import RawText from './RawText'
import KeyValue from './KeyValue'

const New = () => {

    const [tabState, setTabState] = useState(0)
    const [curlState, setCurlState] = useState(JSON.parse(localStorage.getItem("cURLs")) || {})

    const handleSetCurlState = state => {
        
        localStorage.setItem("cURLs", JSON.stringify(state))
        setCurlState(state)
    }

    const handleClick = event => {

        const index = parseInt(event.currentTarget.dataset.index)

        setTabState(index)
    }

    return (
        <div className="new-component">
            <x-card>
                <header>
                    <h3>New request</h3>
                </header>
                <main>
                    <x-tabs>
                        <x-tab onClick={handleClick} data-index="0" selected>
                            <x-label>Raw</x-label>
                        </x-tab>
                        <x-tab onClick={handleClick} data-index="1">
                            <x-label>Key - Value</x-label>
                        </x-tab>
                    </x-tabs>
                    <br/>
                    {tabState == 0 && <RawText curlState={curlState} setCurlState={handleSetCurlState}/>}
                    {tabState == 1 && <KeyValue curlState={curlState} setCurlState={handleSetCurlState}/>}
                    <br/>
                    <div className="submit">
                        <x-button>
                            <x-box>
                                <x-icon name="play-circle-filled"></x-icon>
                                <x-label>Play</x-label>
                            </x-box>
                        </x-button>
                    </div>
                </main>
            </x-card>
        </div>
    )
}

export default New
