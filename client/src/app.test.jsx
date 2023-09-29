import { render } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import App from './App';
  

test ('Header renders', () => {
    const { getByText } = render(<App />);
    expect(getByText('Contacts')).toBeDefined();
});