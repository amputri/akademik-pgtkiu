import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Back from './Back/Back'
import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './Back/Login'

function App() {
	return (
		<div>
			<div>
			<Router>
				<Route path="/" component={Login} exact />
				<Route path="/admin" component={Back} />
				<Route path="/login" component={Login} />
			</Router>
		</div>
		</div>
	)
}


export default App
