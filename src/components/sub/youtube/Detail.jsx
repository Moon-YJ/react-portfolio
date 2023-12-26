import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { customText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import { BiSolidLike } from 'react-icons/bi';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const [StatisticData, setStatisticData] = useState(null);
	const api_key = useRef(process.env.REACT_APP_YOUTUBE_API);
	const vidId = useRef('');

	const fetchDetail = useCallback(async () => {
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key.current}&part=snippet&id=${id}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setYoutubeData(json.items[0].snippet);
			vidId.current = json.items[0].snippet.resourceId.videoId;
			const statisticsURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${vidId.current}&key=${api_key.current}`;
			try {
				const data = await fetch(statisticsURL);
				const json = await data.json();
				setStatisticData(json.items[0].statistics);
				console.log(json);
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			console.log(err);
		}
	}, [id]);

	const customTxt = customText('shorten');

	useEffect(() => {
		fetchDetail();
	}, [fetchDetail]);

	return (
		<Layout
			index={'00'}
			title={'Detail'}>
			{YoutubeData && (
				<article>
					<Link to='/youtube'>
						<span className='arrow'></span>
					</Link>
					<div className='top-info'>
						<div className='date'>
							<span>
								{new Date(YoutubeData.publishedAt.split('T')[0].split('-')[1]).toLocaleString('en-US', {
									month: 'short'
								})}
							</span>
							<span>{YoutubeData.publishedAt.split('T')[0].split('-')[2]}</span>
							<span>. {YoutubeData.publishedAt.split('T')[0].split('-')[0]}</span>
						</div>
						<div className='con'>
							<h2 className='tit'>{YoutubeData.title}</h2>
							<div className='info'>
								<p>{YoutubeData.videoOwnerChannelTitle}</p>
								<p>{YoutubeData.publishedAt.split('T')[1].split('Z')[0]}</p>
							</div>
						</div>
					</div>
					<div className='video'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							frameBorder={0}></iframe>
					</div>
					<div className='count-info'>
						<div className='view'>
							<IoEye />
							<span>{StatisticData?.viewCount}</span>
						</div>
						<div className='like'>
							<BiSolidLike />
							<span>{StatisticData?.likeCount}</span>
						</div>
					</div>
					<p className='txt'>
						{YoutubeData.description === '' ? YoutubeData.title : customTxt(YoutubeData.description, 450)}
					</p>
				</article>
			)}
		</Layout>
	);
}
