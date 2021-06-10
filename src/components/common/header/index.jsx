import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import './header.scss'
function Header()
{

	let state=useSelector(stateFromStore=>stateFromStore)
	let dispatch=useDispatch()

	let {user,cart}=state
	let mycart=cart
	// uid here is user id from cart and user is object i.e loggedin in website currently
	// all these coming from api and stored in intialState from store 
	// the moment of bootstraping the website
	return <header>
		<div className="item">
			<img width="120"  src="/static/images/logo.png" alt=""/>
		</div>
		<div className="item">
			<Link to="/">Home</Link>
			<Link to="/Products">Products</Link>
		</div>
		<div className="item">
			<div>
				<Link to="/Login">Login</Link>
				<Link to="/Signup">Signup</Link>
			</div>
			<div>
				<button 
				onClick={e=>dispatch({type:"cart-open"})}>
					<i className="fa fa-2x fa-shopping-cart">
					</i> 
					   {"  "}
					 {mycart.length}  
					   {"  "}
					 items
				</button>
			</div>
		</div>
	</header>
}
export default Header