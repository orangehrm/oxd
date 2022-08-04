import {mount} from '@vue/test-utils';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';

const DUMMY_TEXT = 'Nunito is a well balanced sans serif typeface';

describe('Text.vue', () => {
  it('renders OXD Text', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with custom color', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h1', style: {backgroundColor: 'brown'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h1 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h2 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h3 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h3'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h4 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h4'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h5 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h5'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with h6 tag', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {tag: 'h6'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with subtitle-1 type', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {type: 'subtitle-1'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with subtitle-2 type', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {type: 'subtitle-2'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with card-title type', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {type: 'card-title'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with toast-title type', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {type: 'toast-title'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Text with toast-message type', () => {
    const wrapper = mount(Text, {
      slots: {default: DUMMY_TEXT},
      props: {type: 'toast-message'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
