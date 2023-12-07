import './Modal.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children, Open, setOpen }) {
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0.2 } }}
					transition={{ duration: 0.2 }}
					className='Modal'>
					<div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='pic'>
						{children}
					</div>
					<button onClick={() => setOpen(false)}>
						<AiOutlineClose />
					</button>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
