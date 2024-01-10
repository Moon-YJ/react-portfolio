import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { useCommonData } from '../../../hooks/useCommonData';
import DarkTheme from '../darkTheme/DarkTheme';
import ColorTheme from '../colorTheme/ColorTheme';
import { useScroll } from '../../../hooks/useScroll';

export default function Header({ type }) {
	const path = useRef(process.env.PUBLIC_URL);
	const { MenuToggle, setMenuToggle, menuEl } = useCommonData();
	const { getScrollPos, Frame, refTarget } = useScroll();

	const handleScroll = useCallback(
		base => {
			if (refTarget.current.classList.contains('sub')) return;
			const scroll = getScrollPos();
			scroll <= base && refTarget.current.classList.remove('visible');
			scroll >= base ? refTarget.current.classList.add('scrolled') : refTarget.current.classList.remove('scrolled');
			return scroll;
		},
		[getScrollPos, refTarget]
	);

	const handleWheel = useCallback(
		(e, base) => {
			if (refTarget.current.classList.contains('sub')) return;
			e.deltaY < 0 && handleScroll() > base
				? refTarget.current?.classList.add('visible')
				: refTarget.current.classList.remove('visible');
		},
		[handleScroll, refTarget]
	);

	useEffect(() => {
		Frame?.addEventListener('scroll', () => handleScroll(window.innerHeight / 3));
		Frame?.addEventListener('mousewheel', e => handleWheel(e, window.innerHeight / 2));
		return () => {
			Frame?.removeEventListener('scroll', handleScroll);
			Frame?.removeEventListener('mousewheel', handleWheel);
		};
	}, [Frame, handleScroll, handleWheel]);

	return (
		<header
			className={`Header ${type}`}
			ref={refTarget}>
			<h1 className='logo'>
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
