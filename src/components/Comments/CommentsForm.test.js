import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentsForm from './CommentsForm';
import '@testing-library/jest-dom';
import renderWithProviders from '../../utils/renderWithProviders';

/**
 * test scenario
 *
 * - CommentsForm component
 *   - should handle comment typing correctly
 *   - should call onCreateComment function when Post Comments button is clicked
 */

const fakeAuthUser = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('CommentsForm component', () => {
  it('should handle comment typing correctly', async () => {
    // Arrange
    renderWithProviders(
      <MemoryRouter>
        <CommentsForm onCreateComment={() => {}} />
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: fakeAuthUser,
        },
      },
    );
    const commentInput = await screen.getByPlaceholderText('Comment');

    // Action
    await act(async () => userEvent.type(commentInput, 'Hello World!'));

    // Assert
    expect(commentInput).toHaveValue('Hello World!');
  });

  it('should call onCreateComment function when Post Comments button is clicked', async () => {
    // Arrange
    const mockOnCreateComment = jest.fn();
    renderWithProviders(
      <MemoryRouter>
        <CommentsForm onCreateComment={mockOnCreateComment} />
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: fakeAuthUser,
        },
      },
    );
    const commentInput = await screen.getByPlaceholderText('Comment');
    await act(async () => userEvent.type(commentInput, 'Hello World!'));
    const commentButton = await screen.getByRole('button', {
      name: 'Post Comment',
    });

    // Action
    await userEvent.click(commentButton);

    // Assert
    expect(mockOnCreateComment).toBeCalledWith({ content: 'Hello World!' });
  });
});
