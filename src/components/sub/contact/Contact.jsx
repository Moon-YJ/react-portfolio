import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const kakao = useRef(window.kakao);
	const mapOption = {
		center: new kakao.current.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	useEffect(() => {
		const map = new kakao.current.maps.Map(mapFrame.current, mapOption);
	}, []);
	return (
		<Layout index={'06'} title={'Contact'}>
			<div className='map-box' ref={mapFrame}></div>
		</Layout>
	);
}
