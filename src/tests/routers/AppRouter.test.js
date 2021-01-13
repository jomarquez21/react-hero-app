import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {AppRouter} from './../../routers/AppRouter';
import {AuthContext} from './../../auth/AuthContext';

describe('Test on `AppRouter`', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test('Debe renderizar el login si el usuario no esta autenticado', () => {
    const component = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(component.find('h1').text().trim()).toBe('Login');
  });

  test('Debe renderizar el componente marvel si el usuario esta autenticado', () => {
    const component = mount(
      <AuthContext.Provider value={{...contextValue, user: {logged: true, name: 'jomarquez'}}}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(component.find('MarvelScreen').exists()).toBe(true);
  });
});
