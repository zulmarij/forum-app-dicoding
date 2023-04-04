import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadForm from './ThreadForm';
import '@testing-library/jest-dom';

/**
 * test scenario
 *
 * - ThreadForm component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call onCreateThread function when Add Thread button is clicked
 */

describe('ThreadForm component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
    const titleInput = await screen.getByPlaceholderText('Title');

    // Action
    await act(async () => userEvent.type(titleInput, 'test title'));

    // Assert
    expect(titleInput).toHaveValue('test title');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
    const categoryInput = await screen.getByPlaceholderText('Category');

    // Action
    await act(async () => userEvent.type(categoryInput, 'test category'));

    // Assert
    expect(categoryInput).toHaveValue('test category');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadForm onCreateThread={() => {}} />));
    const bodyInput = await screen.getByPlaceholderText('Body');

    // Action
    await act(async () => userEvent.type(bodyInput, 'test body'));

    // Assert
    expect(bodyInput).toHaveValue('test body');
  });

  it('should call onCreateThread function when Add Thread button is clicked', async () => {
    // Arrange
    const mockOnCreateThread = jest.fn();
    await act(async () => render(<ThreadForm onCreateThread={mockOnCreateThread} />));
    const titleInput = await screen.getByPlaceholderText('Title');
    await act(async () => userEvent.type(titleInput, 'test title'));
    const categoryInput = await screen.getByPlaceholderText('Category');
    await act(async () => userEvent.type(categoryInput, 'test category'));
    const bodyInput = await screen.getByPlaceholderText('Body');
    await act(async () => userEvent.type(bodyInput, 'test body'));
    const addThreadButton = await screen.getByRole('button', {
      name: 'Add Thread',
    });

    // Action
    await userEvent.click(addThreadButton);

    // Assert
    expect(mockOnCreateThread).toBeCalledWith({
      title: 'test title',
      category: 'test category',
      body: 'test body',
    });
  });
});
