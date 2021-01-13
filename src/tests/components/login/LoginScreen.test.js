import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {mount} from 'enzyme';
import {LoginScreen} from './../../../components/login/LoginScreen';
import {AuthContext} from './../../../auth/AuthContext';
import '@testing-library/jest-dom';
import {types} from './../../../types/types';

describe('Test on `LoginScreen`', () => {
  Storage.prototype.getItem = jest.fn();
  const dispatchMock = jest.fn();
  const historyMock = {
    replace: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  })

  const component = mount(
    <AuthContext.Provider value={{dispatch: dispatchMock}}>
      <MemoryRouter initialEntries={['/login']}>
        <Route path="/login" component={() => <LoginScreen history={historyMock} />} />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('Debe de renderizar correctamente', () => {
    expect(component).toMatchSnapshot();
  });

  test('Debe realizar el dispatch y la navegacion a la url almacenado en localstorage', () => {
    localStorage.getItem.mockReturnValue('/marvel');
    const action = {
      type: types.login,
      payload: {
        name: 'Jomarquez',
      },
    };

    component.find('button').prop('onClick')();

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(action);
    expect(historyMock.replace).toHaveBeenCalled();
    expect(historyMock.replace).toHaveBeenCalledWith('/marvel');
  });

  test('Debe realizar el dispatch y la navegacion por defecto', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Jomarquez',
      },
    };

    component.find('button').prop('onClick')();

    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalledWith(action);
    expect(historyMock.replace).toHaveBeenCalled();
    expect(historyMock.replace).toHaveBeenCalledWith('/');
  });
});
