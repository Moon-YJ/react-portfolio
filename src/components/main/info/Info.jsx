import { useEffect, useState } from 'react';
import { customText } from '../../../hooks/useText';
import './Info.scss';
import postData from './postDummy.json';
import { Link } from 'react-router-dom';

export default function Info() {
	const customDate = customText('combine');
	//const korTime = useRef(new Date().getTime() + 1000 * 60 * 60 * 9);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	const [Post] = useState(getLocalData);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<section className='Info scrolling'>
			<div className='tit-set'>
				<h1 className='tit'>Latest Comments</h1>
				<div className='detail'>
					<Link to='/community'>Discover</Link>
				</div>
			</div>
			<div className='show-box'>
				{Post.map((list, idx) => {
					const getDate = () => {
						const date = JSON.stringify(list.date);
						if (date) {
							const strDate = customDate(date.split('T')[0].slice(1), '.');
							const strTime = date.split('T')[1].split('Z')[0].split('.')[0];
							return { strDate, strTime };
						} else return null;
					};
					if (idx >= 3) return null;
					return (
						<article key={list + idx}>
							<h2>{list.subject}</h2>
							<p className='txt'>{list.content}</p>
							<div className='con-btm'>
								<div className='date'>
									<p>{getDate().strDate}</p>
									<span className='line'></span>
									<p>{getDate().strTime}</p>
								</div>
							</div>
							<span className='num'>{idx < 9 ? '0' + (idx + 1) : idx + 1}</span>
						</article>
					);
				})}
			</div>
		</section>
	);
}
