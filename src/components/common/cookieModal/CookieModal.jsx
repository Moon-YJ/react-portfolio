import { useRef, useState } from 'react';
import './CookieModal.scss';
import { IoMdClose } from 'react-icons/io';
import { LiaCookieBiteSolid } from 'react-icons/lia';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, hgt, titTxt, infoTxt, btnTxt }) {
	const { setCookie, isCookie } = useCookie();
	const chk = useRef(null);
	const [Close, setClose] = useState(isCookie('oneDay=expired'));

	const handleConfirm = () => {
		if (chk.current.checked) setCookie('oneDay', 'expired', 60 * 60 * 24);
		setClose(true);
	};

	return (
		<>
			{!Close && (
				<aside
					className='CookieModal'
					style={{ width: wid, height: hgt, marginTop: -hgt / 2, marginLeft: -wid / 2 }}>
					<div className='content'>
						<span>
							<LiaCookieBiteSolid />
						</span>
						<h1>{titTxt}</h1>
						<p>{infoTxt}</p>
					</div>
					<div className='input-set'>
						<input
							ref={chk}
							type='checkbox'
						/>
						<button className='txt'>Don't show this message again for 24 hours.</button>
					</div>
					<button
						className='confirm'
						onClick={handleConfirm}>
						{btnTxt}
					</button>
					<button
						className='close'
						onClick={handleConfirm}>
						<IoMdClose />
					</button>
				</aside>
			)}
		</>
	);
}
