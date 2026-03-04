"use client";

import Link from 'next/link';
import { services } from '@/data/services';

interface NavigationDropdownProps {
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  currentPath?: string | null;
}

export default function NavigationDropdown({ isOpen, onEnter, onLeave, currentPath }: NavigationDropdownProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 mt-1 w-[420px] bg-[var(--surface-elevated)] backdrop-blur-xl border border-[var(--border-color)] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 animate-fade-in"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="p-2">
        {services.map((service) => {
          const isActive = currentPath === service.href;
          return (
            <Link
              key={service.id}
              href={service.href}
              prefetch={true}
              className={`block p-4 rounded-xl transition-all duration-200 group border ${
                isActive
                  ? 'bg-[rgba(177,19,15,0.1)] border-[rgba(177,19,15,0.2)]'
                  : 'border-transparent hover:bg-[rgba(177,19,15,0.05)] hover:border-[rgba(177,19,15,0.1)]'
              }`}
            >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[rgba(177,19,15,0.1)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(177,19,15,0.15)] transition-colors duration-200">
                <span className="text-xl">{service.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#B1130F]'
                    : 'text-[var(--text-primary)] group-hover:text-[#B1130F]'
                }`}>
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-snug">
                  {service.description}
                </p>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
