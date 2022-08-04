import TreeView from '@orangehrm/oxd/core/components/TreeView/TreeView.vue';
import CustomTemplate from './CustomTemplate.vue';

export default {
  title: 'Data Tables/TreeView',
  component: TreeView,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-tree-view': TreeView},
  template: `<oxd-tree-view v-bind="args"></oxd-tree-view>`,
});

const argTypes = {
  data: {control: {type: 'object'}},
};

export const Default = Template.bind({});
Default.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
};
Default.argTypes = argTypes;

export const withoutAnimation = Template.bind({});
withoutAnimation.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
  animation: '',
};
withoutAnimation.argTypes = argTypes;

export const openNodes = Template.bind({});
openNodes.args = {
  data: {
    name: '/',
    children: [
      {name: 'root'},
      {name: 'bin'},
      {name: 'opt'},
      {
        name: 'usr',
        children: [
          {
            name: 'share',
            children: [{name: 'man'}, {name: 'local'}],
          },
          {name: 'bin'},
          {name: 'sbin'},
          {
            name: 'local',
            children: [{name: 'etc'}, {name: 'bin'}],
          },
        ],
      },
      {name: 'etc'},
    ],
  },
  open: true,
};
openNodes.argTypes = argTypes;

export const CustomTreeview = () => CustomTemplate;
