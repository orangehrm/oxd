import {mount} from '@vue/test-utils';
import TinyMce from '@orangehrm/oxd/core/components/TinyMce/TinyMce.vue';

describe('TinyMce > TinyMce.vue', () => {
  it('render', async () => {
    const modelValueString = '<p>hello, world!</p>';
    const wrapper = mount(TinyMce, {
      modelValue: modelValueString,
      props: {
        attachmentSize: 5000000,
        allowedFileTypes: [
          'image/gif',
          'image/jpeg',
          'image/jpg',
          'image/pjpeg',
          'image/png',
          'image/x-png',
        ],
        hasError: false,
        disabled: false,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').classes()).toContain('oxd-html-editor');
  });

  it('check the v model value', async () => {
    const modelValueString = '';
    const wrapper = mount(TinyMce, {
      modelValue: modelValueString,
      props: {
        attachmentSize: 5000000,
        allowedFileTypes: [
          'image/gif',
          'image/jpeg',
          'image/jpg',
          'image/pjpeg',
          'image/png',
          'image/x-png',
        ],
        hasError: false,
        disabled: false,
      },
    });
    await wrapper.vm.$nextTick();
    await wrapper.setValue('');
    expect(wrapper.vm.editorValue).toEqual('');
  });
});
