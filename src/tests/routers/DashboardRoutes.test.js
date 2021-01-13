import React from 'react';
import {mount} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {DashboardRoutes} from './../../routers/DashboardRoutes';
import {AuthContext} from './../../auth/AuthContext';

describe('Test on `DashboardRoutes`', () => {
  const name = 'Jomarquez';
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name,
      logged: true,
    },
  };

  test('Debe renderizar correctamente', () => {
    const component = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.text-info').text().trim()).toBe(name);
  });
});
