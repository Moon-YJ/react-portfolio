import './DarkTheme.scss';
import { MdWbSunny } from 'react-icons/md';
import { BiSolidMoon } from 'react-icons/bi';
import { useCommonData } from '../../../hooks/useCommonData';

export default function DarkTheme() {
	const { Dark, setDark } = useCommonData();
	return (
		<div
			className={`DarkTheme ${Dark ? 'dark' : ''}`}
			onClick={() => {
				setDark(!Dark);
			}}>
			<div className='ball'></div>
			<span className='icon'>
				<MdWbSunny className='sun' />
				<BiSolidMoon className='moon' />
			</span>
		</div>
	);
}
