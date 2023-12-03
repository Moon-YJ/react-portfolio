import { useState, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import { FaArrowRight } from 'react-icons/fa';
import './Youtube.scss';
import { customText } from '../../../hooks/useText';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const fetchYoutube = async () => {
		const api_key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
		const pId = 'PLMaY0ixOiylhwpATMD-PQjeVREn5MOfSp';
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
		<div className='Youtube'>
			<Layout index={'02'} title={'Youtube'}>
				{Vids.map((vid, idx) => {
					const [date] = vid.snippet.publishedAt.split('T');
					return (
						<article key={vid.snippet.playlistId + idx}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.maxres.url} alt='' />
							</div>
							<h2 className='tit'>{shortenTit(vid.snippet.title)}</h2>
							<div className='date'>{customDate(date, '.')}</div>
							<span>
								<FaArrowRight />
							</span>
						</article>
					);
				})}
			</Layout>
		</div>
	);
}
