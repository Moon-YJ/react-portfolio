import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
//import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef, useState } from 'react';
import { customText } from '../../../hooks/useText';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const [Index, setIndex] = useState(0);
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 3000 },
		loop: true,
		slidesPerView: 1,
		spaceBetween: 120,
		centeredSlides: true,
		allowTouchMove: false,
		breakpoints: {
			640: { slidesPerView: 2 },
			1000: { slidesPerView: 3 }
		},
		onSwiper: swiper => swiper.slideNext(300),
		onSlideChange: swiper => setIndex(swiper.realIndex)
	});
	const shortenTit = customText('shorten');

	return (
		<div className='Visual'>
			<Swiper {...swiperOpt.current}>
				<p className='num'>{'0' + (Index + 1)}</p>
				{isSuccess &&
					data.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									{/* <h3 className='num'>{idx + 1}</h3> */}
									<div className='pic-box'>
										<div className='pic'>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt={vid.snippet.title}
											/>
										</div>
										<div className='pic'>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt={vid.snippet.title}
											/>
										</div>
									</div>
									<div className='txt'>
										<h2>{shortenTit(vid.snippet.title, 13, '')}</h2>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
}
