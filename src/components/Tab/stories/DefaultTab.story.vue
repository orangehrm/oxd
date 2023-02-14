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
  <oxd-tab-container v-model="selector" @click-tab="onClickTab">
    <oxd-tab-panel
      key="first"
      name="First Tab"
      @activate="onFirstTabActivate"
      @deactivate="onFirstTabDeactivate"
    >
      <p>
        <b>First</b> is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </oxd-tab-panel>
    <oxd-tab-panel key="disabled" disabled="true" name="Disabled Tab">
      <p>This tab is disabled</p>
    </oxd-tab-panel>
    <oxd-tab-panel
      key="second"
      name="Second Tab"
      @activate="onSecondTabActivate"
      @deactivate="onSecondTabDeactivate"
    >
      <p>
        <b>Second</b> is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </oxd-tab-panel>
    <oxd-tab-panel
      key="third"
      name="Third Tab"
      class="orangehrm-custom-tab"
      @activate="onThirdTabActivate"
      @deactivate="onThirdTabDeactivate"
    >
      <p>
        <b>Third</b> is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </oxd-tab-panel>
  </oxd-tab-container>
</template>

<script>
import TabPanel from '@/components/Tab/TabPanel.vue';
import TabContainer from '@/components/Tab/TabContainer.vue';

export default {
  components: {
    'oxd-tab-panel': TabPanel,
    'oxd-tab-container': TabContainer,
  },

  data() {
    return {
      selector: null,
    };
  },

  methods: {
    onFirstTabActivate() {
      console.log('First Tab Activated');
    },
    onFirstTabDeactivate() {
      console.log('First Tab Deactivated');
    },
    onSecondTabActivate() {
      console.log('Second Tab Activated');
    },
    onSecondTabDeactivate() {
      console.log('Second Tab Deactivated');
    },
    onThirdTabActivate() {
      console.log('Third Tab Activated');
    },
    onThirdTabDeactivate() {
      console.log('Third Tab Deactivated');
    },
    onClickTab($e) {
      $e.preventDefault();
    },
  },
};
</script>

<style scoped>
.orangehrm-custom-tab {
  border: 1px solid red;
  padding: 1rem 1.5rem;
}
</style>
