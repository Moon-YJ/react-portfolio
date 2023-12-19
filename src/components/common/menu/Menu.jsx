import { useEffect, useRef, useCallback } from 'react';
import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { MdWbSunny } from 'react-icons/md';
import { BiSolidMoon } from 'react-icons/bi';
import { customText } from '../../../hooks/useText';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Menu() {
	const path = useRef(process.env.PUBLIC_URL);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'member', 'contact'];
	const customMenu = customText('combine');
	const dispatch = useDispatch();
	const MenuToggle = useSelector(store => store.menuReducer.menu);
	const Dark = useSelector(store => store.darkReducer.dark);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<AnimatePresence>
			{MenuToggle && (
				<motion.aside
					className='Menu'
					initial={{ opacity: 0, x: -150 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -150 }}
					transition={{ duration: 0.4 }}>
					<h1
						className='logo'
						onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
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
										activeClassName={'on'}
										onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
										{customMenu(el)}
									</NavLink>
								</li>
							);
						})}
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
					</ul>
					<div className='btm'>
						<ul className='icon-set'>
							<li>
								<FaTwitter />
							</li>
							<li>
								<FaGithub />
							</li>
							<li>
								<FaFacebookF />
							</li>
							<li>
								<FaYoutube />
							</li>
						</ul>
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
