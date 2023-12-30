import './DarkTheme.scss';
import { MdWbSunny } from 'react-icons/md';
import { BiSolidMoon } from 'react-icons/bi';
import { useCommonData } from '../../../hooks/useCommonData';
import { useCookie } from '../../../hooks/useCookie';
import { useEffect } from 'react';

export default function DarkTheme() {
	const { Theme, setTheme } = useCommonData();
	const { setCookie, isCookie } = useCookie();
	const handleClick = () => {
		setTheme(Theme === 'dark' ? 'light' : 'dark');
		setCookie('Theme', Theme === 'dark' ? 'light' : 'dark', 60 * 60 * 12);
	};

	useEffect(() => {
		if (isCookie('Theme')) setTheme(document.cookie.split('Theme=')[1].split(';')[0]);
	}, [isCookie, setTheme]);

	return (
		<div
			className={`DarkTheme ${Theme === 'dark' ? 'dark' : ''}`}
			onClick={handleClick}>
			<div className='ball'></div>
			<span className='icon'>
				<MdWbSunny className='sun' />
				<BiSolidMoon className='moon' />
			</span>
		</div>
	);
}
