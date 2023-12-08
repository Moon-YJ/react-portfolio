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
		</Layout>
	);
}
