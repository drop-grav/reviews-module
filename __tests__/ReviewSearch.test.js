import React from 'react';
import { shallow } from 'enzyme';
import ReviewSearch from '../client/src/components/ReviewSearch';

describe('ReviewSearch', () => {
  it('should render correctly', () => {
    const result = shallow(<ReviewSearch />);
    expect(result.exists());
  })
});