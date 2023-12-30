import './Footer.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { useCommonData } from '../../../hooks/useCommonData';
import { useCookie } from '../../../hooks/useCookie';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);
	const { Theme, setTheme } = useCommonData();
	const { setCookie, isCookie } = useCookie();

	const handleSelect = e => {
		e.target.value === 'Dark' ? setTheme('dark') : setTheme('light');
		setCookie('Theme', Theme === 'dark' ? 'light' : 'dark', 60 * 60 * 12);
	};

	useEffect(() => {
		if (isCookie('Theme')) setTheme(document.cookie.split('Theme=')[1].split(';')[0]);
	}, [isCookie, setTheme]);

	return (
		<footer className='Footer'>
			<h1>
				<Link to='/'>
					<img
						src={`${path.current}/img/logo/logo.png`}
						alt='henge_logo'
					/>
				</Link>
			</h1>
			<ul className='txt-set'>
				<li>Terms of Service</li>
				<li>Privacy Policy</li>
				<li>Security</li>
				<li>Sitemap</li>
			</ul>
			<div className='btm'>
				<select
					onChange={handleSelect}
					value={Theme === 'dark' ? 'Dark' : 'Light'}>
					<option value='Light'>Light</option>
					<option value='Dark'>Dark</option>
				</select>
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
				<p className='txt'>&copy; 2023 henge All rights reserved.</p>
			</div>
		</footer>
	);
}
