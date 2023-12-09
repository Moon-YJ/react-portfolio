import Layout from '../../common/layout/Layout';
import './Community.scss';

export default function Community() {
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
						<input type='text' placeholder='Subject' />
						<textarea cols='30' rows='5' placeholder='Share your thoughts...'></textarea>
						<div className='btn-set'>
							<button className='cancel'>cancel</button>
							<button className='submit'>submit &nbsp; &nbsp;&rarr;</button>
						</div>
					</div>
					<div className='show-box'>
						<article>
							<h2>My name</h2>
							<div className='con'>
								<p>Contents</p>
								<div className='con-btm'>
									<p>date</p>
									<span className='line'></span>
									<p>time</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			</section>
		</Layout>
	);
}
