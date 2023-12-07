import './Modal.scss';
import { AiOutlineClose } from 'react-icons/ai';

export default function Modal({ children }) {
	return (
		<aside className='Modal'>
			{children}
			<button>
				<AiOutlineClose />
			</button>
		</aside>
	);
}
