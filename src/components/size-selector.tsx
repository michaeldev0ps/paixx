import React, { useState } from 'react';

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | string;

export default function SizeSelector({
  availableSizes = ['S', 'M', 'L', 'XL', 'XXL'],
  onChange,
}: {
  availableSizes?: Size[];
  onChange?: (size: Size | null) => void;
}) {
  const [selected, setSelected] = useState<Size | null>(null);

  function handleSelect(size: Size) {
    setSelected((prev) => {
      const next = prev === size ? null : size;
      onChange?.(next);
      return next;
    });
  }

  return (
    <div className="size-selector" role="group" aria-label="Choose size">
      <div className="size-buttons">
        {availableSizes.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={selected === s}
            className={`size-button ${selected === s ? 'is-selected' : ''}`}
            onClick={() => handleSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="size-guide-link"
        onClick={() => {
          const ev = new CustomEvent('size-guide:open', { bubbles: true });
          window.dispatchEvent(ev);
        }}
      >
        Size guide
      </button>
    </div>
  );
}
