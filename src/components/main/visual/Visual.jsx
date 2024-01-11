import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import './Visual.scss';
import { useRef, useState } from 'react';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';
import Modal from '../../common/modal/Modal';
import { useCommonData } from '../../../hooks/useCommonData';

export default function Visual() {
	const { data, isSuccess } = useFlickrQuery({ type: 'user', id: '195472166@N07' });
	const { setOpen } = useCommonData();
	const [Index, setIndex] = useState(0);
	const [PicIndex, setPicIndex] = useState(0);
	const slidesNum = useRef(5);
	const swiperRef = useRef(null);
	const swiperOpt = useRef({
		modules: [Pagination, Autoplay],
		pagination: { clickable: true },
		autoplay: { delay: 3000 },
		loop: true,
		slidesPerView: 1,
		initialSlide: 1,
		loopedSlides: slidesNum.current,
		spaceBetween: 120,
		centeredSlides: true,
		allowTouchMove: false,
		breakpoints: {
			640: { slidesPerView: 3 }
		},
		onSwiper: swiper => (swiperRef.current = swiper),
		onSlideChange: swiper => setIndex(swiper.realIndex)
	});

	const handleModal = idx => {
		setOpen(true);
		setPicIndex(idx);
	};

	return (
		<>
			<section className='Visual scrolling'>
				<Swiper {...swiperOpt.current}>
					<p className='num'>{'0' + (Index + 1)}</p>
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
										</div>
										<div
											className='detail'
											onMouseEnter={swiperRef.current?.autoplay.stop}
											onMouseLeave={swiperRef.current?.autoplay.start}
											onClick={() => handleModal(idx)}>
											Discover
										</div>
										<div className='txt'>
											<h2>{pic.title}</h2>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</section>
			<Modal>
				{isSuccess && data.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${data[PicIndex].server}/${data[PicIndex].id}_${data[PicIndex].secret}_b.jpg`}
						alt={data[PicIndex].id}
					/>
				)}
			</Modal>
		</>
	);
}
