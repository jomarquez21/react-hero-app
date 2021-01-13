import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {PrivateRoute} from './../../routers/PrivateRoute';

describe('Test on `PrivateRoute`', () => {
  Storage.prototype.setItem = jest.fn();
  const props = {
    location: {
      pathname: '/marvel'
    }
  }

  test('Debe renderizar el componente dado si esta autenticado', () => {
    const component = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated
          component={() => <span>Ready</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(component.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });

  test('No debe renderizar el componente dado si no esta autenticado', () => {
    const component = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Ready</span>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(component.find('span').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  })
});
