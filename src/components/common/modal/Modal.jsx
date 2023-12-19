import './Modal.scss';
import { IoMdClose } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.1 } }}
					transition={{ duration: 0.2 }}
					className='Modal'>
					<motion.div
						className='pic'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.7 } }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}>
						{children}
					</motion.div>
					<motion.button
						initial={{ rotate: 0, scale: 0.5 }}
						animate={{ rotate: 90, scale: 1 }}
						exit={{ rotate: 180, scale: 0.5 }}
						transition={{ duration: 0.5 }}
						onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>
						<IoMdClose />
					</motion.button>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
