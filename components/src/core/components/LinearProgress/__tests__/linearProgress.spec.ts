import {mount} from '@vue/test-utils';
import LinearProgress from '@orangehrm/oxd/core/components/LinearProgress/LinearProgress.vue';

describe('LinearProgress.vue', () => {
  it('renders OXD LinearProgress with default values', () => {
    const wrapper = mount(LinearProgress);
    expect(wrapper.find('.oxd-linear-progress-outer').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-linear-progress-inner').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-linear-progress-value').exists()).toBeFalsy();
    expect(
      wrapper.find('.oxd-linear-progress-inner').attributes('style'),
    ).toContain('--progress-value: 0%');
  });

  it('renders OXD LinearProgress with custom value', () => {
    const wrapper = mount(LinearProgress, {
      props: {progressValue: '60'},
    });
    expect(
      wrapper.find('.oxd-linear-progress-inner').attributes('style'),
    ).toContain('--progress-value: 60%');
  });

  it('show progress value as a percentage', () => {
    const wrapper = mount(LinearProgress, {
      props: {progressValue: 60, showPercentageValue: true},
    });
    expect(wrapper.find('.oxd-linear-progress-value').exists()).toBeTruthy();
  });

  it('renders oxd progress bar with custom styles', () => {
    const wrapper = mount(LinearProgress, {
      props: {
        progressValue: 55,
        showPercentageValue: true,
        progressBarHeight: '20px',
        progressBarFillColor: '#17a954',
        progressBarBackgroundColor: '#ff7b1d',
        progressPercentageValueStyles: {
          'font-size': '15px',
          color: '#eb0910',
        },
      },
    });
    expect(
      wrapper.find('.oxd-linear-progress-inner').attributes('style'),
    ).toContain('--progress-value: 55%');
    expect(
      wrapper.find('.oxd-linear-progress-outer').attributes('style'),
    ).toContain('background-color: rgb(255, 123, 29)');
    expect(
      wrapper.find('.oxd-linear-progress-outer').attributes('style'),
    ).toContain('height: 20px');
    expect(
      wrapper.find('.oxd-linear-progress-inner').attributes('style'),
    ).toContain('height: 20px');
    expect(
      wrapper.find('.oxd-linear-progress-inner').attributes('style'),
    ).toContain('background-color: rgb(23, 169, 84)');
    expect(
      wrapper.find('.oxd-linear-progress-value').attributes('style'),
    ).toContain('font-size: 15px');
    expect(
      wrapper.find('.oxd-linear-progress-value').attributes('style'),
    ).toContain('color: rgb(235, 9, 16)');
    expect(wrapper.find('.oxd-linear-progress-value').text()).toStrictEqual(
      '55%',
    );
  });

  it('when the percentage value is empty', () => {
    const wrapper = mount(LinearProgress, {
      props: {progressValue: '', showPercentageValue: true},
    });
    expect(wrapper.find('.oxd-linear-progress-value').text()).toStrictEqual(
      '0%',
    );
  });

  it('when the percentage value is greater than 100', () => {
    const wrapper = mount(LinearProgress, {
      props: {progressValue: 105, showPercentageValue: true},
    });
    expect(wrapper.find('.oxd-linear-progress-value').text()).toStrictEqual(
      '100%',
    );
  });
  it('when the percentage value is less than 0', () => {
    const wrapper = mount(LinearProgress, {
      props: {progressValue: -10, showPercentageValue: true},
    });
    expect(wrapper.find('.oxd-linear-progress-value').text()).toStrictEqual(
      '0%',
    );
  });
});
