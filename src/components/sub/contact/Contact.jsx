import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { RiArrowRightDownLine } from 'react-icons/ri';

export default function Contact() {
	const mapFrame = useRef(null);
	const kakao = useRef(window.kakao);
	const mapOpt = useRef(null);

	mapOpt.current = {
		center: new kakao.current.maps.LatLng(33.450701, 126.570667),
		level: 3
	};

	const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
	const imageSize = new kakao.current.maps.Size(64, 69);
	const imageOption = { offset: new kakao.current.maps.Point(27, 69) };

	useEffect(() => {
		const map = new kakao.current.maps.Map(mapFrame.current, mapOpt.current);

		const marker = new kakao.current.maps.Marker({
			position: mapOpt.current.center,
			image: new kakao.current.maps.MarkerImage(imageSrc, imageSize, imageOption)
		});

		marker.setMap(map);
	}, []);

	return (
		<Layout
			index={'06'}
			title={'Contact'}>
			<section className='email'>
				<div className='txt'>
					<h2>
						Email us,
						<br />
						we would love to
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
				<div
					className='map-box'
					ref={mapFrame}></div>
			</section>
		</Layout>
	);
}
