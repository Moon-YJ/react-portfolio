import './Footer.scss';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.darkReducer.dark);

	const handleSelect = e => {
		e.target.value === 'Dark'
			? dispatch({ type: types.DARK.start, payload: true })
			: dispatch({ type: types.DARK.start, payload: false });
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
