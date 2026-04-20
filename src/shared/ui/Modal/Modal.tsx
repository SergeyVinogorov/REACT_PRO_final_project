import { ReactNode, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

type Props = {
	isOpen: boolean;
	title?: string;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, title, onClose, children }: Props) => {
	const root = document.getElementById('modal-root');
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	// store trigger and restore focus
	useLayoutEffect(() => {
		if (!isOpen) return;

		const active = document.activeElement;
		triggerRef.current = active instanceof HTMLElement ? active : null;

		return () => {
			// restore focus
			triggerRef.current?.focus?.();
			triggerRef.current = null;
		};
	}, [isOpen]);

	// focus on close button when opened
	useEffect(() => {
		if (!isOpen) return;
		closeBtnRef.current?.focus();
	}, [isOpen]);

	// esc closes
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [isOpen, onClose]);

	if (!isOpen || !root) return null;

	return createPortal(
		<div
			className={s.overlay}
			onMouseDown={(e) => {
				// close on overlay click only
				if (e.target === e.currentTarget) onClose();
			}}
			role='presentation'>
			<div
				className={s.modal}
				role='dialog'
				aria-modal='true'
				aria-labelledby={title ? 'modal-title' : undefined}
				onMouseDown={(e) => e.stopPropagation()}>
				<div className={s.header}>
					{title ? (
						<h2 id='modal-title' className={s.title}>
							{title}
						</h2>
					) : (
						<span />
					)}

					<button
						ref={closeBtnRef}
						className={s.close}
						onClick={onClose}
						aria-label='Close modal'
						type='button'>
						✕
					</button>
				</div>

				<div className={s.body}>{children}</div>
			</div>
		</div>,
		root
	);
};
