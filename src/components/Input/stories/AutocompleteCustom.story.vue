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
-->

<template>
  <div>
    <oxd-autocomplete-input v-model="selected" :create-options="callAPI">
      <template #beforeSelected="{data}">
        <img
          width="25"
          height="25"
          alt="orangehrm logo"
          :src="data.avatar_url"
        />
      </template>
      <template #afterSelected="{data}"> (Github ID : {{ data.id }}) </template>
      <template #option="{data, text}">
        <oxd-checkbox-input />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="text"></span>
        <div class="github-id">{{ data.id }}</div>
      </template>
    </oxd-autocomplete-input>
    <br />
    <p>{{ selected }}</p>
  </div>
</template>

<script>
import CheckboxInput from '@/components/Input/CheckboxInput.vue';
import AutocompleteInput from '@/components/Input/Autocomplete/AutocompleteInput.vue';

export default {
  components: {
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-checkbox-input': CheckboxInput,
  },
  data() {
    return {
      selected: null,
    };
  },

  methods: {
    callAPI(serachParam) {
      return new Promise((resolve) => {
        if (serachParam.trim()) {
          fetch(`https://api.github.com/search/users?q=${serachParam}`)
            .then((response) => response.json())
            .then((json) => {
              const {items} = json;
              resolve(
                items.map((item) => {
                  return {
                    id: item.id,
                    label: item.login,
                    avatar_url: item.avatar_url,
                    html_url: item.html_url,
                  };
                }),
              );
            });
        } else {
          resolve([]);
        }
      });
    },
  },
};
</script>

<style scoped>
.github-id {
  margin-left: auto;
}
</style>
