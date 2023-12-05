import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { CgMenuRight, CgClose } from 'react-icons/cg';

export default function Header({ MenuToggle, setMenuToggle, Dark, setDark }) {
	const path = useRef(process.env.PUBLIC_URL);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'members', 'contact'];

	return (
		<header className='Header'>
			<h1 className='logo'>
				<Link to='/'>
					<img src={`${path.current}/img/logo/logo.png`} alt='henge_logo' />
				</Link>
			</h1>
			<ul className='gnb'>
				{menuEl.map((el, idx) => {
					return (
						<li key={el + idx}>
							<NavLink to={`/${el}`} activeClassName={'on'}>
								{el.charAt(0).toUpperCase() + el.slice(1)}
							</NavLink>
						</li>
					);
				})}
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
