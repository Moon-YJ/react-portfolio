import { useEffect, useRef } from 'react';
import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { customText } from '../../../hooks/useText';

export default function Menu({ setMenuToggle, setDark, Dark }) {
	const path = useRef(process.env.PUBLIC_URL);
	const menuEl = ['department', 'youtube', 'gallery', 'community', 'members', 'contact'];
	const customMenu = customText('combine');

	const closeMenu = () => {
		window.innerWidth >= 1000 && setMenuToggle(false);
	};

	useEffect(() => {
		closeMenu();
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, []);

	return (
		<aside className='Menu'>
			<h1 className='logo' onClick={() => setMenuToggle(false)}>
				<Link to='/'>
					<img src={`${path.current}/img/logo/logo.png`} alt='henge_logo' />
				</Link>
			</h1>
			<ul className='gnb'>
				{menuEl.map((el, idx) => {
					return (
						<li key={el + idx} onClick={() => setMenuToggle(false)}>
							<NavLink to={`/${el}`} activeClassName={'on'}>
								{customMenu(el)}
							</NavLink>
						</li>
					);
				})}
				<div
					className={`theme ${Dark ? 'dark' : ''}`}
					onClick={() => {
						setDark(!Dark);
					}}>
					<div className='ball'></div>
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
		</aside>
	);
}
