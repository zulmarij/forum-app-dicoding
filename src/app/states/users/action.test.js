import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncRegisterUser, registerUserActionCreator } from './action';

/**
 * test scenario
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when register success
 *  - should dispatch action and call alert correctly when register failed
 */

const fakeRegisterResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeRegisterInput = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'JohnDoe',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._registerUser = api.registerUser;
  });

  afterEach(() => {
    api.registerUser = api._registerUser;

    delete api._registerUser;
  });

  it('should dispatch action correctly when register success', async () => {
    // arrange
    // stub implementation
    api.registerUser = () => Promise.resolve(fakeRegisterResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      registerUserActionCreator(fakeRegisterResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when register failed', async () => {
    // arrange
    // stub implementation
    api.registerUser = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncRegisterUser(fakeRegisterInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
