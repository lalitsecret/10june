import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from '../components/App'

const intialState={
	products:[],
	categories:[],
	banners:[],
	users:[],
	user:{},
	order:1,
	max:5,
	cart:[],
	toggleCart:false,
	loggedin:false
}
function reducer(state=intialState,action)
{
	console.log(action.payload,state.cart,state.user)
	switch(action.type)
	{
		case "products":return {...state,products:action.payload}
		case "categories":return {...state,categories:action.payload}
		case "banners":return {...state,banners:action.payload}
		case "users":return {...state,users:action.payload}
		case "cart":return {...state,cart:action.payload}
		case "orders":return {...state,orders:action.payload}

		case "banners-active":return {...state,order:action.payload}
		case "cart-close":return {...state,toggleCart:false}
		case "addtocart":return {...state,toggleCart:true,cart:action.payload}
		case "cart-open":return {...state,toggleCart:true}
		case "login":return {...state,user:action.payload,loggedin:true} 
		case "signup":return {...state,users:action.payload} 
		case "logout":return {...state,user:{},loggedin:false} 
		default:
			return state
	}
}
const store=createStore(reducer)
const Main=() => {
	return <Provider store={store}>
		<App/>
	</Provider>
}


export default Main