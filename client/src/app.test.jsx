import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './home';
  
//I'd like ot add more tests in the future

test ('Header renders', () => {
    const { getByText } = render(<App />);
    expect(getByText('Contacts')).toBeDefined();
});