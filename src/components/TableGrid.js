'use strict';

import React, { useRef } from 'react'
import ReactDataGrid from 'react-data-grid'

const getMinHeigth = number => {

    const konst = number > 1 ? 35 : 37

    return konst * (number + 1)
}

const getDefaultData = (arrayData, keys) => {

    const newData = [...arrayData];

    let fulledRow = 0
    newData.forEach(data => {
        let full = 0
        keys.forEach(obj => {
            if (obj.key !== 'action' && data[obj.key] && data[obj.key] !== '') {
                full++
            }
        }); 
        if (full === keys.length - 1) {
            fulledRow++
        }
    });
    if (newData.length === 0 || newData.length === fulledRow) {
        newData.push({ key: '' })
    }

    return newData
}

const removeEmptyRows = data => {
    
    return data.reduce((total, obj) => {
        if (obj.key !== '') {
            total.push(obj)
        }
        return total
    }, [])
}

const TableGrid = props => {

    const { columns, data, enableCellSelect, setCurlState, title } = props
    const defaultData = getDefaultData(data || [], columns)
    const refTableGrid = useRef(null);

    const handleOnCellSelected = props => {

        const last = parseInt(Object.keys(columns)[Object.keys(columns).length-1])

        if (!refTableGrid.current) {
            return false
        }
        let node = refTableGrid.current.grid.querySelector('.rdg-selected')
        if (last === props.idx) {
            node.parentNode.style.display = 'none'
        } else {
            node.parentNode.style.display = 'block'
        }
        return true;
    }

    const handleOnGridRowsUpdated = ({ fromRow, toRow, updated }) => {

        const index = Object.keys(updated)[0];

        defaultData[fromRow][index] = updated[index]
        let newState = removeEmptyRows(defaultData);
        setCurlState(newState, title.key)
    }
    
    const getCellActions = (column, row) => {
    
        const cellActions = [{
            icon: <x-button><x-icon name="delete-forever"></x-icon></x-button>,
            callback: () => {
    
                let newState = defaultData.reduce((accumulator, current) => {
                    if (current !== row) {
                        accumulator.push(current)
                    }
                    return accumulator
                }, [])
                newState = removeEmptyRows(newState)
                setCurlState(newState, title.key)
            }
        }];
        return column.key === "action" ? cellActions : null
    }

    return (
        <div className="tablegrid-component">
            <x-card>
                <header>
                    <h4>{title.value}</h4>
                </header>
                <main>
                    <ReactDataGrid
                        ref={refTableGrid}
                        columns={columns}
                        rowGetter={i => defaultData[i]}
                        rowsCount={defaultData.length}
                        minHeight={getMinHeigth(defaultData.length)}
                        enableCellSelect={enableCellSelect}
                        onGridRowsUpdated={handleOnGridRowsUpdated}
                        onCellSelected={handleOnCellSelected}
                        getCellActions={getCellActions} />
                </main>
            </x-card>
        </div>
    )
}

export default TableGrid
