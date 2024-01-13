import { useRef } from 'react';
import './Email.scss';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function Email({ isMain }) {
	const refEmail = useRef(null);
	const refChk = useRef(null);

	const handleEmail = e => {
		e.preventDefault();
		const [txt1, txt2] = refEmail.current.value.split('@');
		const txt3 = txt2 && txt2.split('.');
		//prettier-ignore
		if (!txt1 || !txt2 || !txt3[0] || !txt3[1] || !refChk.current.checked) {
			alert('Please enter your email correctly and agree by checking the box.')
		} else {
			alert('Thank you! Your subscription has been submitted successfully.');
			refEmail.current.value = '';
			refChk.current.checked = false;
		}
	};

	return (
		<section className={`mail ${isMain ? 'scrolling' : ''}`}>
			<div className='mail-txt'>
				<h3>
					Subscribe to
					<br />
					our newsletter
				</h3>
				<p>To stay up to date on new products and events of the Henge world</p>
			</div>
			<form onSubmit={handleEmail}>
				<div className='mail-box'>
					<input
						type='text'
						name='email'
						placeholder='Email *'
						ref={refEmail}
					/>
					<button className='send'>
						<MdKeyboardArrowRight />
					</button>
				</div>
				<label htmlFor='terms'>
					<input
						type='checkbox'
						name='terms'
						id='terms'
						defaultValue='terms'
						ref={refChk}
					/>
					<span>
						Agree to <span className='line'>Terms and Conditions</span>
					</span>
				</label>
			</form>
		</section>
	);
}
