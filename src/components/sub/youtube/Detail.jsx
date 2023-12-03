import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	return (
		<div className='Detail'>
			<p>{id}</p>
		</div>
	);
}
