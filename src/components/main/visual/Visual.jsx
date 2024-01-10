import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './Visual.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef, useState } from 'react';
import { customText } from '../../../hooks/useText';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';

export default function Visual() {
	const { data, isSuccess } = useFlickrQuery({ type: 'user', id: '195472166@N07' });
	const [Index, setIndex] = useState(0);
	const slidesNum = useRef(5);
	const swiperRef = useRef(null);
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 3000 },
		loop: true,
		slidesPerView: 1,
		loopedSlides: slidesNum.current,
		spaceBetween: 120,
		centeredSlides: true,
		allowTouchMove: false,
		breakpoints: {
			640: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		},
		onSwiper: swiper => {
			swiperRef.current = swiper;
			swiper.slideNext(300);
		},
		onSlideChange: swiper => setIndex(swiper.realIndex)
	});
	const shortenTit = customText('shorten');

	return (
		<section className='Visual scrolling'>
			<Swiper {...swiperOpt.current}>
				<p className='num'>{'0' + Index}</p>
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= slidesNum.current) return null;
						return (
							<SwiperSlide key={pic.id}>
								<div className='inner'>
									<div className='pic-box'>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												alt={pic.title}
											/>
										</div>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
												alt={pic.title}
											/>
										</div>
										{/* <div className='pic'>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt={vid.snippet.title}
											/>
										</div> */}
										{/* <div className='pic'>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt={vid.snippet.title}
											/>
										</div> */}
									</div>
									<Link
										to='/gallery'
										onMouseEnter={swiperRef.current?.autoplay.stop}
										onMouseLeave={swiperRef.current?.autoplay.start}>
										<div className='detail'>Discover</div>
									</Link>
									<div className='txt'>
										<h2>{pic.title}</h2>
										{/* <h2>{shortenTit(vid.snippet.title, 13, '')}</h2> */}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}
