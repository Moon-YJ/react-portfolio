import './Footer.scss';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);

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
				<select name='mode'>
					<option value='dark'>Dark</option>
					<option value='light'>Light</option>
				</select>
				<ul className='icon-set'>
					<li>
						<FaTwitter size={17} />
					</li>
					<li>
						<FaGithub size={17} />
					</li>
					<li>
						<FaFacebookF size={17} />
					</li>
					<li>
						<FaYoutube size={17} />
					</li>
				</ul>
				<p>&copy; 2023 henge All rights reserved.</p>
			</div>
		</footer>
	);
}
