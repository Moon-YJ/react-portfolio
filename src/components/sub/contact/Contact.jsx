import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { RiArrowRightDownLine } from 'react-icons/ri';
// import { GoMail } from 'react-icons/go';
// import { BsTelephone } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { BsFillTelephoneFill } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Contact() {
	const form = useRef(null);
	const inp_username = useRef(null);
	const inp_lastname = useRef(null);
	const inp_subject = useRef(null);
	const inp_comments = useRef(null);
	const initVal = useRef({
		subject: '',
		comments: ''
	});
	const [Val, setVal] = useState(initVal.current);
	const [Errors, setErrors] = useState({});

	const resetForm = () => {
		inp_username.current.value = '';
		inp_lastname.current.value = '';
		inp_subject.current.value = '';
		inp_comments.current.value = '';
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const chkInput = val => {
		const errs = {};
		if (val.subject.length < 5) errs.subject = 'Enter 5 or more characters.';
		if (val.comments.length < 10) errs.comments = 'Enter 10 or more characters.';
		return errs;
	};

	const sendEmail = e => {
		e.preventDefault();

		if (!inp_subject.current.value.trim() || !inp_comments.current.value.trim())
			return alert('Please fill out all required fields.');

		emailjs.sendForm('service_5tlzo4v', 'template_3xu33pc', form.current, '93d00hlz3pqQunJrz').then(
			result => {
				alert("Thanks! We've received your message successfully.");
				resetForm();
			},
			error => {
				alert('Sorry, we are unable to process your request. Please try again later.');
			}
		);
	};

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
			latlng: new kakao.current.maps.LatLng(37.39277016022578, 127.11203617994478),
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

	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 100, panoId => {
			new kakao.current.maps.Roadview(roadFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const setThrottled = useThrottle(setCenter, 300);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		roadFrame.current.innerHTML = '';
		// 지도 출력
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 4
		});
		markerInstance.current.setMap(mapInstance.current);

		setTraffic(false);
		setRoadView(false);
		// 줌 기능 관련
		mapInstance.current.setZoomable(false);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		window.addEventListener('resize', setThrottled);
		return () => window.removeEventListener('resize', setThrottled);
	}, [setThrottled]);

	useEffect(() => {
		RoadView && roadFrame.current.children.length === 0 && roadview();
	}, [RoadView, roadview]);

	useEffect(() => {
		setErrors(chkInput(Val));
	}, [Val]);

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
				<form
					className='touch'
					onSubmit={sendEmail}
					ref={form}>
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
											onChange={handleChange}
											ref={inp_username}
										/>
										<span className='err'>{Errors.username && Errors.username}</span>
									</td>
									<th scope='row'>
										<label
											htmlFor='lastname'
											className='lastname'>
											Last Name
										</label>
									</th>
									<td>
										<input
											type='text'
											name='lastname'
											id='lastname'
											placeholder='Last name'
											onChange={handleChange}
											ref={inp_lastname}
										/>
										<span className='err two'>{Errors.lastname && Errors.lastname}</span>
									</td>
								</tr>
								<tr>
									<th scope='row'>
										<label htmlFor='subject'>Title</label>
									</th>
									<td colSpan='3'>
										<input
											type='text'
											name='subject'
											id='subject'
											placeholder='Questions'
											ref={inp_subject}
											onChange={handleChange}
										/>
										<span className='err'>{Errors.subject && Errors.subject}</span>
									</td>
								</tr>
								<tr>
									<th
										scope='row'
										valign='top'>
										<label htmlFor='message'>Message</label>
									</th>
									<td
										colSpan='3'
										className='txt-wrap'>
										<textarea
											name='comments'
											id='comments'
											cols='30'
											rows='10'
											placeholder='Write comments...'
											ref={inp_comments}
											onChange={handleChange}></textarea>
										<span className='err four'>{Errors.comments && Errors.comments}</span>
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
