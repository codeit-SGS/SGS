"use client";

import CommonButton from "../button/CommonButton";

// 모달 컴포넌트의 props 타입 정의
interface CancelModalProps {
  open: boolean; // 모달 오픈 여부
  onCancel: () => void; // 취소(닫기) 버튼 클릭 시 실행 함수
  onConfirm: () => void; // 삭제(확인) 버튼 클릭 시 실행 함수
  message?: string; // 안내 메시지(옵션)
}

// 취소/삭제 모달 컴포넌트
export default function CancelModal({
  open,
  onCancel,
  onConfirm,
  message = "정말 삭제하시겠습니까?",
}: CancelModalProps) {
  // open이 false면 아무것도 렌더링하지 않음
  if (!open) return null;

  // 모달 바깥 영역 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.target이 현재 div(배경)일 때만 onCancel 실행
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    // 모달 배경(어둡게 처리) 및 중앙 정렬
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={handleBackdropClick}
    >
      {/* 모달 본문 */}
      <div className="bg-white rounded-[16px] w-353 h-172 px-16 pt-32 pb-24 flex flex-col items-center justify-between shadow-subtle">
        {/* 안내 메시지 */}
        <div className="text-2lg font-bold text-gray-800 mb-40 text-center">
          {message}
        </div>
        {/* 버튼 영역 */}
        <div className="flex gap-9 w-full">
          {/* 취소 버튼 */}
          <CommonButton
            variant="profile-modal-cancel"
            className="flex-1 py-12 w-156 h-50 tablet:h-54 "
            onClick={onCancel}
          >
            취소
          </CommonButton>
          {/* 삭제하기 버튼 */}
          <CommonButton
            variant="product-modal-delete"
            className="flex-1 py-12 w-156 h-50 tablet:h-54"
            onClick={onConfirm}
          >
            삭제하기
          </CommonButton>
        </div>
      </div>
    </div>
  );
}