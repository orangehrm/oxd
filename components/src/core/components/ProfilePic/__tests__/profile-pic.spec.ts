import {mount} from '@vue/test-utils';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import {SIZE_SMALL} from '@orangehrm/oxd/core/components/ProfilePic/types';

describe('ProfilePic.vue', () => {
  it('renders OXD ProfilePic with image', () => {
    const wrapper = mount(ProfilePic, {
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD ProfilePic with small image', () => {
    const wrapper = mount(ProfilePic, {
      props: {
        displayType: SIZE_SMALL,
      },
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should trigger handleLinkClick on link click', async () => {
    const mockOnClick = jest.fn();
    const rowItem = {
      id: 1,
      name: 'John Doe',
    };

    const wrapper = mount(ProfilePic, {
      props: {
        link: 'https://orangehrm.com',
        rowItem: rowItem,
        header: {
          cellConfig: {
            onClick: mockOnClick,
          },
        },
      },
    });

    const link = wrapper.find('a');
    await link.trigger('click');

    expect(mockOnClick).toHaveBeenCalledWith(rowItem, expect.any(MouseEvent));
  });

  it('should not prevent default behavior if no onClick handler is present', async () => {
    const wrapper = mount(ProfilePic, {
      props: {
        link: 'https://orangehrm.com',
      },
    });

    const link = wrapper.find('a');
    const event = { preventDefault: jest.fn() };

    await link.trigger('click', event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

});
