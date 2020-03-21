'use strict';

import React, { Fragment, useEffect, useState } from 'react'
import Preloader from './Preloader'
import Navigator from './Navigator'
import Footer from './Footer'
import New from './New'

const Layout = () => {

    const [loaded, setLoaded] = useState(false)
    const [navigatorState, setNavigatorState] = useState(0)

    const handleSetTabIndex = index => {
        
        setNavigatorState(index)
    }

    useEffect(() => {

        setLoaded(true)
        
    }, [])

    return (
        <div className="layout-component">
            {(!loaded &&
            <Preloader />) ||
            <Fragment>
                <header>
                    <Navigator setTabIndex={handleSetTabIndex} />
                </header>
                <main>
                    {navigatorState == 0 && <New />}
                </main>
                <footer>
                    <Footer/>
                </footer>
            </Fragment>
            }
        </div>
    )
}

export default Layout
