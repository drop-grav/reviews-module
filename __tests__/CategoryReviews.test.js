import React from 'react';
import { shallow } from 'enzyme';
import CategoryReviews from '../client/src/components/CategoryReviews';

describe('CategoryReviews', () => {
  it('should render correctly', () => {
    const result = shallow(<CategoryReviews />);
    expect(result.exists());
  })
});