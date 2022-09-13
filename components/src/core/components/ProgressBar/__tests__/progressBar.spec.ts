import {mount, shallowMount} from '@vue/test-utils';
import ProgressBar from '@orangehrm/oxd/core/components/ProgressBar/ProgressBar.vue';

describe('ProgressBar > ProgressBar.vue', () => {
  it('renders OXD linear Progress Bar', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        title: 'List to CSV',
        show: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('header title', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        title: 'List to CSV',
        show: true,
      },
    });
    expect(wrapper.html()).toContain(
      '<h5 class="progress-modal-title">List to CSV</h5>',
    );
  });

  it('valuedProgress', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        title: 'List to CSV',
        show: true,
        progressValue: 90,
      },
    });
    expect(wrapper.html()).toContain('<span class="loader-value">90%</span>');
  });

  it('valuedProgress', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        title: 'List to CSV',
        show: true,
        progressValue: -2,
      },
    });
    expect(wrapper.html()).toContain('<span class="loader-value">0%</span>');
  });

  it('valuedProgress', () => {
    const wrapper = shallowMount(ProgressBar, {
      props: {
        title: 'List to CSV',
        show: true,
        progressValue: 106,
      },
    });
    expect(wrapper.html()).toContain('<span class="loader-value">100%</span>');
  });
});
