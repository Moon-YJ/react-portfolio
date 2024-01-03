import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
//import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react';
import { customText } from '../../../hooks/useText';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 3000 },
		loop: true,
		slidesPerView: 3,
		spaceBetween: 120,
		centeredSlides: true,
		allowTouchMove: false,
		onSwiper: swiper => swiper.slideNext(300)
	});
	const shortenTit = customText('shorten');

	return (
		<div className='Visual'>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
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
