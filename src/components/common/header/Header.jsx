import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';

export default function Header() {
	const path = useRef(process.env.PUBLIC_URL);

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
		</header>
	);
}