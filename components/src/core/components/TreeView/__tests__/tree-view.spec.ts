import {mount} from '@vue/test-utils';
import TreeView from '@orangehrm/oxd/core/components/TreeView/TreeView.vue';
import TreeNode from '@orangehrm/oxd/core/components/TreeView/TreeNode.vue';
import {h} from 'vue';

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
