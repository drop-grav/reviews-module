import React from 'react';
import { shallow } from 'enzyme';
import ReviewlistEntry from '../client/src/components/ReviewlistEntry';

describe('ReviewlistEntry', () => {
  it('should render correctly', () => {
    const result = shallow(<ReviewlistEntry />);
    expect(result.exists());
  })
});