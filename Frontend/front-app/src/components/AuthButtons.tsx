"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// ✅ 중괄호 없이 가져오는지 확인하세요!
import LoginModal from "./LoginModal";

export default function AuthButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    setIsLogin(!!loggedIn);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    alert("로그아웃 되었습니다");
    setIsLogin(false);
    router.push("/");
  };

  return (
    <div className="absolute top-6 right-8 text-base">
      {isLogin ? (
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-black"
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-700 hover:text-black"
        >
          관리자 로그인
        </button>
      )}

      {/* ✅ 정상적으로 렌더링 됩니다. */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
