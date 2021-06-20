import React from 'react';
import {shallow} from 'enzyme';
import {Spinner} from '../../components/spinner/Spinner';

describe('Spinner', () => {
  it('should render initial layout', function() {
    const component = shallow(<Spinner/>);
    expect(component).toMatchSnapshot();
  });
});
