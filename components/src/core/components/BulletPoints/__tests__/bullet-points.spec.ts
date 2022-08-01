import {shallowMount} from '@vue/test-utils';
import BulletPoints from '@orangehrm/oxd/core/components/BulletPoints/BulletPoints.vue';

const bulletPointsList = [
  {id: 'item1', name: 'item_1'},
  {id: 'item2', name: 'item_2'},
  {id: 'item3', name: 'item_3', styles: {backgroundColor: 'green'}},
];

describe('BulletPoints', () => {
  it('renders the bullet points component', () => {
    const wrapper = shallowMount(BulletPoints, {
      props: {
        list: bulletPointsList,
      },
      slots: {
        item1: '<div> Item 1</div>',
        item2: '<div> Item 2</div>',
        item3: '<div> Item 3</div>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders a list with 3 bullet points', () => {
    const wrapper = shallowMount(BulletPoints, {
      props: {
        list: bulletPointsList,
      },
      slots: {
        item1: '<div> Item 1</div>',
        item2: '<div> Item 2</div>',
        item3: '<div> Item 3</div>',
      },
    });
    const items = wrapper.findAll('li');
    expect(items.length).toBe(3);
  });

  it('check custom color in the last bullet point', () => {
    const wrapper = shallowMount(BulletPoints, {
      props: {
        list: bulletPointsList,
      },
      slots: {
        item1: '<div> Item 1</div>',
        item2: '<div> Item 2</div>',
        item3: '<div> Item 3</div>',
      },
    });
    const items = wrapper.findAll('.oxd-bullet-point');
    expect(items[2].attributes().style).toBe('background-color: green;');
  });

  const singleBulletPoint = [{id: 'item1', name: 'item_1'}];

  it('check the vertical line style for a single bullet point', () => {
    const wrapper = shallowMount(BulletPoints, {
      props: {
        list: singleBulletPoint,
      },
      slots: {
        item1: '<div> Item 1</div>',
      },
    });
    expect(
      wrapper.find('.oxd-bullet-point-vertical-line').attributes().style,
    ).toBe('display: none;');
  });
});
