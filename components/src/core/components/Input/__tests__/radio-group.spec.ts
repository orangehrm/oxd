import {mount} from '@vue/test-utils';
import RadioGroup from '@orangehrm/oxd/core/components/Input/RadioGroup.vue';

const optionsList = [
  {
    id: 1,
    label: 'Item one',
  },
  {
    id: 2,
    label: 'Item two',
  },
];

describe('RadioGroup > RadioGroup.vue', () => {
  it('renders OXD RadioGroup', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        class: 'radio-column',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept valid input', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  });

  it('should emit the new value on click another radio button', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        modelValue: 1,
      },
    });
    wrapper.find('#radio-group-id_2').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
  });

  it('should focus the checkbox', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('focus');
    expect(wrapper.emitted('focus')).toEqual([[true]]);
  });

  it('should blur the checkbox', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });
    wrapper.find('#radio-group-id_1').trigger('blur');
    expect(wrapper.emitted('blur')).toEqual([[true]]);
  });

  it('should change the class and id', async () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
        id: 'radio-new-id',
        class: 'radio-new-class',
      },
    });

    expect(wrapper.find('.radio-new-class').exists()).toBeTruthy();
    expect(wrapper.find('#radio-new-id_1').exists()).toBeTruthy();
  });

  it('should render secondary labels for radio options', () => {
    const optionsWithSecondaryLabel = [
      {
        id: 1,
        label: 'Full Time',
        secondaryLabel: '(Permanent)',
      },
      {
        id: 2,
        label: 'Part Time',
        secondaryLabel: '(Temporary)',
      },
      {
        id: 3,
        label: 'Contract',
      },
    ];

    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsWithSecondaryLabel,
      },
    });

    // Check if secondary labels are rendered as provided
    expect(wrapper.text()).toContain('(Permanent)');
    expect(wrapper.text()).toContain('(Temporary)');

    // Check if all secondary label elements exist for options with secondaryLabel
    const secondaryLabels = wrapper.findAll(
      '.oxd-radio-option-secondary-label',
    );
    expect(secondaryLabels).toHaveLength(2);
  });

  it('should not render secondary label when not provided', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsList,
      },
    });

    const secondaryLabels = wrapper.findAll(
      '.oxd-radio-option-secondary-label',
    );
    expect(secondaryLabels).toHaveLength(0);
  });

  it('each radio field should contain correct secondary label', () => {
    const optionsWithSecondaryLabel = [
      {
        id: 1,
        label: 'Option One',
        secondaryLabel: '(Label One)',
      },
      {
        id: 2,
        label: 'Option Two',
        secondaryLabel: '{Label Two}',
      },
    ];

    const wrapper = mount(RadioGroup, {
      props: {
        options: optionsWithSecondaryLabel,
      },
    });

    const radioWrappers = wrapper.findAll('.oxd-radio-wrapper');
    expect(radioWrappers).toHaveLength(2);

    // First radio should have secondary label as provided
    expect(radioWrappers[0].text()).toContain('Option One');
    expect(radioWrappers[0].text()).toContain('(Label One)');

    // Second radio should have secondary label as provided
    expect(radioWrappers[1].text()).toContain('Option Two');
    expect(radioWrappers[1].text()).toContain('{Label Two}');
  });
});
