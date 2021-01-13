import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';

/**
 * The initial `enzyme` configuration is created by adding the version of react used.
 */
configure({adapter: new Adapter()});
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
