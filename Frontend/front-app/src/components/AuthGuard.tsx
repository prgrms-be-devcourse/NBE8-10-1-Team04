"use client";

import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const isAdminPage = pathname.toLowerCase().startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

    const checkAuth = () => {
      const isAdmin = localStorage.getItem("adminLoggedIn");

      if (isAdminPage && !isLoginPage) {
        if (isAdmin === "true") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          Swal.fire({
            text: "관리자 권한이 필요한 페이지입니다.",
            icon: "warning",
            confirmButtonColor: "#f59e0b",
            confirmButtonText: "확인",
          });
          router.replace("/");
        }
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isAuthorized === null) return null; // 로딩 중 깜빡임 방지

  return <>{children}</>;
}
