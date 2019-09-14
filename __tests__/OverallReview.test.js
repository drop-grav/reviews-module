import React from 'react';
import { shallow } from 'enzyme';
import OverallReview from '../client/src/components/OverallReview';

describe('OverallReview', () => {
  it('should render correctly', () => {
    const result = shallow(<OverallReview />);
    expect(result.exists());
  })
});