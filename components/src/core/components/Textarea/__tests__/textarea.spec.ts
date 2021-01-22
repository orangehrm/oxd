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
});
