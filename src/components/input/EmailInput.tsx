// src/components/input/EmailInput.tsx

import CommonInput from './CommonInput';
import { InputHTMLAttributes, forwardRef } from 'react';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIconSrc?: string;
  rightIconAlt?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ label = '이메일', error, rightIconSrc, rightIconAlt, ...props }, ref) => {
    return (
      <CommonInput
        ref={ref}
        label={label}
        type="email"
        error={error}
        rightIconSrc={rightIconSrc}
        rightIconAlt={rightIconAlt}
        placeholder="example@gmail.com"
        {...props}
      />
    );
  }
);

EmailInput.displayName = 'EmailInput';
export default EmailInput;
