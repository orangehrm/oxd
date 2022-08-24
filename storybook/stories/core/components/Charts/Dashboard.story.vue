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
  <div class="orangehrm-dashboard">
    <oxd-grid :cols="3">
      <oxd-grid-item>
        <oxd-sheet :gutters="false" class="orangehrm-dashboard-widget">
          <oxd-text type="card-title">
            Employee Distribution (Custom Legend)
          </oxd-text>
          <oxd-divider />
          <div class="orangehrm-dashboard-widget-body">
            <oxd-pie-chart
              :data="dataset"
              :custom-legend="true"
            ></oxd-pie-chart>
          </div>
        </oxd-sheet>
      </oxd-grid-item>
      <oxd-grid-item>
        <oxd-sheet :gutters="false" class="orangehrm-dashboard-widget">
          <oxd-text type="card-title">Employee Distribution</oxd-text>
          <oxd-divider />
          <div class="orangehrm-dashboard-widget-body">
            <oxd-pie-chart :data="dataset"></oxd-pie-chart>
          </div>
        </oxd-sheet>
      </oxd-grid-item>
    </oxd-grid>
  </div>
</template>

<script>
import Text from '@ohrm/oxd/core/components/Text/Text';
import Grid from '@ohrm/oxd/core/components/Grid/Grid';
import Sheet from '@ohrm/oxd/core/components/Sheet/Sheet';
import GridItem from '@ohrm/oxd/core/components/Grid/GridItem';
import Divider from '@ohrm/oxd/core/components/Divider/Divider';
import PieChart from '@ohrm/oxd/core/components/Chart/PieChart';

export default {
  components: {
    'oxd-text': Text,
    'oxd-grid': Grid,
    'oxd-sheet': Sheet,
    'oxd-divider': Divider,
    'oxd-grid-item': GridItem,
    'oxd-pie-chart': PieChart,
  },
  data() {
    return {
      dataset: [
        {value: 148, label: 'Engineering'},
        {value: 735, label: 'Marketing'},
        {value: 580, label: 'Human Resources'},
        {value: 484, label: 'Management'},
        {value: 300, label: 'Accounting'},
        {value: 50, label: 'Human Resources'},
        {value: 4, label: 'Management'},
        {value: 100, label: 'Accounting'},
        {value: 30, label: 'Accounting'},
        {value: 50, label: 'Human Resources'},
        {value: 4, label: 'Management'},
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.orangehrm-dashboard {
  &-widget {
    padding: 0.75rem;
    margin-bottom: 1rem;
    &-body {
      height: 300px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      }
      &::-webkit-scrollbar-track {
        background: #f6f5fb;
      }
      &::-webkit-scrollbar-thumb {
        background: #cfd3de;
        border-radius: 1.2rem;
      }
    }
  }
}
</style>
