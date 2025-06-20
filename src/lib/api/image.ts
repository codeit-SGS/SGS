import api from "./axios";

// 이미지 파일을 서버에 업로드하고, 업로드된 이미지의 URL을 반환하는 함수
export const uploadImageToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // 서버가 반환하는 이미지 URL을 반환
  return res.data.url;
};