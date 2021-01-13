import { types } from '../../types/types';
import {authReducer} from './../../auth/authReducer';

describe('Test on `authReducer`', () => {
  test('Debe retornar el estado por defecto', () => {
    const state = authReducer({}, {});

    expect(state).toEqual({});
  });

  test('Debe autenticar y guardar el nombre del usuario ', () => {
    const name = 'Jomarquez';
    const logged = true;
    const state = authReducer({}, {type: types.login, payload: {name, logged}});

    expect(state).toEqual({name, logged});
  });

  test('Debe borrar el usuario ', () => {
    const name = 'Jomarquez';
    const logged = true;
    const state = authReducer({name, logged}, {type: types.logout});

    expect(state).toEqual({logged: !logged});
  });
});
