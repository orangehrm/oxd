import {mount} from '@vue/test-utils';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet.vue';

describe('Sheet.vue', () => {
  it('should renders OXD Sheet', () => {
    const wrapper = mount(Sheet, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, not rounded', () => {
    const wrapper = mount(Sheet, {
      props: {rounded: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, without gutters', () => {
    const wrapper = mount(Sheet, {
      props: {gutters: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type white', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'white'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type white-shadow', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'white-shadow'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type pastel-white', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'pastel-white'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type light-gray', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'light-gray'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-lighten-2', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-lighten-2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-lighten-1', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-lighten-1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-darken-1', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-darken-1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Sheet, type gray-darken-2', () => {
    const wrapper = mount(Sheet, {
      props: {type: 'gray-darken-2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
