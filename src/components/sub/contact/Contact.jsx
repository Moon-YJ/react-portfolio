import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const kakao = useRef(window.kakao);
	const mapOpt = useRef(null);

	mapOpt.current = {
		center: new kakao.current.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
	const imageSize = new kakao.current.maps.Size(64, 69);
	const imageOption = { offset: new kakao.current.maps.Point(27, 69) };

	useEffect(() => {
		const map = new kakao.current.maps.Map(mapFrame.current, mapOpt.current);

		const marker = new kakao.current.maps.Marker({
			position: mapOpt.current.center,
			image: new kakao.current.maps.MarkerImage(imageSrc, imageSize, imageOption),
		});

		marker.setMap(map);
	}, []);

	return (
		<Layout index={'06'} title={'Contact'}>
			<div className='map-box' ref={mapFrame}></div>
		</Layout>
	);
}
