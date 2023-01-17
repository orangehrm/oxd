<template>
  <div>
    <oxd-autocomplete-email-input
      v-model="selected"
      :createOptions="callAPI"
      :multiple="true"
      @update:searchTerm="onUpdateSearchTerm"
      @selectenter="onEnter"
    >
      <template v-slot:beforeSelected="{data}">
        <img
          width="25"
          height="25"
          alt="orangehrm logo"
          :src="data.avatar_url"
        />
      </template>
    </oxd-autocomplete-email-input>
    <br />
    <p>{{ selected }}</p>
  </div>
</template>

<script>
import AutocompleteEmail from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteEmail';

export default {
  data() {
    return {
      selected: [
        {
          id: 33354992,
          label: 'gayanSandamal',
          avatar_url: 'https://avatars.githubusercontent.com/u/33354992?v=4',
          labelSecondary: `(${'https://github.com/gayanSandamal'})`,
          preSelected: true,
        },
      ],
    };
  },

  components: {
    'oxd-autocomplete-email-input': AutocompleteEmail,
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
                    labelSecondary: `(${item.labelSecondary})`,
                  };
                }),
              );
            });
        } else {
          resolve([]);
        }
      });
    },
    onUpdateSearchTerm(searchTerm) {
      this.searchTerm = searchTerm;
    },
    onEnter() {
      this.selected = [
        ...this.selected,
        {
          labelSecondary: this.searchTerm,
        },
      ];
    },
  },
};
</script>
