import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { customText } from '../../../hooks/useText';

export default function Detail() {
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);
	const fetchYoutube = async () => {
		const api_key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
		console.log(json.items[0].snippet);
	};
	const customTxt = customText('shorten');
	const customDate = customText('combine');
	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<div className='Detail'>
			{YoutubeData && (
				<article>
					<div className='info'>
						<span className='date'>{customDate(YoutubeData.publishedAt.split('T')[0], '.')}</span>
					</div>
					<h2 className='tit'>{YoutubeData.title}</h2>
					<p className='detail'>{customTxt(YoutubeData.description, 200)}</p>
					<div className='info'>
						<span>{YoutubeData.videoOwnerChannelTitle}</span>
						<span>{YoutubeData.publishedAt.split('T')[1].split('Z')[0]}</span>
					</div>
					<div className='video'>
						<iframe
							title={YoutubeData.title}
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}></iframe>
					</div>
				</article>
			)}
		</div>
	);
}
