"use client";

import CommonButton from "../button/CommonButton";

interface CancleModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    message?: string;
    }

export default function CancleModal({
    open,
    onCancel,
    onConfirm,
    message = "정말 삭제하시겠습니까?",
    }: CancleModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-[16px] w-353 h-172 px-16 pt-32 pb-24 flex flex-col items-center justify-between shadow-subtle">
            <div className="text-2lg font-bold text-gray-800 mb-40 text-center">
            {message}
        </div>
        <div className="flex gap-9 w-full">
            <CommonButton
                variant="profile-modal-cancel"
                className="flex-1 py-12 w-156 h-50 tablet:h-54 "
                onClick={onCancel}
            >
            취소
            </CommonButton>
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