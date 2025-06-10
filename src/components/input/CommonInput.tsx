import { InputHTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';

// input 컴포넌트에 사용할 props 타입 정의
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIconSrc?: string; // 추가된 prop
  rightIconAlt?: string;
}

// forwardRef를 사용해 부모가 ref로 input DOM에 접근 가능하게 함
const CommonInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = '',
      rightIconSrc,
      rightIconAlt = 'icon',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {/* label이 있으면 위에 표시 */}
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        {/* input과 아이콘을 감싸는 컨테이너, 상대 위치 지정 */}
        <div className="relative w-[400px] h-12">
          <input
            ref={ref}
            className={`w-full h-full
              rounded-[16px] border border-gray-300 py-[14px] px-5 pr-5 box-border outline-none bg-white
              ${error ? 'border-red-500' : 'border-gray-300'} 
              ${className}`}
            {...props}
          />

          {/* rightIconSrc가 있으면 input 오른쪽에 아이콘 표시 */}
          {rightIconSrc && (
            <Image
              src={rightIconSrc}
              alt={rightIconAlt}
              width={16}
              height={16}
              className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          )}
        </div>

        {/* error가 있으면 아래에 빨간색 에러 메시지 표시 */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

CommonInput.displayName = 'Input';

export default CommonInput;
