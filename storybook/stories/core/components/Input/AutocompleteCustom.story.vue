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
    <oxd-autocomplete-input v-model="selected" :createOptions="callAPI">
      <template v-slot:beforeSelected="{data}">
        <img
          width="25"
          height="25"
          alt="orangehrm logo"
          :src="data.avatar_url"
        />
      </template>
      <template v-slot:afterSelected="{data}">
        (Github ID : {{ data.id }})
      </template>
      <template v-slot:option="{data, text}">
        <oxd-checkbox-input />
        <span v-html="text"></span>
        <div class="github-id">{{ data.id }}</div>
      </template>
    </oxd-autocomplete-input>
    <br />
    <p>{{ selected }}</p>
  </div>
</template>

<script>
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';

export default {
  data() {
    return {
      selected: null,
    };
  },

  components: {
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-checkbox-input': CheckboxInput,
  },

  methods: {
    callAPI(serachParam) {
      return new Promise(resolve => {
        if (serachParam.trim()) {
          fetch(`https://api.github.com/search/users?q=${serachParam}`)
            .then(response => response.json())
            .then(json => {
              const {items} = json;
              resolve(
                items.map(item => {
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
