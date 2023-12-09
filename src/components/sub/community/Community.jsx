import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';

export default function Community() {
	const getData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [Post, setPost] = useState(getData());

	const refInput = useRef(null);
	const refText = useRef(null);
	//const korTime = new Date().getTime() * 1000 * 60 * 60 * 9;

	const resetPost = () => {
		if (!refInput.current.value.trim() || !refText.current.value.trim()) return;
		refInput.current.value = '';
		refText.current.value = '';
	};

	const submitPost = () => {
		(!refInput.current.value.trim() || !refText.current.value.trim()) && alert('Please write both subject and content');
		setPost([{ subject: refInput.current.value, content: refText.current.value, date: new Date().getDate() }, ...Post]);
		resetPost();
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout index={'04'} title={'Community'}>
			<section className='txt-area'>
				<figure>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</figure>
				<div className='txt'>
					<span className='stit'>WHAT WE DO</span>
					<span className='con'>
						We believe that we can live in a world where <span className='border-txt'>every product</span> or service
						has a good quality like us.
					</span>
				</div>
			</section>
			<section className='comment'>
				<h1 className='tit'>Feedback</h1>
				<div className='wrap-box'>
					<div className='input-box'>
						<input ref={refInput} type='text' placeholder='Subject' />
						<textarea ref={refText} cols='30' rows='5' placeholder='Share your thoughts...'></textarea>
						<div className='btn-set'>
							<button className='cancel' onClick={resetPost}>
								cancel
							</button>
							<button className='submit' onClick={submitPost}>
								submit &nbsp; &nbsp;&rarr;
							</button>
						</div>
					</div>
					<div className='show-box'>
						{Post &&
							Post.map((list, idx) => {
								return (
									<article key={list + idx}>
										<span className='num'>{idx < 10 ? '0' + (idx + 1) : idx + 1}</span>
										<h2>{list.subject}</h2>
										<div className='con'>
											<p>{list.content}</p>
											<div className='con-btm'>
												<p>{list.date}</p>
												<span className='line'></span>
												<p>{list.time}</p>
											</div>
										</div>
									</article>
								);
							})}
					</div>
				</div>
			</section>
		</Layout>
	);
}
