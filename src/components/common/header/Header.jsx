import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useRef } from 'react';
//import { CgMenuRight, CgClose } from 'react-icons/cg';
import { MdWbSunny } from 'react-icons/md';
import { BiSolidMoon } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Header() {
	const path = useRef(process.env.PUBLIC_URL);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'member', 'contact'];
	const dispatch = useDispatch();
	const MenuToggle = useSelector(store => store.menuReducer.menu);
	const Dark = useSelector(store => store.darkReducer.dark);

	return (
		<header className='Header'>
			<h1 className='logo'>
				<Link to='/'>
					<img
						src={`${path.current}/img/logo/logo.png`}
						alt='henge_logo'
					/>
				</Link>
			</h1>
			<ul className='gnb'>
				{menuEl.map((el, idx) => {
					return (
						<li key={el + idx}>
							<NavLink
								to={`/${el}`}
								activeClassName={'on'}>
								{el.charAt(0).toUpperCase() + el.slice(1)}
							</NavLink>
						</li>
					);
				})}
			</ul>
			<div
				className={`theme ${Dark ? 'dark' : ''}`}
				onClick={() => {
					dispatch({ type: types.DARK.start, payload: !Dark });
				}}>
				<div className='ball'></div>
				<span className='icon'>
					<MdWbSunny className='sun' />
					<BiSolidMoon className='moon' />
				</span>
			</div>
			{/* {MenuToggle ? (
				<button
					className='menu'
					onClick={() => setMenuToggle(false)}>
					<CgClose />
				</button>
			) : (
				<button
					className='menu'
					onClick={() => setMenuToggle(true)}>
					<CgMenuRight />
				</button>
			)} */}
			<div
				className={`menu ${MenuToggle ? 'on' : ''}`}
				onClick={() => dispatch({ type: types.MENU.start, payload: !MenuToggle })}>
				<span className='line1'></span>
				<span className='line2'></span>
				<span className='line3'></span>
			</div>
		</header>
	);
}
