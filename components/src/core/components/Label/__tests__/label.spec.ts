import {mount} from '@vue/test-utils';
import Label from '@orangehrm/oxd/core/components/Label/Label.vue';

describe('Label.vue', () => {
  it('renders OXD Label', () => {
    const wrapper = mount(Label, {
      props: {label: 'Label'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Label with custom color', () => {
    const wrapper = mount(Label, {
      props: {label: 'Label', style: {color: 'red'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
