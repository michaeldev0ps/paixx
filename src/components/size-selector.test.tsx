import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SizeSelector from './size-selector';

describe('SizeSelector', () => {
  it('renders provided sizes and toggles selection', () => {
    const sizes = ['S', 'M', 'L'];
    const onChange = vi.fn();
    render(<SizeSelector availableSizes={sizes} onChange={onChange} />);

    const btnM = screen.getByRole('button', { name: 'M' });
    expect(btnM).toBeTruthy();
    expect(btnM.getAttribute('aria-pressed')).toBe('false');

    // select M
    fireEvent.click(btnM);
    expect(onChange).toHaveBeenLastCalledWith('M');
    expect(btnM.getAttribute('aria-pressed')).toBe('true');

    // clicking again deselects
    fireEvent.click(btnM);
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(btnM.getAttribute('aria-pressed')).toBe('false');
  });
});
