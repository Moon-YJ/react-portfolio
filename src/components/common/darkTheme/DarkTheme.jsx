import './DarkTheme.scss';
import { MdWbSunny } from 'react-icons/md';
import { BiSolidMoon } from 'react-icons/bi';
import { useCommonData } from '../../../hooks/useCommonData';
import { useEffect } from 'react';

export default function DarkTheme() {
	const { Theme, setTheme } = useCommonData();
	const DarkTheme = localStorage.getItem('darkTheme') || 'dark';

	const handleClick = () => {
		if (Theme === 'light') {
			setTheme('dark');
			localStorage.setItem('darkTheme', 'dark');
		} else {
			setTheme('light');
			localStorage.setItem('darkTheme', 'light');
		}
	};

	useEffect(() => {
		setTheme(DarkTheme);
	}, [setTheme, DarkTheme]);

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
