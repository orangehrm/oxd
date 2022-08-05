import {mount} from '@vue/test-utils';
import ProgressCircle from '@orangehrm/oxd/core/components/ProgressCircle/ProgressCircle.vue';

describe('ProgressCircle.vue', () => {
  it('renders OXD Progress Circle', () => {
    const wrapper = mount(ProgressCircle, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Check default radius', () => {
    const wrapper = mount(ProgressCircle, {
      props: {},
    });
    const items = wrapper.findAll('circle');
    expect(items[0].attributes().r).toBe('28');
    expect(items[1].attributes().r).toBe('28');
  });

  it('Check default stroke width', () => {
    const wrapper = mount(ProgressCircle, {
      props: {},
    });
    const items = wrapper.findAll('circle');
    expect(items[0].attributes('stroke-width')).toBe('12');
    expect(items[1].attributes('stroke-width')).toBe('12');
  });

  it('Check default stroke linecap', () => {
    const wrapper = mount(ProgressCircle, {
      props: {},
    });
    expect(
      wrapper
        .find('.oxd-progress-circle-ring-fill')
        .attributes('stroke-linecap'),
    ).toBe('round');
  });

  it('Check custom stroke color filled area', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        strokeFillColor: 'blue',
      },
    });

    expect(
      wrapper.find('.oxd-progress-circle-ring-fill').attributes().style,
    ).toBe('stroke: blue;');
  });

  it('Check custom stroke color empty area', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        strokeBackgroundColor: 'black',
      },
    });

    expect(
      wrapper.find('.oxd-progress-circle-ring-empty').attributes().style,
    ).toBe('stroke: black;');
  });

  it('Fill without animation', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        animation: false,
      },
    });

    expect(
      wrapper.find('.oxd-progress-circle-ring-fill').attributes().style,
    ).toBe('animation: none;');
  });

  it('Fill with square edges', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        roundCorners: false,
      },
    });

    expect(
      wrapper
        .find('.oxd-progress-circle-ring-fill')
        .attributes('stroke-linecap'),
    ).toBe('butt');
  });

  it('Fill with rotation of 180 degrees', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        rotation: 180,
      },
    });

    expect(
      wrapper.find('.oxd-progress-circle-ring-fill').attributes('style'),
    ).toBe('transform: rotate(180deg);');
  });

  it('Normalize the value for 0 when it is less than 0', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: -100,
      },
    });
    expect(wrapper.vm.normalizedValue).toEqual(0);
  });

  it('Normalize the value for 100 when it is greater than 100', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: 500,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(100);
  });

  it('Normalize the stroke width to radius when it is greater than the radius', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        radius: 100,
        strokeWidth: 120,
      },
    });
    expect(wrapper.vm.normalizedStrokeWidth).toEqual(wrapper.vm.radius);
  });

  it('No round off for floating point numbers which has 2 decimal points', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: 60.14,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(60.14);
  });

  it('No round off for floating point numbers which has less than 2 decimal points', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: 60.2,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(60.2);
  });

  it('No round off for integer numbers', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: 65,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(65);
  });

  it('Round off the value for 2 decimal poins for floating point numbers which has more than 2 decimal points', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: 60.14685114,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(60.15);
  });

  it('Round off the value for 2 decimal poins for floating point numbers which has more than 2 decimal points', () => {
    const wrapper = mount(ProgressCircle, {
      props: {
        value: undefined,
      },
    });

    expect(wrapper.vm.normalizedValue).toEqual(0);
  });
});
