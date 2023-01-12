<!--
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
-->

<template>
  <oxd-tree-view
    :data="data"
    :open="true"
    :show-root="false"
    class="org-structure"
  >
    <template #content="{nodeData}">
      <oxd-sheet type="pastel-white" class="org-structure-card">
        <div class="org-name">
          {{ nodeData.name }}
        </div>
        <div class="org-action">
          <oxd-icon-button
            class="org-action-icon"
            name="trash-fill"
            role="none"
            @click="onDelete"
          />
          <oxd-icon-button
            class="org-action-icon"
            name="plus"
            role="none"
            @click="onDelete"
          />
        </div>
      </oxd-sheet>
    </template>
  </oxd-tree-view>
</template>

<script>
import Sheet from '@/components/Sheet/Sheet.vue';
import IconButton from '@/components/Button/Icon.vue';
import TreeView from '@/components/TreeView/TreeView.vue';

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
            name: 'Engineering aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            children: [
              {name: 'Development', children: []},
              {
                name: 'Quality Assurance aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
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
