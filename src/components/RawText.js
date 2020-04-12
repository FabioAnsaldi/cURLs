'use strict';

import React from 'react'

const regexs = [
    { key: 'headers', value: /-H\s*\'(.*?)\'/gm },
    { key: 'querystring', value: /\'(https?:\/\/[^\s]+)\'/gm },
    { key: 'method', value: /(?:--request|-X)\s+(.*?)\s+/gm },
    { key: 'data', value: /--data\s*\'(.*?)\'/gm },
    { key: 'dataBinary', value: /--data-binary\s+\'(.*?)\'/gm },
    { key: 'others', value: /\s--([a-zA-Z]*)/gm, exclude: ['data', 'data-binary'] },
]

const getParams = (curl, regex, exclude = []) => {
        
    let result = [], m = null;
    while ((m = regex.exec(curl)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }
        // The result can be accessed through the `m`-variable.
        if ( !exclude.includes(m[1]) ) {
            result.push(m[1])
        }
    }
    
    return result.length > 0 ? result : []
}

const setCleanText = (curlObject) => {

    let text = "curl"
    if (curlObject.method) {
        text += ` -X ${curlObject.method.toUpperCase()}`
    } else if (!curlObject.data && ! curlObject.dataBinary) {
        text += " -X GET"
    } else {
        text += " -X POST"
    }
    if (curlObject.query) {
        text += ` '${curlObject.query}'`
    }
    let headers = []
    if (curlObject.headers) {
        headers = curlObject.headers.map((header) => {
            return ` -H '${header.key}: ${header.value}'`
        })
    }
    text += headers.join(' ')
    if (curlObject.data) {
        text += ` --data '${curlObject.data}'`
    }
    if (curlObject.dataBinary) {
        text += ` --data-binary '${curlObject.dataBinary}'`
    }
    let others = []
    if (curlObject.others) {
        others = curlObject.others.map((other) => {
            return ` --${other.key}`
        })
    }
    text += others.join(' ')
    if (
        (!curlObject.headers || curlObject.headers.length === 0) &&
        (!curlObject.others || curlObject.others.length === 0) &&
        !curlObject.query &&
        !curlObject.dataBinary &&
        !curlObject.data
    ) {
        curlObject.cleaned = ""
    } else {
        curlObject.cleaned = text
    }
    
    return curlObject
}

const parseString = curlObject => {

    return Array.isArray(curlObject) ? curlObject.map(string => {
        
        const stringArray = string.split(':')

        return {
            key: stringArray.shift().trim(),
            value: stringArray.join(':').trim()
        }
    }) : []
}

const RawText = props => {

    const { curlState, setCurlState } = props
    const dataObject = setCleanText(curlState)

    const handleKeyUp = event => {

        const value = event.currentTarget.value
        const newState = { ...curlState }

        regexs.forEach(regex => {
            newState[regex.key] = getParams(value, regex.value, regex.exclude)
        });
        newState.headers = parseString(newState.headers)
        newState.query = newState.querystring[0]
        newState.method = newState.method[0]
        newState.data = newState.data[0]
        newState.dataBinary = newState.dataBinary[0]
        newState.others = parseString(newState.others)
        setCurlState(newState)
    }

    return (
        <div className="rawtext-component">
            <x-box>
                <x-textarea tabIndex={0} value={dataObject.cleaned} onBlur={handleKeyUp}>
                    <x-label>curl 'http://api.example.net/' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' ...</x-label>
                </x-textarea>
            </x-box>
        </div>
    )
}

export default RawText
