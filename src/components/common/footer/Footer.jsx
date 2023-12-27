import './Footer.scss';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { useCommonData } from '../../../hooks/useCommonData';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);
	const { Dark, setDark } = useCommonData();

	const handleSelect = e => {
		e.target.value === 'Dark' ? setDark(true) : setDark(false);
	};

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
					value={Dark ? 'Dark' : 'Light'}>
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
