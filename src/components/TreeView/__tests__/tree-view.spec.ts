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

import {h} from 'vue';
import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import TreeView from '@/components/TreeView/TreeView.vue';
import TreeNode from '@/components/TreeView/TreeNode.vue';

const data = {
  name: 'base',
  children: [
    {name: 'root'},
    {
      name: 'usr',
      children: [
        {
          name: 'share',
          children: [{name: 'man'}, {name: 'local'}],
        },
        {name: 'bin'},
      ],
    },
    {name: 'etc'},
  ],
};

describe('TreeView.vue', () => {
  it('renders OXD Tree View', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: {
          name: 'test',
          children: [],
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders Tree View with 4 Nodes', () => {
    const wrapper = mount(TreeView, {
      props: {data, open: true},
    });
    const nodes = wrapper.findAllComponents(TreeNode);
    expect(nodes.length).toBe(4);
  });

  it('should not render root node', () => {
    const wrapper = mount(TreeView, {
      props: {data, showRoot: false, open: true},
    });
    expect(wrapper.findAll('.oxd-tree-node-wrapper').length).toBe(3);
  });

  it('should open node on click', async () => {
    const wrapper = mount(TreeView, {
      props: {data},
    });
    wrapper.find('.oxd-icon-button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.oxd-tree-node').classes()).toContain('--open');
  });

  it('should not have collapse button on non parent nodes', async () => {
    const wrapper = mount(TreeView, {
      props: {data, open: true},
    });
    const nodes = wrapper.findAllComponents(TreeNode);
    expect(
      nodes[1]
        .find('.oxd-tree-node-wrapper')
        .find('.oxd-tree-node-toggle')
        .exists(),
    ).toBeFalsy();
  });

  it('should pass slot props to template', () => {
    const wrapper = mount(TreeView, {
      props: {data},
      slots: {
        content: ({nodeData}) => {
          return h('h1', nodeData.name);
        },
      },
    });
    const rootNode = wrapper.findComponent(TreeNode);
    expect(rootNode.find('.oxd-tree-node-content > h1').text()).toContain(
      'base',
    );
  });
});
