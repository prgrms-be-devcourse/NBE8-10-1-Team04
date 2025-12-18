"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  /** true면 하위 경로도 active 처리 (/admin/products/* 등) */
  matchPrefix?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "주문(메인)" },
  { href: "/orders", label: "내 주문조회", matchPrefix: true },
  { href: "/admin/products", label: "상품관리", matchPrefix: true },
  { href: "/admin/orders", label: "주문관리", matchPrefix: true },
];

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/"; // 홈은 정확히 일치
    if (item.matchPrefix) return pathname === item.href || pathname.startsWith(item.href + "/");
    return pathname === item.href;
  };

  return (
    <nav className="mt-5 flex justify-center">
      <div className="flex flex-wrap items-center gap-2 rounded-full bg-white/70 p-2 shadow-sm backdrop-blur">
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item)} />
        ))}

        <div className="mx-2 hidden h-6 w-px bg-gray-300 sm:block" />

        {NAV_ITEMS.slice(2).map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item)} />
        ))}
      </div>
    </nav>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={[
        "px-4 py-2 rounded-full text-sm font-semibold transition",
        active
          ? "bg-gray-900 text-white"
          : "text-gray-800 hover:bg-gray-900 hover:text-white",
      ].join(" ")}
    >
      {item.label}
    </Link>
  );
}