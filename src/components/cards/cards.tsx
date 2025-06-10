import CommonInput from "./CommonInput";

export default function EmailInput() {
  return (
    <>
      <div>
        <CommonInput
          label="이메일"
          type="email"
          placeholder="example@gmail.com"
        />
      </div>
      <div>
        <CommonInput
          label="이메일"
          type="email"
          placeholder="example@gmail.com"
          rightIconSrc="/img/icon/dropdown.svg"
        />
      </div>
    </>
  );
}
