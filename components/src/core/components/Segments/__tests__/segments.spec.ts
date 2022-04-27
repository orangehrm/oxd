import {mount} from '@vue/test-utils';
import Segments from '@orangehrm/oxd/core/components/Segments/Segments.vue';

describe('Segments > Segments.vue', () => {
  it('renders OXD Segments', () => {
    const wrapper = mount(Segments, {
      props: {
        options: [
          {
            id: 1,
            label: 'Item one',
          },
          {
            id: 2,
            label: 'Item two',
          }
        ]
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
