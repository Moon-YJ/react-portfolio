import { useRef } from 'react';
import './Vid.scss';

export default function Vid() {
	const path = useRef(process.env.PUBLIC_URL);
	return (
		<section className='Vid scrolling'>
			<div className='wrapper'>
				<video
					src={`${path.current}/img/main/henge.mp4`}
					autoPlay
					loop
					muted
					frameBorder='0'></video>
			</div>
			<h1>
				The Metaphysics
				<br />
				<span>of Beauty</span>
			</h1>
		</section>
	);
}
