import React from 'react'
import './loders.scss'

const Loders = () => {
    return (
        <div className='loaderContains'>
            {/* <div id='container'> */}
            <div className='containLoader'>
                <div className='loader'>
                    <div className='loader--dot'></div>
                    <div className='loader--dot'></div>
                    <div className='loader--dot'></div>
                    <div className='loader--dot'></div>
                    <div className='loader--dot'></div>
                    <div className='loader--dot'></div>
                    <div className='loader--text'></div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Loders
