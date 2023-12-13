import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { RiArrowRightDownLine } from 'react-icons/ri';
// import { GoMail } from 'react-icons/go';
// import { BsTelephone } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { BsFillTelephoneFill } from 'react-icons/bs';

export default function Contact() {
	const [Index, setIndex] = useState(0);
	const [RoadView, setRoadView] = useState(false);
	const [Traffic, setTraffic] = useState(false);

	const kakao = useRef(window.kakao);
	const mapInstance = useRef(null);
	const mapFrame = useRef(null);
	const roadFrame = useRef(null);
	const markerInstance = useRef(null);
	const path = useRef(process.env.PUBLIC_URL);
	const mapInfo = useRef([
		{
			title: 'SHOWROOM',
			address: 'Via della Spiga, 34, Milano',
			support: 'Open by appointment',
			email: 'info1@arredodalpozzo.it',
			tel: '+44 021-234-4567',
			latlng: new kakao.current.maps.LatLng(37.51199745517824, 127.09855357200387),
			imgSrc: `${path.current}/img/contact/pin.png`,
			imgSize: new kakao.current.maps.Size(40, 40),
			imgPos: { offset: new kakao.current.maps.Point(20, 40) }
		},
		{
			title: 'OFFICE AND FACTORY',
			address: 'Via Fossa 1 31051, Follina',
			support: 'Request info or get price',
			email: 'info2@arredodalpozzo.it',
			tel: '+01 987-4134-29',
			latlng: new kakao.current.maps.LatLng(37.56250041835499, 126.98516157408622),
			imgSrc: `${path.current}/img/contact/pin.png`,
			imgSize: new kakao.current.maps.Size(40, 40),
			imgPos: { offset: new kakao.current.maps.Point(20, 40) }
		}
	]);

	markerInstance.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgPos
		)
	});

	const roadview = () => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 100, panoId => {
			new kakao.current.maps.Roadview(roadFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	};

	const setCenter = () => {
		roadview();
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	};

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		// 지도 출력
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 4
		});
		markerInstance.current.setMap(mapInstance.current);
		// 로드뷰 출력
		roadview();
		setTraffic(false);
		setRoadView(false);
		// 줌 기능 관련
		mapInstance.current.setZoomable(false);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout
			index={'06'}
			title={'Contact'}>
			<section className='email'>
				<div className='txt'>
					<h2>
						Email us,
						<br />
						We would love to
						<br />
						hear from you.
					</h2>
					<span className='arrow'>
						<RiArrowRightDownLine />
					</span>
				</div>
				<form className='touch'>
					<fieldset>
						<legend className='h'>Get in touch 등록 양식</legend>
						<table>
							<caption className='h'>Get in touch 입력 테이블</caption>
							<tbody>
								<tr>
									<th scope='row'>
										<label htmlFor='username'>Name</label>
									</th>
									<td>
										<input
											type='text'
											name='username'
											id='username'
											placeholder='Name'
										/>
										{/* <span className='err'>name</span> */}
									</td>
									<th scope='row'>
										<label
											htmlFor='lastname'
											className='lastname'>
											Last name
										</label>
									</th>
									<td>
										<input
											type='text'
											name='lastname'
											id='lastname'
											placeholder='Last name'
										/>
										{/* <span className='err two'>lastname</span> */}
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<label htmlFor='subject'>Subject</label>
									</th>
									<td colSpan='3'>
										<input
											type='text'
											name='subject'
											id='subject'
											placeholder='Questions'
										/>
										{/* <span className='err'>subject</span> */}
									</td>
								</tr>
								<tr>
									<th
										scope='row'
										valign='top'>
										<label htmlFor='message'>Message</label>
									</th>
									<td colSpan='3'>
										<textarea
											name='comments'
											id='comments'
											cols='30'
											rows='10'
											placeholder='Write comments...'></textarea>
										{/* <span className='err four'>comments</span> */}
									</td>
								</tr>
								<tr>
									<th>
										<input
											type='submit'
											value='Send'
										/>
									</th>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</form>
			</section>
			<section className='map'>
				<h1 className='tit'>Find us</h1>
				<nav className='tag'>
					<span className='txt'>See what you want:</span>
					<div className='btn-set'>
						<button
							className={Traffic ? 'on' : ''}
							onClick={() => {
								if (RoadView) return;
								setTraffic(!Traffic);
							}}
							disabled={RoadView}>
							{Traffic ? 'Traffic OFF' : 'Traffic ON'}
						</button>
						<button
							className={RoadView ? 'on' : ''}
							onClick={() => {
								setRoadView(!RoadView);
								setTraffic(false);
							}}>
							{RoadView ? 'Road View OFF' : 'Road View ON'}
						</button>
						<button
							onClick={() => {
								setCenter();
								setRoadView(false);
								setTraffic(false);
							}}>
							Reset
						</button>
					</div>
				</nav>
				<div className='wrap-box'>
					<div
						className={`map-box ${!RoadView ? 'on' : ''}`}
						ref={mapFrame}></div>
					<div
						className={`road-box ${RoadView ? 'on' : ''}`}
						ref={roadFrame}></div>
				</div>
				<div className='branch-set'>
					{mapInfo.current.map((el, idx) => {
						return (
							<div
								key={idx}
								className={`branch ${Index === idx ? 'on' : ''}`}
								onClick={() => setIndex(idx)}>
								<h3 onClick={() => setIndex(idx)}>{el.title}</h3>
								<div className='info'>
									<p className='txt'>{el.address}</p>
									<p className='txt'>{el.support}</p>
									<div className='icon tel'>
										<BsFillTelephoneFill />
										<p className='txt'>{el.tel}</p>
									</div>
									<div className='icon mail'>
										<IoIosMail />
										<p className='txt'>{el.email}</p>
									</div>
								</div>
								<span
									className='arrow'
									onClick={() => setIndex(idx)}>
									<RiArrowRightDownLine />
								</span>
							</div>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
