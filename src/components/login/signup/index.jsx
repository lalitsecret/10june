import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './signup.scss'
import {_post} from '../../../utils'
function Signup(props)
{
	const [user,setuser]=React.useState({fn:"",ln:"",email:"",pwd:"",cpwd:""})

	const [err,seterr]=React.useState({fn:"",ln:"",email:"",pwd:"",cpwd:""})

	const [status,setstatus]=React.useState({fn:false,ln:false,email:false,pwd:false,cpwd:false})

	let state=useSelector(stateFromStore=>stateFromStore)

	let dispatch=useDispatch()

	let {users}=state

	const inputRef1=React.useRef(null)
	const inputRef2=React.useRef(null)
	const inputRef3=React.useRef(null)
	const inputRef4=React.useRef(null)
	const inputRef5=React.useRef(null)
		



	const handleClick=() => {

		// setstatus({fn:true,ln:true,email:true,pwd:true,cpwd:true})

		// if(!err.fn &&!err.ln &&!err.email &&!err.pwd&&!err.cpwd )
		// {
		// 	return 
		// }

		if(user.pwd===user.cpwd)
		{
			// if(users.some(itemUser=>itemUser.email===user.email))
			// {
			// 	alert("email already exists")
			// 	props.history.push("/Login")
			// }
			// else
			// {
				let userFormValues={
					fn:user.fn,
					ln:user.ln,
					email:user.email,
					password:user.pwd
				}
				_post("signup",userFormValues)
				.then(postUserResponse=>{
					// console.log(postUserResponse)
					if(postUserResponse.response==="Success")
					{
						alert("signup success")
						props.history.push("/Login")
						
					}
					else
					{
						alert("failed to do signup")
					}
					// dispatch({type:"signup",payload:[...users,postUserResponse]})
					// alert("signup success")
				})
			// }
		}
		else
		{
			alert("passwords donot match")
		}
	}

	const validation=() => {
		seterr({
			fn:status.fn?(inputRef1.current.validationMessage?"your name is not correct":""):"",
			ln:status.ln?(inputRef2.current.validationMessage?"enter lastname correctly":""):"",
			email:status.email?(inputRef3.current.validationMessage?"valid email required":""):"",
			pwd:status.pwd?(inputRef4.current.validationMessage?"valid password required":""):"",
			cpwd:status.cpwd?(inputRef5.current.validationMessage?"type confirm password correctly":""):""	
				
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
			<h1>Signup</h1>
			<h3>We do not share your personal details with anyone</h3>
		</div>
		<div className="right">
			<p>First Name</p>
			<input required={true} min="5" max="100"  name="fn" ref={inputRef1}  onChange={handleChange} value={user.fn} placeholder="First Name"/>
			<span className="error">{err.fn}</span>
			<p>Last Name</p>
			<input required={true} min="2" max="200" name="ln" ref={inputRef2}  onChange={handleChange} value={user.ln} placeholder="Last Name"/>
			<span className="error">{err.ln}</span>
			<p>Email</p>
			<input type="email" required={true} name="email" ref={inputRef3}  onChange={handleChange} value={user.email} placeholder="Email"/>
			<span className="error">{err.email}</span>
			<p>Password</p>
			<input min="8" max="20" pattern="[a-zA-Z0-9]{8,}" required={true} name="pwd" ref={inputRef4}  onChange={handleChange} value={user.pwd} placeholder="Password"/>
			<span className="error">{err.pwd}</span>
			<p>Confirm Password</p>
			<input required={true} pattern={user.pwd} name="cpwd" ref={inputRef5}  onChange={handleChange} value={user.cpwd} placeholder="Confirm Password"/>
			<span className="error">{err.cpwd}</span>
			<button onClick={handleClick}>Signup</button>
		</div>
	</div>
}
export default Signup