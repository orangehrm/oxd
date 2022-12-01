import {shallowMount} from '@vue/test-utils';
import PieChart from '@orangehrm/oxd/core/components/Chart/PieChart.vue';

jest.mock('chart.js');

describe('Chart > PieChart.vue', () => {
  it('should renders OXD piec chart', () => {
    const wrapper = shallowMount(PieChart, {
      props: {
        data: [
          {value: 25, label: 'STEM', color: 'red'},
          {value: 50, label: 'Arts', color: 'green'},
          {value: 12.5, label: 'Law', color: 'blue'},
          {value: 12.5, label: 'Management', color: 'yellow'},
        ],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
