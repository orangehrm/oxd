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
