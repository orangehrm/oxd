import {mount} from '@vue/test-utils';
import PopOverButton from '@orangehrm/oxd/core/components/PopOverButton/PopOverButton.vue';

const dropDownOptions = [
  {context: 'c_1', label: 'Option 1'},
  {context: 'c_2', label: 'Option 2'},
];

const dropDownOptionsWithDisabled = [
  {context: 'c_1', label: 'Option 1'},
  {context: 'c_2', label: 'Option 2'},
  {context: 'c_3', label: 'Option 3', disabled: true},
];

describe('PopOverButton', () => {
  it('before click the button, pop over drop down not appear', () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
      },
    });
    expect(wrapper.vm.dropdownOpen).toBe(false);
    expect(wrapper.find('.oxd-button-pop-over').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();
  });

  it('after the button click without options dropdown should not be appeared', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
      },
    });
    const button = wrapper.find('.oxd-button');

    expect(wrapper.find('.oxd-button-pop-over').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();

    expect(wrapper.vm.dropdownOpen).toBe(false);
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dropdownOpen).toBe(true);
    expect(wrapper.find('.oxd-button-pop-over').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();
  });

  it('after the button click with options dropdown should be appeared', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });
    const button = wrapper.find('.oxd-button');

    expect(wrapper.find('.oxd-button-pop-over').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();

    expect(wrapper.vm.dropdownOpen).toBe(false);
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dropdownOpen).toBe(true);
    expect(wrapper.find('.oxd-button-pop-over').exists()).toBeTruthy();
    expect(
      wrapper.find('.oxd-pop-over-button-drop-down').exists(),
    ).toBeTruthy();
  });

  it('after the button click on option 2, selected option should be emmitted', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const listptions = wrapper.findAll('.oxd-pop-over-button-drop-down-option');

    await listptions[1].trigger('mousedown');
    await wrapper.vm.$nextTick();
    const emitResult = wrapper.emitted('click');

    expect(emitResult).toEqual([
      ['c_2', {context: 'c_2', label: 'Option 2', _selected: false}],
    ]);
  });

  it('with disabled option', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptionsWithDisabled,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const listptions = wrapper.findAll('.oxd-pop-over-button-drop-down-option');

    expect(listptions[2].find('.--disabled').exists).toBeTruthy;
  });

  it('modal value can be set initially', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        options: dropDownOptions,
        modelValue: dropDownOptions[1],
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const popOverButtonLabel = wrapper.find('.oxd-button-label-wrapper');

    expect(wrapper.vm.modelValue).toEqual(dropDownOptions[1]);
    expect(popOverButtonLabel.text()).toContain('Option 2');
  });

  it('when no modal value and no customlabel, label should be empty', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const popOverButtonLabelBefore = wrapper.find('.oxd-button-label-wrapper');

    expect(wrapper.vm.modelValue).toEqual(undefined);
    expect(popOverButtonLabelBefore.text()).toContain('');
  });

  it('when dropdown arrow is enabled it should be appeared', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        options: dropDownOptions,
        dropdownArrow: true,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const dropdownArrow = wrapper.find('.--arrow');

    expect(dropdownArrow.exists()).toBeTruthy();
  });

  it('when dropdown arrow is disables it should not be appeared', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        options: dropDownOptions,
        dropdpwnArrow: false,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    const dropdownArrow = wrapper.find('.--arrow');

    expect(dropdownArrow.exists()).toBeFalsy();
  });

  it('passing options as slots', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
      slots: {
        option: '<span class="custom-option">Custom Option</span>',
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.custom-option').exists()).toBe(true);
    expect(wrapper.find('.custom-option').text()).toBe('Custom Option');
  });

  it('consecutively press on the button', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toBe(true);
    expect(
      wrapper.find('.oxd-pop-over-button-drop-down').exists(),
    ).toBeTruthy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toBe(false);
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();
  });

  it('press key down and up', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    await button.trigger('keydown.down');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(1);

    await button.trigger('keydown.up');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(0);
  });

  it('press key down exceeds the length', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    await button.trigger('keydown.down');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(1);

    await button.trigger('keydown.down');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(1);
  });

  it('press key up exceeds than minimum', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    await button.trigger('keydown.up');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(0);

    await button.trigger('keydown.down');
    await wrapper.vm.$nextTick();
  });

  it('blur event', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    await button.trigger('blur');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toBe(false);
    expect(wrapper.find('.oxd-pop-over-button-drop-down').exists()).toBeFalsy();
  });

  it('click out side', async () => {
    const wrapper = mount(PopOverButton, {
      attachTo: document.body,
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dropdownOpen).toBe(true);

    document.body.click();

    expect(wrapper.vm.dropdownOpen).toBe(false);
  });

  it('press key down and enter', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('keydown.enter');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(0);

    await button.trigger('keydown.down');
    await wrapper.vm.$nextTick();

    await button.trigger('keydown.enter');

    const emitResult = wrapper.emitted('click');

    expect(emitResult).toEqual([
      ['c_2', {context: 'c_2', label: 'Option 2', _selected: false}],
    ]);
  });

  it('press esc', async () => {
    const wrapper = mount(PopOverButton, {
      props: {
        customPopOverButtonLabel: 'Select Option',
        options: dropDownOptions,
      },
    });

    const button = wrapper.find('.oxd-button');
    await button.trigger('keydown.enter');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.pointer).toBe(0);

    await button.trigger('keydown', {
      key: 'Escape',
    });
    await wrapper.vm.$nextTick();
  });
});
