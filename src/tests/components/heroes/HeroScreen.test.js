import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {mount} from 'enzyme';
import {HeroScreen} from './../../../components/heroes/HeroScreen';
import '@testing-library/jest-dom';

describe('Test on `HeroScreen`', () => {
  const historyMock = {
    push: jest.fn(),
    length: 10,
    goBack: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  })
  
  test('Deberia renderizar el componente redirect si no hay argumentos en el URL', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(component.find('Redirect').exists()).toBe(true);
  });

  test('Deberia renderizar un hero', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/hero/marvel-captain']}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.row').exists()).toBe(true);
  });

  test('Debe regresar a la pantalla anterior con push', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/hero/marvel-captain']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={{...historyMock, length: 1}} />}
        />
      </MemoryRouter>
    );

    component.find('button').prop('onClick')();
    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test('Debe regresar a la pantalla anterior con push', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/hero/marvel-captain']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    component.find('button').prop('onClick')();
    expect(historyMock.goBack).toHaveBeenCalledTimes(1);
    expect(historyMock.push).not.toHaveBeenCalled();
  });

  test('Debe llamar al redirect si el hero no existe', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/hero/jomarquez']}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(component.text().trim()).toBe('');
  });
});
