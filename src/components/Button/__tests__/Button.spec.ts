import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {props: {label: 'Test'}});
    expect(wrapper.text()).toContain('Test');
  });
});
