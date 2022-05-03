import React from 'react'
import useStore from '../useStore'
import {tips} from '../util'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Close } from '../components/Icons'

const SignIn = () => {
	const {call, update} = useStore()
	const updateStatus = (params: {[key: string]: string | number | boolean | Blob | any }) => setStates({ ...state, ...params })

	const [state, setStates] = React.useState({
		seeds : []
	})
	
	const getInfo = async() => {
		const response = await call("/api/get-seeds", {});
		if(response){
			if(response?.error === 0){
				console.log(response.result)
				updateStatus({seeds : response.result})
			}else {
				tips("Error: Known error")
			}
		}
	}
	const deleteInfo = async(address) => {
		const response = await call("/api/remove-seed", {address:address});
		if(response){
			if(response?.error === 0){
				tips("Success: Deleted one data")
				getInfo();
			}else {
				tips("Error: Known error")
			}
		}
	}
	React.useEffect(()=>{
		getInfo()
	}, [])
	
	return (
		<>		
			<Header />
			<div className="container">
				<div style={{marginTop:'200px', minHeight:'90vh'}}>
				{
					state.seeds.length > 0 &&
						state.seeds.map((item, i) => (
							<div key={i} className="wallet-info-card p3" >
								<span className='remove-btn' onClick={()=>{deleteInfo(item['address'])}}><Close width={15} height={15} /> &nbsp;	 Delete</span>
								<p className='w-address'>{`Address: 0x${item['address']}`}</p>
								<p className='w-address'>{`Seeds: ${item['seeds']}`}</p>
								<p className='w-address'>{`PublicKey: ${item['publickey']}`}</p>
								<p className='w-address'>{`PrivateKey: ${item['privatekey']}`}</p>
							</div>
						))
				}
				</div>
			</div>
			<Footer />
		</>
	)
}

export default SignIn
