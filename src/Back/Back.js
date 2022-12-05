import React from 'react'
import Main from './layouts/Main'
import Nav from './layouts/Nav'
import Side from './layouts/Side'
import { Redirect } from 'react-router-dom'

const Back = () => {
    if (sessionStorage.getItem('token') !== 'ahdshfhsjfiajsofjsdhf') {
        return <Redirect to='/login' />
    }

    return (
        <div>
        <div>
            <div className="row fixed-top">
                <div className="col-12">
                    <Nav />
                </div>
            </div>
            <div className="row" style={{marginTop: '70px'}}>
                <div className="col-3">
                    <Side />
                </div>
                <div className="col-9">
                    <Main />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Back
