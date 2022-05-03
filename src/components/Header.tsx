import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../useStore'
import SideMenu from './sidemenu'
import logo from '../assets/img/logo.png'
import menu from '../assets/img/menu-icon.svg'
  
const Header = () => {
	const {	update, userid } = useStore()
	const updateStatus = (params : {[key : string] : string | number | boolean | any}) => setStates({ ...state, ...params })
	const [state, setStates] = React.useState({
		showSideMenu : false
	})
	return (
		<>
			<header>
				<div className="container">
					<div className='justify' >
						<div className='flex'>
							<Link to="/"><img src={logo} className="logo " alt={'logo'} /></Link>
							<Link to="/"><h3>Trust Wallet</h3></Link>
						</div>
						<div className='justify middle'>
							<Link to="/" className={`header-menu`}>Home</Link>
							{userid===0? <Link to="/login" className={`header-menu active`}>Sign In</Link> : <>
								<Link to="/admin" className={`header-menu`} >Admin</Link>
								<Link to="/" className={`header-menu`} onClick={() => {update({userid:0})}}>Logout</Link>
							</>}
							<span className="side-menu pointer" onClick={() => { updateStatus({ showSideMenu : true }) }}><img src={menu} alt={'menu'} /></span>
						</div>
					</div>
					{
						window.location.pathname === '/' && <h2 className='pt3'>Important wallet validation</h2>
					}
				</div>
			</header >
			
			<SideMenu menushow={state.showSideMenu} onClose={() => updateStatus({ showSideMenu : false })}  />
		</> 
	) 
};
 
export default Header;