'use strict';

import React, { useRef } from 'react'

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
        if (!exclude.includes(m[1])) {
            result.push(m[1])
        }
    }
    
    return result.length > 0 ? result : []
}

const setCleanText = (curlObject) => {

    const newObject = { ...curlObject }

    let text = "curl"
    if (newObject.method) {
        text += ` -X ${newObject.method.toUpperCase()}`
    } else if (!newObject.data && ! newObject.dataBinary) {
        text += " -X GET"
    } else {
        text += " -X POST"
    }
    if (newObject.query) {
        text += ` '${newObject.query}'`
    }
    let headers = []
    if (newObject.headers) {
        headers = newObject.headers.map((header) => {
            return ` -H '${header.key}: ${header.value || ''}'`
        })
    }
    text += headers.join(' ')
    if (newObject.data) {
        text += ` --data '${newObject.data}'`
    } else if (newObject.dataBinary) {
        text += ` --data-binary '${newObject.dataBinary}'`
    }
    let others = []
    if (newObject.others) {
        others = newObject.others.map((other) => {
            return ` --${other.key}`
        })
    }
    text += others.join(' ')
    if (text.length <= 'curl -X DELETE'.length) {
        newObject.cleaned = ""
    } else {
        newObject.cleaned = text
    }
    
    return newObject
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

const createNodeErrors = curl => {

    const styles = 'color: #D8000C; background-color: #FFD2D2'

    let result = regexs.reduce((total, regex) => {
        return total.replace(regex.value, '')
    }, curl);
    result = result.replace('curl', '').trim()
    if (result !== '') {
        result = curl.replace(result, `<span style="${styles}">${result}</span>`)
    }

    return result
}

const getStateParams = (state, string) => {

    const newState = { ...state }

    regexs.forEach(regex => {
        newState[regex.key] = getParams(string, regex.value, regex.exclude)
    });

    return newState
}

const RawText = props => {

    const { curlState, setCurlState, checkTextError } = props
    const dataObject = setCleanText(curlState)
    const refTextArea = useRef(null);

    const setCurlText = html => {

        if (refTextArea.current) {
            refTextArea.current['#editor'].innerHTML = html
        }
    }

    const setNewState = value => {

        const newState = getStateParams(curlState, value)

        newState.headers = parseString(newState.headers)
        newState.query = newState.querystring[0]
        newState.method = newState.method[0]
        newState.data = newState.data[0]
        newState.dataBinary = newState.dataBinary[0]
        newState.others = parseString(newState.others)
        setCurlState(newState)
    }

    const handleOnBlur = event => {

        const value = event.currentTarget.value
        
        let errors = createNodeErrors(value)
        if (errors) {
            return setCurlText(errors)
        }
        setNewState(value)
    }

    return (
        <div className="rawtext-component">
            <x-box>
                <x-textarea
                ref={refTextArea}
                tabIndex={0}
                value={dataObject.cleaned}
                onBlur={handleOnBlur}>
                    <x-label>curl 'http://api.example.net/' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' ...</x-label>
                </x-textarea>
            </x-box>
        </div>
    )
}

export default RawText
