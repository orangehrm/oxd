import {mount} from '@vue/test-utils';
import HelpPopupIcon from '@orangehrm/oxd/core/components/Icon/HelpPopupIcon.vue';

describe('Icon > HelpPopupIcon.vue', () => {
  it('should render HelpPopupIcon', () => {
    const wrapper = mount(HelpPopupIcon, {
      props: {helpText: 'Test help'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
