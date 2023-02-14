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

import {h, ref} from 'vue';
import Form from '@/components/Form/Form.vue';
import Button from '@/components/Button/Button.vue';
import BuzzPostInput from '@/components/Buzz/BuzzPostInput.vue';

export default {
  title: 'Example/Buzz/PostInput',
  component: BuzzPostInput,
};

const Template = (args) => ({
  setup() {
    const {value, ...rest} = args;
    const post = ref(value ?? null);
    return {args: rest, post};
  },
  render() {
    return h(
      Form,
      {},
      {
        default: () =>
          h(
            BuzzPostInput,
            {
              ...this.args,
              modelValue: this.post,
              'onUpdate:modelValue': (value) => {
                this.post = value;
              },
            },
            {
              default: () =>
                h(Button, {
                  label: 'Post',
                  type: 'Submit',
                }),
            },
          ),
      },
    );
  },
});

export const Default = Template.bind({});
Default.args = {
  placeholder: `What's on your mind?`,
};

export const RequiredPost = Template.bind({});
RequiredPost.args = {
  value: `Lorem ipsum dolor sit amet consectetur adipisicing elit. At obcaecati aspernatur laboriosam nihil voluptate dolorum, iure quibusdam ipsam ipsa molestias sunt quaerat totam voluptatem excepturi incidunt, distinctio deserunt nemo quis?
  `,
  rules: [
    (v) => (!!v && v.trim() !== '') || 'Required',
    (v) => (v && v.length <= 500) || 'Should be less than 500 characters',
  ],
};
