<template>
  <oxd-tree-view
    :data="data"
    :open="true"
    :show-root="false"
    class="org-structure"
  >
    <template v-slot:content="{nodeData}">
      <oxd-sheet type="pastel-white" class="org-structure-card">
        <div class="org-name">
          {{ nodeData.name }}
        </div>
        <div class="org-action">
          <oxd-icon-button
            class="org-action-icon"
            @click="onDelete"
            name="trash-fill"
            role="none"
          />
          <oxd-icon-button
            class="org-action-icon"
            @click="onDelete"
            name="plus"
            role="none"
          />
        </div>
      </oxd-sheet>
    </template>
  </oxd-tree-view>
</template>

<script>
import TreeView from '@orangehrm/oxd/core/components/TreeView/TreeView';
import Sheet from '@orangehrm/oxd/core/components/Sheet/Sheet';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';

export default {
  components: {
    'oxd-tree-view': TreeView,
    'oxd-sheet': Sheet,
    'oxd-icon-button': IconButton,
  },
  data() {
    return {
      data: {
        name: 'Orange HRM',
        children: [
          {name: 'Administration', children: []},
          {
            name:
              'Engineering aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            children: [
              {name: 'Development', children: []},
              {
                name:
                  'Quality Assurance aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                children: [],
              },
              {
                name: 'TechOps',
                children: [
                  {
                    name: 'Network Ops',
                    children: [],
                  },
                  {
                    name: 'Cloud Ops',
                    children: [
                      {
                        name: 'Aws Engineer',
                        children: [],
                      },
                      {
                        name: 'Azure Engineer',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            name: 'Finance',
            children: [{name: 'Accounting', children: []}],
          },
          {
            name: 'Human Resources',
            children: [],
          },
          {
            name: 'Sales & Marketing',
            children: [
              {name: 'Sales', children: []},
              {name: 'Marketing', children: []},
            ],
          },
        ],
      },
    };
  },
  methods: {
    onDelete(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.org-structure-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.org-action {
  display: flex;
  &-icon {
    font-size: inherit;
    min-height: unset;
    min-width: unset;
    height: 25px;
    width: 25px;
    &:first-child {
      margin-right: 0.5rem;
    }
  }
}
.org-name {
  word-break: break-word;
  overflow-wrap: break-word;
  padding-right: 5px;
}
</style>

<style lang="scss">
.oxd-tree-node-content {
  width: 100%;
}
</style>
