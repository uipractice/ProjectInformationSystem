import React from 'react';
import FeedBackModal from '../../src/components/utils/FeedBackModal';
import { shallow } from 'enzyme';
describe('App', () => {
  it('should ender compoent', () => {
    const props ={
      feedbackText: 'teest'
    }
    const wrapper = shallow(
      <FeedBackModal {...props}/>
    );
    expect(wrapper.find('div')).toMatchSnapshot(); 
    expect(wrapper.find('.feedback-modal')).toHaveLength(1)
  });
});