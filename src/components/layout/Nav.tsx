"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { navLinks } from "@/content/site";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

interface NavProps {
  ctaHref?: string;
}

export function Nav({ ctaHref = "/contact" }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="dt-nav" aria-label="Main">
        <Link className="dt-logo" href="/" aria-label="Dotly, AI automation studio">
          <Image src="/logo.png" alt="" width={40} height={40} priority />
          <span className="dt-wordmark">Dotly</span>
        </Link>
        <div className="dt-nav__links">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link className="dt-btn dt-btn--primary" href={ctaHref}>
          Start a Project
        </Link>
        <button
          type="button"
          className="dt-nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mnav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </nav>
      {open && (
        <div className="dt-mnav" id="mnav">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}
          <Link className="dt-btn dt-btn--primary" href={ctaHref} onClick={close}>
            Start a Project
          </Link>
        </div>
      )}
    </>
  );
}
