import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCommonData } from '../../../hooks/useCommonData';
import DarkTheme from '../darkTheme/DarkTheme';
import ColorTheme from '../colorTheme/ColorTheme';

export default function Header() {
	const path = useRef(process.env.PUBLIC_URL);
	const wrap = useRef(null);
	const isHide = useRef(false);
	const isReset = useRef(true);
	const [PosScroll, setPosScroll] = useState(0);
	const [PosWheel, setPosWheel] = useState(100);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'member', 'contact'];
	const { MenuToggle, setMenuToggle } = useCommonData();

	const handleScroll = useCallback(() => {
		const deltaY = wrap.current.scrollTop - PosScroll;
		isHide.current = wrap.current.scrollTop !== 0 && deltaY >= 0;
		if (wrap.current.scrollTop === 0) isReset.current = true;
		else isReset.current = false;
		setPosScroll(wrap.current.scrollTop);
	}, [PosScroll]);

	const handleWheel = e => {
		console.log(wrap.current.scrollTop, '::wrap');
		console.log(wrap.current.offsetTop, 'offsetTop');
		console.log(e.deltaY);
		if (wrap.current.scrollTop === 0) isReset.current = true;
		else isReset.current = false;
		setPosWheel(wrap.current.scrollTop);
	};

	useEffect(() => {
		isReset.current = true;
		wrap.current = document.querySelector('.wrap');
		wrap.current.addEventListener('scroll', handleScroll);
		wrap.current.addEventListener('mousewheel', handleWheel);
		return () => {
			wrap.current.removeEventListener('scroll', handleScroll);
			wrap.current.removeEventListener('mousewheel', handleWheel);
		};
	}, [handleScroll]);

	return (
		<header className={`Header ${isHide.current ? 'scrolled' : ''} ${isReset.current ? 'reset' : ''}`}>
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
			<DarkTheme />
			<ColorTheme />
			<div
				className={`menu ${MenuToggle ? 'on' : ''}`}
				onClick={() => setMenuToggle(!MenuToggle)}>
				<span className='line1'></span>
				<span className='line2'></span>
				<span className='line3'></span>
			</div>
		</header>
	);
}
