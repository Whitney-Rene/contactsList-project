import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

jest.mock('react-modal', () => {
    return {
      setAppElement: () => {}, // Mock the setAppElement function
      // Other mock functions or components as needed
    };
  });
  

test ('Header renders', () => {
    const { getByText } = render(<App />);
    expect(getByText('Contacts')).toBeDefined();
});