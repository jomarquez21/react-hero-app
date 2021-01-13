import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import {Navbar} from './../../../components/ui/Navbar';
import {AuthContext} from './../../../auth/AuthContext';
import { types } from './../../../types/types';
import '@testing-library/jest-dom';

describe('Test on `Navbar`', () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    replace: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
  };
  
  const name = 'Jomarquez';
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name,
      logged: true,
    },
  };

  const component = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('Debe renderizar correctamente', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('.text-info').text().trim()).toBe(name);
  });

  test('Debe de ejecutar `logout` y `history`', () => {
    component.find('button').prop('onClick')();

    expect(contextValue.dispatch).toHaveBeenCalledWith({type: types.logout});
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });
});
