import {mount} from '@vue/test-utils';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';

describe('Textarea.vue', () => {
  it('renders OXD Textarea', () => {
    const label = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Textarea with custom color', () => {
    const label = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Textarea with error', () => {
    const label = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
