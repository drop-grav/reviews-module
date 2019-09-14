import React from 'react';
import { shallow } from 'enzyme';
import Reviewlist from '../client/src/components/Reviewlist';

describe('Reviewlist', () => {
  it('should render correctly', () => {
    const result = shallow(<Reviewlist />);
    expect(result.exists());
  })
});