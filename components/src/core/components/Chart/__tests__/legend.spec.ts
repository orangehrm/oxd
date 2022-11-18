import {mount} from '@vue/test-utils';
import Legend from '@orangehrm/oxd/core/components/Chart/Legend.vue';

describe('Chart > Legend.vue', () => {
  const dataset = [
    {value: 25, label: 'STEM', color: 'red'},
    {value: 50, label: 'Arts', color: 'green'},
    {value: 12.5, label: 'Law', color: 'blue'},
    {value: 12.5, label: 'Management', color: 'yellow'},
  ];

  it('should renders OXD chart legend', () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have four key elements', () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    expect(wrapper.findAll('.oxd-chart-legend-key').length).toStrictEqual(4);
  });

  it('should emit index on click', async () => {
    const wrapper = mount(Legend, {
      props: {data: dataset},
    });
    await wrapper.findAll('.oxd-chart-legend-key + span')[3].trigger('click');
    expect(wrapper.emitted('click')).toContainEqual([3]);
  });
});
