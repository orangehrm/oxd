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
    :brand-image-src="brandImageSrc"
    :breadcrumb="breadcrumb"
  >
    <div class="orangehrm-container">
      <oxd-table-filter filter-title="System Users">
        <oxd-form>
          <oxd-form-row>
            <oxd-grid :cols="4" class="orangehrm-filter-grid">
              <oxd-grid-item>
                <oxd-input-field label="Username" v-model="filters.username" />
              </oxd-grid-item>
              <oxd-grid-item>
                <oxd-input-field
                  type="dropdown"
                  label="User Role"
                  v-model="filters.role"
                  :options="[]"
                />
              </oxd-grid-item>
            </oxd-grid>
          </oxd-form-row>
          <oxd-divider />
          <oxd-form-actions>
            <oxd-button displayType="secondary" label="Search" type="submit" />
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
        <template v-slot:pagination>
          <oxd-pagination :length="3" :max="10" />
        </template>
      </oxd-report-table>
    </div>
    <template v-slot:user-actions>
      <li role="none">
        <a href="#" role="menuitem" class="oxd-userdropdown-link">
          <oxd-icon name="box-arrow-right" :with-container="false" />Logout
        </a>
      </li>
    </template>
    <template v-slot:footer>
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
import {topMenuItems, sidePanelItems, headers, breadcrumb} from './mockdata';
import Text from '@orangehrm/oxd/core/components/Text/Text';
import Layout from '@orangehrm/oxd/core/components/Layout/Layout';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import Form from '@orangehrm/oxd/core/components/Form/Form';
import FormRow from '@orangehrm/oxd/core/components/Form/FormRow';
import FormActions from '@orangehrm/oxd/core/components/Form/FormActions';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Button from '@orangehrm/oxd/core/components/Button/Button';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import ReportTable from '@orangehrm/oxd/core/components/ReportTable/ReportTable';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon';

export default {
  name: 'Layout',
  components: {
    'oxd-text': Text,
    'oxd-layout': Layout,
    'oxd-table-filter': TableFilter,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
    'oxd-form': Form,
    'oxd-form-row': FormRow,
    'oxd-form-actions': FormActions,
    'oxd-input-group': InputGroup,
    'oxd-input-field': InputField,
    'oxd-button': Button,
    'oxd-icon-button': IconButton,
    'oxd-divider': Divider,
    'oxd-report-table': ReportTable,
    'oxd-pagination': Pagination,
    'oxd-icon': Icon,
  },
  data() {
    return {
      brandImageSrc: require('@orangehrm/oxd/assets/images/orange.png'),
      user: {
        firstName: 'Jeff',
        lastName: 'Winger',
        profImgSrc: require('@orangehrm/oxd/assets/images/orange.png'),
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
    this.items = new Array(10).fill('').map((_, index) => {
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
