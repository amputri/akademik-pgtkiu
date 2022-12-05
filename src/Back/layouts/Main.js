import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Content from '../Content'

const Main = () => {
    const { path } = useRouteMatch()

    return (
        <div className='my-5 bg-white rounded p-2 mx-5'>
            <Switch>
                <Route path={`${path}/:isi`}>
                    <Content />
                </Route>
            </Switch>
        </div>
    )
}

export default Main
