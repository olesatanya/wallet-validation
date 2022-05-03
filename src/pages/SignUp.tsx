import React from 'react'
import useStore from '../useStore'
import {tips} from '../util'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Signup = () => {
	const {call, update} = useStore()
	const updateStatus = (params: {[key: string]: string | number | boolean | Blob | any }) => setStates({ ...state, ...params })

	const [state, setStates] = React.useState({
		key : "",
		name : "",
		password:""
	})
	const submit = async() => {
		if(state.key.trim() === ''){
			tips("Invalid key");
			return;
		}
		if(state.name.trim() === ''){
			tips("Invalid name");
			return;
		}
		if(state.password.trim() === ''){
			tips("Invalid password");
			return;
		}
		const response = await call("/api/signup", {key:state.key , id:state.name, password:state.password});
		if(response){
			switch(response['error']){
				case 0: tips("Success: registered new admin"); window.location.href="/login"; break; 
				case 2: tips("Error: Invalid admin key"); break; 
				case 3: tips("Error: Already exists same admin"); break; 
				case 1: tips("Error: Unknown error"); break; 
			}
		}
	}
	 
	return (
		<>		
			<Header />
			<div className="container" style={{minHeight:'70vh'}}>
				<div className="row center" style={{marginTop:'250px'}}>
					<div className="col-lg-6 col-sm-12">
						<div className="form">
							<h3 className='text-center'>SignUp</h3>
							<div className="row pl3 pr3">
								<p>Private Key</p>
								<input type="text" className='w100' value={state.key} onChange={(e)=> {updateStatus({key:e.target.value})}}/>
							</div>
							<div className="row pl3 pr3">
								<p>Name</p>
								<input type="text" className='w100' value={state.name} onChange={(e)=> {updateStatus({name:e.target.value})}}/>
							</div>
							<div className="row pl3 pr3">
								<p>Password</p>
								<input type="password" className='w100' value={state.password} onChange={(e)=> {updateStatus({password:e.target.value})}}/>
							</div>
							<div className="row center mt3">
								<button className='btn-linear	w30' onClick={() => {submit()}}> Register </button>
							</div>
										
							<div className="row center mt3">
								<Link to="login" style={{textDecoration:'underline'}}> Login </Link>
							</div>	
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Signup
