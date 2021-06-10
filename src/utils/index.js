import axios from 'axios'
export function token()
{
	if(localStorage.getItem("token"))
	{
		return localStorage.getItem("token")	
	}
	else
	{
		return ""
	}
}

// axios.defaults.headers.common = {'Authorization': `bearer ${token()}`}
const url="http://localhost:8080"

export function _get(str)
{
	console.log(str,"get request")
	return axios.get(`${url}/${str}`,options()).then(response=>response.data)
}
export function _delete(str)
{
	console.log(str,"delete request")
	return axios.delete(`${url}/${str}`,options()).then(response=>response.data)
}

export function _post(str,data)
{
	// console.log(str,"post request",data,options())
	return axios.post(`${url}/${str}`,data,options()).then(response=>response.data)
}
export function _patch(str,data)
{
	console.log(str,"patch request",data)
	return axios.patch(`${url}/${str}`,data,options()).then(response=>response.data)
}


export function options()
{
	return {headers:{'Authorization': `bearer ${token()}`}}
}	