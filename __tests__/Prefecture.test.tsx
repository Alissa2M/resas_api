import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Prefecture from '../src/components/Prefecture';
import '@testing-library/jest-dom';

test('都道府県名が表示される', () => {
  const prefectureProps = {
    label: '北海道',
    value: '1',
    checked: false,
    onChange: jest.fn(),
  };

  const { container } = render(<Prefecture {...prefectureProps} />);

  expect(container.textContent).toBe('北海道');
});

test('チェックボックスをクリックするとチェックされる', () => {
  const prefectureProps = {
    label: '北海道',
    value: '1',
    checked: false,
    onChange: jest.fn(),
  };

  const { getByLabelText } = render(<Prefecture {...prefectureProps} />);

  const checkbox = getByLabelText('checkbox');

  fireEvent.click(checkbox);
  expect(prefectureProps.onChange).toHaveBeenCalledWith('1', true);
});
