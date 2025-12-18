import { apiFetch } from "./client"; // 기존 apiFetch 경로에 맞게 수정하세요

/**
 * 관리자 전용 API 호출 함수
 * 기존 apiFetch를 사용하되, 세션 쿠키 전송을 위한 credentials 옵션을 강제합니다.
 */
export const adminApiFetch = (url: string, options?: RequestInit) => {
  return apiFetch(url, {
    ...options,
    credentials: "include", // ✅ 세션 유지를 위해 이 옵션이 포함된 상태로 기존 apiFetch를 호출합니다.
  });
};
