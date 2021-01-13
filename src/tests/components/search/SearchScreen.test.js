import React from 'react';
import {MemoryRouter, Route} from 'react-router-dom';
import {mount} from 'enzyme';
import {SearchScreen} from './../../../components/search/SearchScreen';
import '@testing-library/jest-dom';
import {types} from './../../../types/types';
import { act } from 'react-dom/test-utils';

describe('Test on `SearchScreen`', () => {
  const historyMock = {
    push: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  })

  const component = mount(
    <MemoryRouter initialEntries={['/search']}>
      <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
    </MemoryRouter>
  );

  test('Debe de renderizar correctamente', () => {
    expect(component).toMatchSnapshot();
    expect(component.find('.alert-info').text()).toBe('Search a hero');
  });

  test('Debe de mostrar a batman y el input con el valor de string', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
      </MemoryRouter>
    );

    expect(component.find('input').prop('value')).toBe('batman');
    expect(component).toMatchSnapshot();
  });

  test('Debe de mostrar un error si no se encuentra el hero', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/search?q=jomarquez']}>
        <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
      </MemoryRouter>
    );

    expect(component.find('.alert-danger').text().trim()).toBe('There is no a hero with jomarquez');
  });

  test('Debe ejecutar el proceso completo', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={() => <SearchScreen history={historyMock} />} />
      </MemoryRouter>
    );

    component.find('input').simulate('change', {target: {name: 'searchText', value: 'batman'}});
    component.find('form').simulate('submit', {preventDefault(){}});

    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
