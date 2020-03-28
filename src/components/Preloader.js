'use strict';

import React from 'react'

const Preloader = () => {
    
    return (
        <div className="preloader-component">
            <div className="content">
                <x-throbber type="spin"></x-throbber>
            </div>
        </div>
    )
}

export default Preloader
