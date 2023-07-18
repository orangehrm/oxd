import {mount} from '@vue/test-utils';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import StatusTabPanel from '@orangehrm/oxd/core/components/List2Sidepanel/StatusTabPanel.vue';

const filterStub = [
  {
    count: '10',
    selected: false,
    name: 'In Progress',
    color: 'grey',
    backgroundColor: '#fff',
  },
  {
    count: '7',
    selected: true,
    name: 'Shortlisted',
    color: '#f6f5fb',
    backgroundColor: '#eb0910',
  },
];

describe('List2 > Sidepanel > StatusTabPanel.vue', () => {
  it('renders StatusTabPanel', () => {
    const wrapper = mount(StatusTabPanel, {
      props: {
        skeleton: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders StatusTabPanel with filters', () => {
    const wrapper = mount(StatusTabPanel, {
      props: {
        filters: [...filterStub],
      },
    });
    expect(
      wrapper.findAll('.oxd-status-tab-panel-filter').length,
    ).toStrictEqual(2);
    expect(
      wrapper.findAll('.oxd-status-tab-panel-filter-name').map(el => el.text()),
    ).toStrictEqual(['In Progress', 'Shortlisted']);
    expect(
      wrapper
        .findAll('.oxd-status-tab-panel-filter-count')
        .map(el => el.text()),
    ).toStrictEqual(['10', '7']);
  });
  it('emits click event on click main button', async () => {
    const wrapper = mount(StatusTabPanel, {
      props: {
        filters: [...filterStub],
      },
    });
    wrapper.findComponent(Button).trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('clickMainButton')).toBeTruthy();
  });
  it('emits filter event on click filter element', async () => {
    const wrapper = mount(StatusTabPanel, {
      props: {
        filters: [...filterStub],
      },
    });
    wrapper.findAll('li')[0].trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('filter')).toStrictEqual([
      filterStub.filter((_, i) => i === 0),
    ]);
  });
});
