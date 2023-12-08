import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef } from 'react';

export default function Community() {
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<Layout index={'04'} title={'Community'}>
			<img src={`${path.current}/img/community/pic-con1.png`} alt='led lamp' />
		</Layout>
	);
}
