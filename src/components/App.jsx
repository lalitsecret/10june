import React from 'react'
import {_get} from '../utils'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Header from './common/header'
import Footer from './common/footer'
import Login from './login/login'
import Signup from './login/signup'

import Home from './pages/home'
import Products from './pages/plp'
import Cart from './pages/cart'

import {useDispatch} from 'react-redux'

function App()
{
	let dispatch=useDispatch()


	React.useEffect(() =>{
		_get("banners").then(d=>dispatch({type:"banners",payload:d}))
		_get("categories").then(d=>dispatch({type:"categories",payload:d}))
		_get("products").then(d=>dispatch({type:"products",payload:d}))
		// _get("users").then(d=>dispatch({type:"users",payload:d}))
		_get("cart").then(d=>{
			// console.clear()
			// console.log(d)
			if(d.response==="Success")
			{
				dispatch({type:"cart",payload:d.responseMessage})
			}
		})
		// _get("orders").then(d=>dispatch({type:"orders",payload:d}))
	},[])
	return <BrowserRouter>
		<Header/>
		<div className="container">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/Login" component={Login} />
				<Route exact path="/Products" component={Products} />
				<Route exact path="/Signup" component={Signup} />
			</Switch>
		</div>
		<Footer/>
		<Cart/>
	</BrowserRouter>
}
export default App