"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApiFetch } from "@/lib/backend/adminClient";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ 반드시 "export default function" 이어야 합니다.
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApiFetch("/api/v1/adlogin", {
        method: "POST",
        body: JSON.stringify({ adminName, password }),
      });
      localStorage.setItem("adminLoggedIn", "true");
      alert("로그인 성공");
      onClose();
      window.location.reload(); // 상태 반영을 위한 새로고침
    } catch (err) {
      setError("로그인 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-xl font-bold mb-4">관리자 로그인</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ID"
            className="w-full border p-2 mb-2"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <input
            type="password"
            placeholder="PW"
            className="w-full border p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 py-2 rounded"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
