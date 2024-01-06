import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCommonData } from '../../../hooks/useCommonData';
import DarkTheme from '../darkTheme/DarkTheme';
import ColorTheme from '../colorTheme/ColorTheme';
import { useScroll } from '../../../hooks/useScroll';

export default function Header({ type }) {
	const [Frame, setFrame] = useState(null);
	const path = useRef(process.env.PUBLIC_URL);
	const headerRef = useRef(null);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'member', 'contact'];
	const { MenuToggle, setMenuToggle } = useCommonData();
	const { getScrollPos } = useScroll(Frame);

	const handleScroll = useCallback(
		base => {
			const scroll = getScrollPos(headerRef.current);
			scroll <= base && headerRef.current.classList.remove('visible');
			scroll >= base ? headerRef.current.classList.add('scrolled') : headerRef.current.classList.remove('scrolled');
			return scroll;
		},
		[getScrollPos]
	);

	const handleWheel = useCallback(
		(e, base) => {
			e.deltaY < 0 && handleScroll() > base
				? headerRef.current?.classList.add('visible')
				: headerRef.current.classList.remove('visible');
		},
		[handleScroll]
	);

	useEffect(() => {
		setFrame(headerRef.current.closest('.wrap'));
	}, []);

	useEffect(() => {
		Frame?.addEventListener('scroll', () => handleScroll(window.innerHeight / 3));
		Frame?.addEventListener('mousewheel', e => handleWheel(e, window.innerHeight / 2));
	}, [Frame, handleScroll, handleWheel]);

	return (
		<header
			className={`Header ${type === 'main' ? 'main' : ''}`}
			ref={headerRef}>
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
