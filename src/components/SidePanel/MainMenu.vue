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
  <!-- GD -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button label="Global Dashboard" :display-type="''" />
    </div>
  </div>
  <div class="oxd-main-menu-divider"></div>
  <!-- Accounting -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Accounting"
        :display-type="''"
        :icon-right-name="!acToggle ? 'chevron-right' : 'chevron-down'"
        @click="acToggle = !acToggle"
      />
    </div>
  </div>
  <!--Accounting  Nav Items  -->
  <ul v-if="acToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in accountingData"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Document Manager -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button label="Document Manager" :display-type="''" />
    </div>
  </div>
  <div class="oxd-main-menu-divider"></div>

  <!-- Equipment Tracking -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Equipment Tracking"
        :display-type="''"
        :icon-right-name="!eqToggle ? 'chevron-right' : 'chevron-down'"
        @click="eqToggle = !eqToggle"
      />
    </div>
  </div>
  <!--Equipment Tracking  Nav Items  -->
  <ul v-if="eqToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in equpTracData"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- HRM -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="HR Management"
        class="active-btn"
        :icon-right-name="!hrmToggle ? 'chevron-right' : 'chevron-down'"
        @click="hrmToggle = !hrmToggle"
      />
    </div>
  </div>
  <!-- Search -->
  <!--HRM  Nav Items  -->
  <ul v-if="hrmToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in filteredMenuItems"
      :key="`oxd-main-menu-${index}`"
      :url="menuItem.url"
      :active="menuItem.active"
      :collapsed="toggle"
      :name="menuItem.name"
      :icon="menuItem.icon"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Inventory Tracking -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Inventory Tracking"
        :display-type="''"
        :icon-right-name="!itToggle ? 'chevron-right' : 'chevron-down'"
        @click="itToggle = !itToggle"
      />
    </div>
  </div>
  <!-- Search -->
  <!--Inventory Tracking  Nav Items  -->
  <ul v-if="itToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in itMenuItems"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Job Tracking -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Job Tracking"
        :display-type="''"
        :icon-right-name="!jtToggle ? 'chevron-right' : 'chevron-down'"
        @click="jtToggle = !jtToggle"
      />
    </div>
  </div>
  <!-- Search -->
  <!--Job Tracking  Nav Items  -->
  <ul v-if="jtToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in jtMenuItems"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Billing and Invoicing -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Billing and Invoicing"
        :display-type="''"
        :icon-right-name="!biToggle ? 'chevron-right' : 'chevron-down'"
        @click="biToggle = !biToggle"
      />
    </div>
  </div>
  <!-- Search -->
  <!--Billing and Invoicing  Nav Items  -->
  <ul v-if="biToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in biMenuItems"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Payroll -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button
        label="Payroll"
        :display-type="''"
        :icon-right-name="!prToggle ? 'chevron-right' : 'chevron-down'"
        @click="prToggle = !prToggle"
      />
    </div>
  </div>
  <!-- Search -->
  <!--Payroll  Nav Items  -->
  <ul v-if="prToggle" class="oxd-main-menu">
    <oxd-main-menu-item
      v-for="(menuItem, index) in prMenuItems"
      :key="`oxd-main-menu-${index}`"
      :collapsed="toggle"
      :name="menuItem.name"
    ></oxd-main-menu-item>
  </ul>
  <div class="oxd-main-menu-divider"></div>

  <!-- Settings -->
  <div class="oxd-main-menu">
    <div class="oxd-main-menu-p">
      <oxd-button label="Settings" :display-type="''" />
    </div>
  </div>
  <!-- Search -->
</template>

<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import type MenuItem from './types';
import usei18n from '@/composables/usei18n';
import MainMenuItem from './MainMenuItem.vue';
import Icon from '@/components/Icon/Icon.vue';
import Input from '@/components/Input/Input.vue';
import IconButton from '@/components/Button/Icon.vue';
import Button from '@/components/Button/Button.vue';

export default defineComponent({
  name: 'OxdMainMenu',

  components: {
    'oxd-icon': Icon,
    'oxd-input': Input,
    'oxd-icon-button': IconButton,
    'oxd-main-menu-item': MainMenuItem,
    'oxd-button': Button,
  },

  props: {
    url: {
      type: String,
      required: false,
      default: '/',
    },
    toggle: {
      type: Boolean,
      required: false,
      default: false,
    },
    menuItems: {
      type: Array as PropType<MenuItem[]>,
      required: false,
      default: () => [],
    },
  },

  emits: ['collapse'],

  setup() {
    return {
      ...usei18n(),
    };
  },

  data() {
    return {
      searchTerm: '',
      hrmToggle: true,
      acToggle: false,
      eqToggle: false,
      itToggle: false,
      jtToggle: false,
      biToggle: false,
      prToggle: false,
      accountingData: [
        {name: 'Accounts Payable'},
        {name: 'Accounts Receivable'},
        {name: 'Bank Reconciliation'},
        {name: 'Cash Manager'},
        {name: 'Check Book'},
        {name: 'Client Accounting'},
        {name: 'Depreciation'},
        {name: 'General Ledger'},
        {name: 'Loan Amortization'},
        {name: 'Report Manager'},
      ],
      equpTracData: [
        {name: 'Equipment Manager'},
        {name: 'Equipment Cost'},
        {name: 'Report Manager'},
      ],
      itMenuItems: [
        {name: 'Inventory'},
        {name: 'Inventory Manager'},
        {name: 'Report Manager'},
      ],
      jtMenuItems: [
        {name: 'Job Cost'},
        {name: 'Job Manager'},
        {name: 'Job Stream'},
        {name: 'Report Manager'},
      ],
      biMenuItems: [
        {name: 'Order Processing'},
        {name: 'Purchase Order'},
        {name: 'Service Billing'},
        {name: 'Billing Manager'},
        {name: 'Time and Billing'},
        {name: 'Report Manager'},
      ],
      prMenuItems: [
        {name: 'Payroll DataEntry'},
        {name: 'Time Manager'},
        {name: 'Report Manager'},
      ],
    };
  },

  computed: {
    classes(): object {
      return {
        toggled: this.toggle,
      };
    },
    filteredMenuItems(): MenuItem[] {
      const escapedSearchTerm = this.searchTerm.replace(
        /[/\-\\^$*+?.()|[\]{}]/g,
        '\\$&',
      );
      const filter = new RegExp(escapedSearchTerm, 'i');
      return this.menuItems.filter((item) => item.name.match(filter));
    },
  },

  methods: {
    onClickCollapse() {
      this.$emit('collapse');
      // trigger resize event for body resize event listners
      // timeout delay is added for sidebar animation 0.3s
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 350);
    },
  },
});
</script>

<style src="./main-menu.scss" lang="scss" scoped></style>
