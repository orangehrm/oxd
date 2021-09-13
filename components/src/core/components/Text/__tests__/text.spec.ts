/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */

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
