import { describe, vi, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainScreen from '../../src/components/MainScreen';

vi.mock('@tanstack/react-query');

describe('MainScreen', () => {
  it('should render correctly', async () => {
    render(<MainScreen />);
    expect(screen.findByText('imageA')).toBeDefined();
    expect(screen.findByText('imageB')).toBeDefined();
    expect(screen.findByText('mocked desc')).toBeDefined();
  });
});
