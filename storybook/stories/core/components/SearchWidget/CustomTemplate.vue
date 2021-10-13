<template>
  <oxd-search-widget :createOptions="syncFunction">
    <template v-slot:iconSlot>
      <oxd-icon-button name="oxd-search"></oxd-icon-button>
    </template>
  </oxd-search-widget>
</template>

<script>
import SearchWidget from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteSearchwidget.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
export default {
  components: {
    'oxd-search-widget': SearchWidget,
    'oxd-icon-button': IconButton,
  },
  data() {
    return {
      options: [
        {
          id: 1,
          label: 'HR Admin',
        },
        {
          id: 2,
          label: 'ESS User',
        },
        {
          id: 3,
          label: 'Supervisor',
        },
        {
          id: 4,
          label: 'Manager',
        },
        {
          id: 5,
          label: 'Employee',
        },
        {
          id: 6,
          label: 'Appraiser',
        },
      ],
    };
  },
  methods: {
    syncFunction(serachParam) {
      const filter = new RegExp(serachParam, 'i');
      return this.options.filter(item => item.label.match(filter));
    },
  },
};
</script>
