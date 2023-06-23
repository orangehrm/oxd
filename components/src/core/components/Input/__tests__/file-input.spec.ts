import {mount, shallowMount} from '@vue/test-utils';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput.vue';

const callFunction = jest.fn();

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
      props: {buttonLabel: 'Browse'},
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('download box is rendered', () => {
    const wrapper = mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('click on download box', async () => {
    const wrapper = mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
        downloadBoxClick: callFunction,
      },
    });

    expect(wrapper.vm.fileUpdateMode).toEqual('keep');
    expect(wrapper.find('.oxd-file-input').exists()).toBe(false);
    expect(wrapper.find('.oxd-download-box').exists()).toBe(true);
    await wrapper.find('.oxd-download-box').trigger('click');
    expect(callFunction).toHaveBeenCalled();
  });

  it('radio buttons should not appear when it is readonly mode', async () => {
    const wrapper = mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
        readonly: true,
      },
    });
    expect(wrapper.find('.oxd-download-box').exists()).toBe(true);
    expect(wrapper.find('.oxd-download-box-radio-buttons').exists()).toBe(
      false,
    );
  });

  it('radio buttons should not appear when it is disable mode', async () => {
    const wrapper = mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
        disabled: true,
      },
    });
    expect(wrapper.find('.oxd-download-box').exists()).toBe(true);
    expect(wrapper.find('.oxd-download-box-radio-buttons').exists()).toBe(
      false,
    );
  });

  it('when delete is selected from the radio button, file input is not shown', async () => {
    const wrapper = mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
      },
    });
    wrapper.vm.fileUpdateMode = 'delete';
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-file-input').exists()).toBe(false);
  });

  it('when replace is selected from the radio button, file input is shown', async () => {
    const wrapper = shallowMount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {
          name: 'sample.pdf',
          type: 'application/pdf',
          size: 101273,
        },
      },
    });
    wrapper.vm.fileUpdateMode = 'replace';
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-file-input').exists()).toBe(true);
  });
});
