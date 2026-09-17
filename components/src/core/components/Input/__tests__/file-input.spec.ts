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

  it('hides the presentation layer from assistive technology', () => {
    // the <input> is only visually hidden (opacity: 0), so it stays in the
    // accessibility tree carrying the label - leaving this text readable too
    // is what announced the control twice
    const wrapper = mount(FileInput, {
      props: {buttonLabel: 'Browse', placeholder: 'No file chosen'},
    });

    expect(wrapper.find('.oxd-file-button').attributes('aria-hidden')).toBe(
      'true',
    );
    expect(wrapper.find('.oxd-file-input-div').attributes('aria-hidden')).toBe(
      'true',
    );
    expect(wrapper.find('.oxd-file-input-icon').attributes('aria-hidden')).toBe(
      'true',
    );
  });

  it('leaves the input itself exposed to assistive technology', () => {
    // the failure mode of over-applying aria-hidden is a control with no
    // accessible name at all
    const wrapper = mount(FileInput, {props: {buttonLabel: 'Browse'}});
    expect(wrapper.find('input').attributes('aria-hidden')).toBeUndefined();
  });

  it('does not hide consumer slot content', () => {
    const wrapper = mount(FileInput, {
      slots: {default: '<span class="custom">Upload CV</span>'},
    });
    const wrapperDiv = wrapper.find('.oxd-file-div');

    expect(wrapper.find('.custom').exists()).toBe(true);
    expect(wrapperDiv.attributes('aria-hidden')).toBeUndefined();
    expect(wrapper.find('.oxd-file-input-div').exists()).toBe(false);
  });

  const mountWithFile = () =>
    mount(FileInput, {
      props: {
        buttonLabel: 'Browse',
        inputFile: {name: 'sample.pdf', type: 'application/pdf', size: 101273},
      },
    });

  it('gives each file input its own update-mode radio ids', () => {
    // hardcoded check1/check2/check3 collided as soon as a form rendered two
    // file inputs, which the 13th Judicial application form does
    const first = mountWithFile();
    const second = mountWithFile();

    const idsOf = (wrapper: ReturnType<typeof mountWithFile>) =>
      wrapper.findAll('input[type="radio"]').map(r => r.attributes('id'));

    const firstIds = idsOf(first);
    const secondIds = idsOf(second);

    expect(firstIds).toHaveLength(3);
    expect(firstIds.every(Boolean)).toBe(true);
    expect(new Set(firstIds).size).toBe(3);
    firstIds.forEach(id => expect(secondIds).not.toContain(id));
  });
});
