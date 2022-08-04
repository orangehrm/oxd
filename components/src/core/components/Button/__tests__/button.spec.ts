import {mount} from '@vue/test-utils';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import {
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_INFO,
  TYPE_DANGER,
  TYPE_WARN,
  TYPE_SUCCESS,
  TYPE_GHOST,
  TYPE_GHOST_INFO,
  TYPE_GHOST_DANGER,
  TYPE_GHOST_WARN,
  TYPE_GHOST_SUCCESS,
  TYPE_LABEL,
  TYPE_LABEL_INFO,
  TYPE_LABEL_DANGER,
  TYPE_LABEL_WARN,
  TYPE_LABEL_SUCCESS,
  TYPE_TEXT,
  TYPE_TOOL,
  TYPE_GLASS,
} from '../types';

describe('Button.vue', () => {
  it('renders OXD button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, flow: 'up'},
    });
    expect(wrapper.text()).toMatch(label);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD small button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, size: SIZE_SMALL, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD large button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, size: SIZE_LARGE, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD medium button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, size: SIZE_MEDIUM, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD main button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_MAIN, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD secondary button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_SECONDARY, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD solid info button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_INFO, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD solid danger button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_DANGER, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD solid warn button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_WARN, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD solid success button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_SUCCESS, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ghost button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_GHOST, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ghost-info button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_GHOST_INFO, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ghost-danger button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_GHOST_DANGER, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ghost-warn button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_GHOST_WARN, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ghost-success button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_GHOST_SUCCESS, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD label button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_LABEL, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD label-info button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_LABEL_INFO, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD label-danger button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_LABEL_DANGER, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD label-warn button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_LABEL_WARN, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD label-success button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_LABEL_SUCCESS, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD text button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_TEXT, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD tool button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, displayType: TYPE_TOOL, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD iconName button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, iconName: 'arrow-left', flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD iconRightName button', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, iconRightName: 'arrow-right', flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD button with custom color', () => {
    const label = 'Button';
    const wrapper = mount(Button, {
      props: {label, style: {backgroundColor: 'palegreen'}, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Glass button', () => {
    const label = 'Share Photos';
    const imageSrc = '@orangehrm/oxd/assets/images/cameraglass.png';
    const wrapper = mount(Button, {
      props: {label, size: SIZE_LARGE, displayType: TYPE_GLASS, flow: 'up'},
      slots: {
        default: `<img src="${imageSrc}"/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
