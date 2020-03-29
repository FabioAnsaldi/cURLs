'use strict';

import React from 'react'

const getDefaultText = (curlObject) => {

    if (
        (!curlObject.headers || curlObject.headers.length === 0) &&
        (!curlObject.others || curlObject.others.length === 0) &&
        !curlObject.query &&
        !curlObject.dataBinary &&
        !curlObject.data
    ) {
        return "";
    }
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
            return ` -H '${header.key}:${header.value}'`
        })
    }
    text += headers.join(' ')
    if (curlObject.data) {
        text += ` --data '${curlObject.dataBinary}`
    }
    if (curlObject.dataBinary) {
        text += ` --data-binary '${curlObject.dataBinary}`
    }
    let others = []
    if (curlObject.others) {
        others = curlObject.others.map((other) => {
            return ` --${other.key}`
        })
    }
    text += others.join(' ')
    return text
}

const parseString = curlObject => {

    return Array.isArray(curlObject) ? curlObject.map(string => {
        
        const stringArray = string.split(':')

        return {
            key: stringArray.shift(),
            value: stringArray.join(':')
        }
    }) : []
}

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

const RawText = props => {

    const { curlState, setCurlState } = props
    const textState = getDefaultText(curlState)

    const handleKeyUp = event => {

        const value = event.currentTarget.value
        const headers = getParams(value, /-H\s+\'(.*?)\'/gm)
        const querystring = getParams(value, /\'(https?:\/\/[^\s]+)\'/gm)
        const method = getParams(value, /(?:--request|-X)\s+(.*?)\s+/gm)
        const data = getParams(value, /--data\s+\'(.*?)\'/gm)
        const dataBinary = getParams(value, /--data-binary\s+\'(.*?)\'/gm)
        const others = getParams(value, /\s--(\S*)/gm, ['data', 'data-binary'])
        const newState = { ...curlState }

        newState.headers = parseString(headers)
        newState.query = querystring[0]
        newState.method = method[0]
        newState.data = data[0]
        newState.dataBinary = dataBinary[0]
        newState.others = parseString(others)
        setCurlState(newState)
    }

    return (
        <div className="rawtext-component">
            <x-box>
                <x-textarea tabIndex={0} value={textState} onBlur={handleKeyUp}>
                    <x-label>curl 'http://api.example.net/' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' ...</x-label>
                </x-textarea>
            </x-box>
        </div>
    )
}

export default RawText
