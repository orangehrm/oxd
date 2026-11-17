import {flushPromises, mount} from '@vue/test-utils';
import ProfilePicture from '@orangehrm/oxd/core/components/CardTable/Cell/ProfilePicture.vue';
import {defaultUser} from '@orangehrm/oxd/core/components/ProfilePic/images';
import {DEVICE_LG} from '@orangehrm/oxd/composables/useResponsive';
import {nextTick} from 'vue';

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';

const GLOBAL = {
  provide: {
    tableProps() {
      return {
        items: [],
      };
    },
    screenState() {
      return {
        screenType: DEVICE_LG,
      };
    },
  },
};

describe('CardTable > Cell > ProfilePicture.vue', () => {
  it('should renders OXD CardTable > Cell > Profile Picture Cell defaut values', () => {
    const wrapper = mount(ProfilePicture, {
      global: GLOBAL,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Profile Picture Cell with custom image', async () => {
    const wrapper = mount(ProfilePicture, {
      global: GLOBAL,
      props: {
        item: imgSrc,
        size: 'small',
        target: '_parent',
        link: 'url1',
        rowItem: {
          url1: 'https://orangehrm.com',
        },
      },
    });
    await nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('item prop', () => {
    let warnSpy: jest.SpyInstance;

    const invalidPropWarnings = () =>
      warnSpy.mock.calls.filter(args =>
        String(args[0]).includes('Invalid prop'),
      );

    const renderedImage = (wrapper: ReturnType<typeof mount>) =>
      wrapper.find('.img-tag').attributes('style');

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('accepts an image URL string without a prop warning and renders it', async () => {
      const wrapper = mount(ProfilePicture, {
        global: GLOBAL,
        props: {item: imgSrc},
      });
      await flushPromises();

      expect(invalidPropWarnings()).toEqual([]);
      expect(renderedImage(wrapper)).toBe(`background-image: url(${imgSrc});`);
    });

    it.each([
      ['missing', {}],
      ['null', {item: null}],
      ['an empty string', {item: ''}],
    ])(
      'renders the default avatar without a prop warning when item is %s',
      async (_label, props) => {
        const wrapper = mount(ProfilePicture, {global: GLOBAL, props});
        await flushPromises();

        expect(invalidPropWarnings()).toEqual([]);
        expect(renderedImage(wrapper)).toBe(
          `background-image: url(${defaultUser.value});`,
        );
      },
    );
  });
});
