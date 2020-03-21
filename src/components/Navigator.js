'use strict';

import React from 'react'
import PropTypes from 'prop-types'

const Navigator = props => {

    const { setTabIndex } = props

    const handleClick = event => {
        
        const value = parseInt(event.currentTarget.dataset.index)

        setTabIndex(value)
    }

    return (
        <div className="navigator-component">
            <x-tabs skin="compact">
                <x-tab onClick={handleClick} data-index="0" selected>
                    <x-icon name="autorenew"></x-icon>
                    <x-label>New</x-label>
                </x-tab>
                <x-tab onClick={handleClick} data-index="1">
                    <x-icon name="history"></x-icon>
                    <x-label>Recents</x-label>
                </x-tab>
                <x-tab onClick={handleClick} data-index="2">
                    <x-icon name="favorite"></x-icon>
                    <x-label>Favorites</x-label>
                </x-tab>
            </x-tabs>
        </div>
    )
}

Navigator.propTypes = {
    setTabIndex: PropTypes.func,
}

export default Navigator
