import {mount} from '@vue/test-utils';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput.vue';

describe('FileInput.vue', () => {
  it('renders OXD FileInput', () => {
    const wrapper = mount(FileInput, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD FileInput with custom color', () => {
    const wrapper = mount(FileInput, {
      props: {style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD FileInput with error', () => {
    const wrapper = mount(FileInput, {
      props: {hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD FileInput with browse button', () => {
    const wrapper = mount(FileInput, {
      props: {label: 'Browse'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
