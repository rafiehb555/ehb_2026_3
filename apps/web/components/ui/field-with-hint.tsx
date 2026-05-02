'use client';

import { useState } from 'react';

interface Props {
  label: string;
  hint: string;
  required?: boolean;
  children: React.ReactNode;
}

/** Form field wrapper with a "Why?" tooltip hint — builds trust. */
export function FieldWithHint({ label, hint, required, children }: Props) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5">
        <label className="block text-xs font-medium text-white/70">
          {label} {required ? <span className="text-[#F05858]">*</span> : null}
        </label>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="flex h-4 w-4 items-center justify-center rounded-full border border-glass bg-nested text-[10px] text-white/50 transition hover:border-purple-light hover:text-white"
          aria-label="Why we ask this"
        >
          ?
        </button>
      </div>
      {show ? (
        <div className="mb-2 rounded-input border border-purple/30 bg-purple/10 p-2 text-[11px] text-white/80">
          💡 {hint}
        </div>
      ) : null}
      {children}
    </div>
  );
}
