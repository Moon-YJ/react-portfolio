import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react';

export default function Visual() {
	const { data, isSuccess } = useYoutubeQuery();
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 3000, disableOnInteraction: true },
		loop: true,
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		allowTouchMove: false,
		onSwiper: swiper => swiper.slideNext(300)
	});

	return (
		<div className='Visual'>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='innder'>
									<div className='pic'>
										<Link to={`/detail/${vid.id}`}>
											<img
												src={vid.snippet.thumbnails.standard.url}
												alt=''
											/>
										</Link>
									</div>
									<div className='txt'>
										<h2>{vid.snippet.title}</h2>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
}
