import {mount} from '@vue/test-utils';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

describe('Divider.vue', () => {
  it('renders OXD Divider', () => {
    const wrapper = mount(Divider, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Divider with style', () => {
    const wrapper = mount(Divider, {
      props: {style: {borderColor: 'red'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('render horizontal OXD Divider with default orientation', () => {
    const wrapper = mount(Divider, {
      props: {},
    });
    expect(wrapper.findAll('.oxd-divider-horizontal').length).toBe(1);
    expect(wrapper.findAll('.oxd-divider-vertical').length).toBe(0);
  });

  it('render vertical OXD Divider when pass through props', () => {
    const wrapper = mount(Divider, {
      props: {orientation: 'vertical'},
    });
    expect(wrapper.findAll('.oxd-divider-vertical').length).toBe(1);
    expect(wrapper.findAll('.oxd-divider-horizontal').length).toBe(0);
  });

  it('render horizontal OXD Divider when invalid prop value for orientation is passed', () => {
    const wrapper = mount(Divider, {
      props: {orientation: 'this is invalid'},
    });
    expect(wrapper.findAll('.oxd-divider-horizontal').length).toBe(1);
    expect(wrapper.findAll('.oxd-divider-vertical').length).toBe(0);
  });
});
