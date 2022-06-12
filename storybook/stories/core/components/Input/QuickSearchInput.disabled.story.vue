<template>
  <div>
    <oxd-quick-search :createOptions="callAPI" :disabled="true">
      <template v-slot:iconSlot>
        <oxd-icon-button name="oxd-search"></oxd-icon-button>
      </template>
      <template v-slot:option="{data}">
        <span
          class="auto-complete-img"
          style="display: inline-block; padding-right: 15px"
        >
          <img
            :src="data.avatar_url"
            style="
              border-radius: 50%;
              height: auto;
              cursor: pointer;
              width: 2.5rem;
              max-height: 2.5rem;
            "
          />
        </span>
        <span> {{ data.label }}</span>
      </template>
    </oxd-quick-search>
  </div>
</template>

<script>
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';

export default {
  data() {
    return {};
  },

  components: {
    'oxd-quick-search': QuickSearchInput,
    'oxd-icon-button': IconButton,
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
