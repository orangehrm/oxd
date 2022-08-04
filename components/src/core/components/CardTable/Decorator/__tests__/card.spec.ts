import {mount} from '@vue/test-utils';
import DefaultCardContainer from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardContainer.vue';
import DefaultCardMobile from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardMobile.vue';
import DefaultCardWeb from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardWeb.vue';
import {DEVICE_LG, DEVICE_MD} from '@orangehrm/oxd/composables/useResponsive';

describe('CardTable > Decorator > DefaultCardContainer.vue', () => {
  it('should renders DefaultCardWeb on screen LG, XL', async () => {
    const wrapper = mount(DefaultCardContainer, {
      global: {
        provide: {
          tableProps: {
            items: [],
          },
          screenState: {
            screenType: DEVICE_LG,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DefaultCardWeb).exists()).toBeTruthy();
  });

  it('should renders DefaultCardMobile on screen XS, SM, MD', async () => {
    const wrapper = mount(DefaultCardContainer, {
      global: {
        provide: {
          tableProps: {
            items: [],
          },
          screenState: {
            screenType: DEVICE_MD,
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(DefaultCardMobile).exists()).toBeTruthy();
  });
});
