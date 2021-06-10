import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {_post} from '../../../utils'
import './login.scss'
function Login(props)
{
	const [user,setuser]=React.useState({email:"",password:""})

	const [err,seterr]=React.useState({email:"",password:""})

	const [status,setstatus]=React.useState({email:false,password:false})

	const inputRef1=React.useRef(null)

	const inputRef2=React.useRef(null)


	let state=useSelector(stateFromStore=>stateFromStore)

	let dispatch=useDispatch()

	const handleClick=() => {
		const userFormValues=user
		_post("login",userFormValues)
		.then(postUserResponse=>{
			console.log(postUserResponse)
			if(postUserResponse.response==="Success")
			{
				alert("login success")
				localStorage.setItem("token",postUserResponse.user.token)
				dispatch({type:"login",payload:postUserResponse.user})
				props.history.push("/")
				
			}
			else
			{
				alert("failed to do login")
			}
			// dispatch({type:"signup",payload:[...users,postUserResponse]})
			// alert("signup success")
		})

	}
	const handleClick1=() => {
		setstatus({ email:true,password:true })
		if(!err.email &&!err.password)
		{
			return 
		}
		if(state.users.some(itemUser=>itemUser.email===user.email && itemUser.password===user.password))
		{
			let currentUser=state.users.find(itemUser=>itemUser.email===user.email && itemUser.password===user.password)
		
			alert("login success")

			dispatch({type:"login",payload:currentUser})

			props.history.push("/")
			
		}
		else
		{
			alert("login failed")
			props.history.push("/Signup")
		}
	}
	const validation=() => {
		seterr({
			email:status.email?(inputRef1.current.validationMessage?"valid email required":""):"",
			password:status.password?(inputRef2.current.validationMessage?"valid password required":""):"",
		})
	}

	React.useEffect(validation,[user])
	const handleChange=e=>{
		let {name,value}=e.target
		setuser({...user,[name]:value})	
	setstatus({...status,[name]:true})	
	}
	

	return <div className="login">
		<div className="left">
			<h1>Login</h1>
			<h3>Get Acces to your orders wishlist and recommendations</h3>
		</div>
		<div className="right">
			<p>Email</p>
			<input 
			 ref={inputRef1} 
			 
             type="email"
			 required={true} 
			 name="email" 
			 placeholder="Email" 
			 value={user.email} 
			 
			 onChange={handleChange} 
			 />
			<span className="error">{err.email}</span>
			<p>Password</p>
			<input 
			 ref={inputRef2} 
			 
			 min="8"
			 max="20" 
			 pattern="[a-zA-Z0-9]{8,}" 
			 required={true} 
			 type="password" 
			 name="password" 
			 placeholder="password" 
			 value={user.password} 

			 onChange={handleChange} 
			 />
			<span className="error">{err.password}</span>
			<button onClick={handleClick}>Login</button>
		</div>
	</div>
}
export default Login