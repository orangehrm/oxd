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
  <oxd-layout
    :user="user"
    context-title="Personal Information Manager"
    :sidepanel-menu-items="sidepanelMenuItems"
    :topbar-menu-items="topbarMenuItems"
    :brand-logo-src="brandLogoSrc"
    :brand-banner-src="brandBannerSrc"
    :breadcrumb="breadcrumb"
  >
    <div class="orangehrm-container">
      <oxd-table-filter filter-title="System Users">
        <oxd-form>
          <oxd-form-row>
            <oxd-grid :cols="4" class="orangehrm-filter-grid">
              <oxd-grid-item>
                <oxd-input-field v-model="filters.username" label="Username" />
              </oxd-grid-item>
              <oxd-grid-item>
                <oxd-input-field
                  v-model="filters.role"
                  type="select"
                  label="User Role"
                  :options="[]"
                />
              </oxd-grid-item>
            </oxd-grid>
          </oxd-form-row>
          <oxd-divider />
          <oxd-form-actions>
            <oxd-button display-type="secondary" label="Search" type="submit" />
          </oxd-form-actions>
        </oxd-form>
      </oxd-table-filter>
      <br />
      <oxd-report-table
        :loading="isLoading"
        :headers="headers"
        :items="items"
        :column-count="6"
      >
        <template #pagination>
          <oxd-pagination :length="3" :max="10" />
        </template>
      </oxd-report-table>
    </div>
    <template #user-actions>
      <li role="none">
        <a href="#" role="menuitem" class="oxd-userdropdown-link">
          <oxd-icon name="box-arrow-right" :with-container="false" />Logout
        </a>
      </li>
    </template>
    <template #footer>
      <oxd-text tag="p" class="orangehrm-copyright">OrangeHRM 5.0</oxd-text>
      <oxd-text tag="p" class="orangehrm-copyright">
        &copy; 2005 - 2021
        <a href="http://www.orangehrm.com" target="_blank">OrangeHRM, Inc</a>.
        All rights reserved.
      </oxd-text>
      <br />
    </template>
  </oxd-layout>
</template>

<script>
import Text from '@/components/Text/Text.vue';
import Grid from '@/components/Grid/Grid.vue';
import Form from '@/components/Form/Form.vue';
import Icon from '@/components/Icon/Icon.vue';
import Button from '@/components/Button/Button.vue';
import Layout from '@/components/Layout/Layout.vue';
import FormRow from '@/components/Form/FormRow.vue';
import GridItem from '@/components/Grid/GridItem.vue';
import Divider from '@/components/Divider/Divider.vue';
import FormActions from '@/components/Form/FormActions.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import InputField from '@/components/InputField/InputField.vue';
import TableFilter from '@/components/TableFilter/TableFilter.vue';
import ReportTable from '@/components/ReportTable/ReportTable.vue';
import {topMenuItems, sidePanelItems, headers, breadcrumb} from './mockdata';

export default {
  name: 'Layout',

  components: {
    'oxd-text': Text,
    'oxd-grid': Grid,
    'oxd-form': Form,
    'oxd-icon': Icon,
    'oxd-layout': Layout,
    'oxd-button': Button,
    'oxd-divider': Divider,
    'oxd-form-row': FormRow,
    'oxd-grid-item': GridItem,
    'oxd-pagination': Pagination,
    'oxd-input-field': InputField,
    'oxd-form-actions': FormActions,
    'oxd-report-table': ReportTable,
    'oxd-table-filter': TableFilter,
  },
  data() {
    return {
      brandLogoSrc: '/images/orange.png',
      brandBannerSrc: '/images/orangehrm-logo.png',
      user: {
        firstName: 'Jeff',
        lastName: 'Winger',
        profImgSrc: '/images/orange.png',
      },
      filters: {
        username: '',
        role: null,
      },
      isLoading: false,
      headers: headers,
      items: [],
      sidepanelMenuItems: sidePanelItems,
      topbarMenuItems: topMenuItems,
      breadcrumb: breadcrumb,
    };
  },

  beforeMount() {
    const types = [
      'AUS - Annual',
      'AUS - Casual',
      'AUS - Maternity',
      'LKA - Annual',
      'LKA - Casual',
      'LKA - Maternity',
    ];
    this.items = new Array(10).fill('').map(() => {
      const rand = Math.random();
      return {
        type: types[Math.floor(rand * types.length)],
        entitlement: parseFloat(rand * 100).toFixed(2),
        pending: '0.00',
        scheduled: '2.00',
        taken: '0.00',
        balance: parseFloat(rand * 100 - 2).toFixed(2),
      };
    });
  },
};
</script>

<style scoped>
.orangehrm-container {
  background-color: #f6f5fb;
  border-radius: unset;
  padding: 0;
}
.orangehrm-filter-grid {
  width: 100%;
}
.orangehrm-copyright {
  font-size: 0.8rem;
  text-align: center;

  & a {
    color: #38455d;
  }
}
</style>
