import {mount, shallowMount} from '@vue/test-utils';
import PopOver from '@orangehrm/oxd/core/components/PopOver/PopOver.vue';

describe('PopOver', () => {
  it('renders the pop-over component', () => {
    const wrapper = shallowMount(PopOver, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('before click the button, pop over content not appear', () => {
    const wrapper = shallowMount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />'
          }
        }
      }
    });
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();
  });

  it('after the button click pop over content should appear', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />'
          }
        }
      }
    });
    const button = wrapper.find('.popover-icon');
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeTruthy();
  });

  it('click outside/click button again to close the content', async () => {
    const wrapper = mount(PopOver, {
      slots: {
        button: '<oxd-icon-button class="popover-icon" name="funnel" />',
        default: '<div>This is PopOver Content</div>',
      },
      props: {
        show: false,
      },
      global: {
        stubs: {
          'oxd-icon-button': {
            template: '<i />'
          }
        }
      }
    });

    const button = wrapper.find('.popover-icon');

    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeTruthy();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-pop-over-button').exists()).toBeTruthy();
    expect(wrapper.find('.oxd-pop-over-content').exists()).toBeFalsy();
  });

  it('check is active on watch',async () => {
    const wrapper = shallowMount(PopOver, {});
    await wrapper.setProps({show: true });
    expect(wrapper.vm.isActive).toEqual(false);
    wrapper.vm.isActive = true;
    expect(wrapper.vm.isActive).toEqual(true);
    await wrapper.setProps({show: false });
    expect(wrapper.vm.isActive).toEqual(false);
  });

  it('check closePopOver function', async() => {
    const wrapper = shallowMount(PopOver, {});
    const clickEvent = new MouseEvent('click');
    wrapper.vm.isActive=true;
    wrapper.vm.closePopOver(clickEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isActive).toEqual(false);
    wrapper.vm.closePopOver(clickEvent);
    expect(wrapper.vm.isActive).toEqual(false);
  });
});