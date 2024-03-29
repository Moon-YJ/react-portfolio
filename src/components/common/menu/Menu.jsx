import { useEffect, useRef, useCallback } from 'react';
import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { customText } from '../../../hooks/useText';
import { AnimatePresence, motion } from 'framer-motion';
import { useCommonData } from '../../../hooks/useCommonData';
import DarkTheme from '../darkTheme/DarkTheme';

export default function Menu() {
	const path = useRef(process.env.PUBLIC_URL);
	const menuRef = useRef(null);
	const customMenu = customText('combine');
	const { MenuToggle, setMenuToggle, menuEl } = useCommonData();

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuToggle(false);
	}, [setMenuToggle]);

	const handleOutside = e => {
		if (menuRef.current && !menuRef.current.contains(e.target)) {
			setMenuToggle(false);
		}
	};

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	useEffect(() => {
		document.addEventListener('mousedown', handleOutside);
		return () => {
			document.removeEventListener('mousedown', handleOutside);
		};
	}, []);

	return (
		<AnimatePresence>
			{MenuToggle && (
				<motion.aside
					className='Menu'
					ref={menuRef}
					initial={{ opacity: 0, x: -150 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -150 }}
					transition={{ duration: 0.4 }}>
					<h1
						className='logo'
						onClick={() => setMenuToggle(false)}>
						<Link to='/'>
							<img
								src={`${path.current}/img/logo/logo.png`}
								alt='henge_logo'
							/>
						</Link>
					</h1>
					<ul className='gnb'>
						{menuEl.current.map((el, idx) => {
							return (
								<li key={el + idx}>
									<NavLink
										to={`/${el}`}
										activeClassName={'on'}
										onClick={() => setMenuToggle(false)}>
										{customMenu(el)}
									</NavLink>
								</li>
							);
						})}
						<DarkTheme />
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
