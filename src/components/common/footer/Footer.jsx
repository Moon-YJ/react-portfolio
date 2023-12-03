import './Footer.scss';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';

export default function Footer({ setDark }) {
	const path = useRef(process.env.PUBLIC_URL);
	const selectList = ['Light', 'Dark'];
	const [Selected, setSelected] = useState('Light');

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	useEffect(() => {
		Selected === 'Dark' && setDark(true);
		Selected === 'Light' && setDark(false);
	}, [Selected, setDark]);

	return (
		<footer className='Footer'>
			<h1>
				<Link to='/'>
					<img src={`${path.current}/img/logo/logo.png`} alt='henge_logo' />
				</Link>
			</h1>
			<ul className='txt-set'>
				<li>Terms of Service</li>
				<li>Privacy Policy</li>
				<li>Security</li>
				<li>Sitemap</li>
			</ul>
			<div className='btm'>
				<select onChange={handleSelect} value={Selected}>
					{selectList.map((list) => (
						<option value={list} key={list}>
							{list}
						</option>
					))}
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
