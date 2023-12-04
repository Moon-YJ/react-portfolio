import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useRef, useState } from 'react';

import { CgMenuRight, CgClose } from 'react-icons/cg';

export default function Header({ MenuToggle, setMenuToggle, Dark, setDark }) {
	const path = useRef(process.env.PUBLIC_URL);
	const [Toggle, setToggle] = useState(true);
	const handleChk = (status) => {
		setToggle(!status);
	};

	return (
		<header className='Header'>
			<h1 className='logo'>
				<Link to='/'>
					<img src={`${path.current}/img/logo/logo.png`} alt='henge_logo' />
				</Link>
			</h1>
			<ul className='gnb'>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>
			<div
				className={`theme ${Dark ? 'dark' : ''}`}
				onClick={() => {
					setDark(!Dark);
				}}>
				<div className='ball'></div>
			</div>
			{MenuToggle ? (
				<button className='menu' onClick={() => setMenuToggle(!MenuToggle)}>
					<CgClose />
				</button>
			) : (
				<button className='menu' onClick={() => setMenuToggle(!MenuToggle)}>
					<CgMenuRight />
				</button>
			)}
		</header>
	);
}
