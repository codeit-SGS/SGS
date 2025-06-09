import CommonInput from './CommonInput';

export default function PasswordInput() {
  return (
    <CommonInput
      label="비밀번호"
      type="password"
      placeholder="영문, 숫자 포함 8자 이상"
    />
  );
}
