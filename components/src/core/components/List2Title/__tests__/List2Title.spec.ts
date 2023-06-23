import {mount} from '@vue/test-utils';
import ListTitle from '@orangehrm/oxd/core/components/List2Title/List2Title.vue';

describe('List2 > ListTitle.vue', () => {
  it('renders List Title', () => {
    const wrapper = mount(ListTitle, {
      props: {
        title: 'Test Title',
        mainButtonLabel: 'Add User',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('emits button click event', async () => {
    const wrapper = mount(ListTitle, {});
    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('clickMainButton')).toBeTruthy();
  });
});
