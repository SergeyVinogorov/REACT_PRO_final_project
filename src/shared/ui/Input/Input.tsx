import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorText?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, errorText, className, ...rest }, ref) => {
    return (
      <label className={s.wrapper}>
        {label ? <span className={s.label}>{label}</span> : null}
        <input ref={ref} className={classNames(s.input, className)} {...rest} />
        {errorText ? <span className={s.error}>{errorText}</span> : null}
      </label>
    );
  }
);
Input.displayName = 'Input';
