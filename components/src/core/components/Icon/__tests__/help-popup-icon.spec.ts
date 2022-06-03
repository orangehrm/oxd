import {mount} from '@vue/test-utils';
import HelpPopupIcon from '@orangehrm/oxd/core/components/Icon/HelpPopupIcon.vue';

describe('Icon > HelpPopupIcon.vue', () => {
  it('should render HelpPopupIcon', () => {
    const wrapper = mount(HelpPopupIcon, {
      props: {helpText: 'Test help'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render HelpPopupIcon with custom position', () => {
    const wrapper = mount(HelpPopupIcon, {
      props: {helpText: 'Test help', position: 'top_left'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
