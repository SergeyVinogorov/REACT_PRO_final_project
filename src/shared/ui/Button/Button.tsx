import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	leftIcon?: ReactNode;
};

export const Button = ({
	variant = 'secondary',
	leftIcon,
	className,
	disabled,
	children,
	...rest
}: Props) => {
	return (
		<button
			className={classNames(
				s.button,
				s[variant],
				disabled && s.disabled,
				className
			)}
			disabled={disabled}
			{...rest}>
			{leftIcon}
			{children}
		</button>
	);
};
