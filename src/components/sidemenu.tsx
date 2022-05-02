import { Link } from 'react-router-dom'
import React from 'react'
import { Close } from '../components/Icons'
import logo from '../assets/img/logo.png'
import '../assets/scss/wallet.scss'

import useStore from '../useStore'

interface SideMenuProps {
	menushow: boolean
	onClose: () => void
}

const SideMenu = ({ menushow,  onClose }: SideMenuProps) => {
	
	const {	update, userid } = useStore()
	const updateStatus = (params : {[key : string] : string | number | boolean | any}) => setStates({ ...state, ...params })
	const [state, setStates] = React.useState({
		showSideMenu : false
	})

	return (
		<>
			<div className={`side-menu-panel `} style={{right:`${menushow?'0':'-102%'}`}}>
				<div className="header-bar justify">
					<img src={logo} alt="logo" />
					<span className='pointer' onClick={onClose}>
						<Close width={20} height={20} />
					</span>
				</div>
				<Link to="/" className={`header-menu`}>Home</Link>
				{userid===0? <Link to="/login" className={`header-menu active`}>Sign In</Link> : <>
					<Link to="/admin" className={`header-menu`} >Admin</Link>
					<Link to="/" className={`header-menu`} onClick={() => {update({userid:0})}}>Logout</Link>
				</>}

				<Link to="../login" className='side-menu active'>Login</Link>
			</div>
		</>
	)
};

export default SideMenu;