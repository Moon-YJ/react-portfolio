import { useState, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import { FaArrowRight } from 'react-icons/fa';
import './Youtube.scss';
import { customText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pId = process.env.REACT_APP_YOUTUBE_pID;
		const num = 7;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pId}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setVids(json.items);
	};
	const shortenTit = customText('shorten');
	const customDate = customText('combine');

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout index={'02'} title={'Youtube'}>
			{Vids.map((vid, idx) => {
				const [date] = vid.snippet.publishedAt.split('T');
				return (
					<article key={vid.snippet.playlistId + idx}>
						<div className='pic'>
							<Link to={`/detail/${vid.id}`}>
								<img src={vid.snippet.thumbnails.maxres.url} alt='' />
							</Link>
						</div>
						<div className='con'>
							<h2 className='tit'>
								{vid.snippet.description === '' ? vid.snippet.title : shortenTit(vid.snippet.description, 80)}
							</h2>
							<div className='date'>
								<span>DATE</span>
								<span>{customDate(date, '.')}</span>
							</div>
						</div>
						<span className='detail'>
							<Link to={`/detail/${vid.id}`}>
								<FaArrowRight />
							</Link>
						</span>
					</article>
				);
			})}
		</Layout>
	);
}
