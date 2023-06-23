<template>
  <div>
    <oxd-autocomplete-input
      v-model="selected"
      :createOptions="callAPI"
      :multiple="true"
    >
      <template v-slot:chips="{data}"
        ><span style="margin-left: 10px">({{ data.id }})</span>
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
      selected: [],
    };
  },

  components: {
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-checkbox-input': CheckboxInput,
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
