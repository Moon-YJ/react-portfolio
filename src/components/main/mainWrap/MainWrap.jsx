import Vid from '../vid/Vid';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Vid />
			<Visual />
		</div>
	);
}
