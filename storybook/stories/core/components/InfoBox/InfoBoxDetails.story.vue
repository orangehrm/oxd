<template>
  <oxd-infobox
    :options="entitlementsOptions"
    @update:modelValue="updateInfoBoxModelValue"
    :modelValue="infoBoxModelValue"
  >
    <template #default>
      <div class="label-tile-content">
        <div class="oxd-info-drop-down-content">
          <span class="oxd-info-drop-down-main-label">
            {{ infoBoxModelValue.label }}
          </span>
          {{ infoBoxModelValue.subHeader }}
        </div>
        <div class="oxd-info-drop-down-description">
          {{ infoBoxModelValue.description }}
        </div>
      </div>
    </template>
    <template #option="slotProps">
      <div class="label-tile-content">
        <div
          class="oxd-info-drop-down-content oxd-info-drop-down-content-option-item"
        >
          <span class="oxd-info-drop-down-main-label">{{
            slotProps.data.label
          }}</span>
          {{ slotProps.data.subHeader }}
        </div>
        <div class="oxd-info-drop-down-description">
          {{ slotProps.data.description }}
        </div>
      </div>
    </template>
  </oxd-infobox>
</template>

<script>
import {ref} from 'vue';
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox';

export default {
  components: {
    'oxd-infobox': InfoBox,
  },

  setup() {
    const entitlementsOptions = ref([
      {
        id: 1,
        label: 'Entitlements',
        subHeader: '4 Days (2 available)',
        description: 'Valid from 2020-10-10 to 2021-10-10',
      },
      {
        id: 2,
        label: 'Entitlements',
        subHeader: '14 Days (12 available)',
        description: 'Valid from 2021-07-10 to 2021-10-10',
      },
      {
        id: 3,
        label: 'Entitlements',
        subHeader: '15 Days (21 available)',
        description: 'Valid from 2023-07-10 to 2023-10-10',
      },
    ]);

    const firstItem =
      entitlementsOptions.value.length > 0
        ? entitlementsOptions.value[0]
        : null;
    const infoBoxModelValue = ref(firstItem);

    const updateInfoBoxModelValue = (selectedOption) => {
      infoBoxModelValue.value = selectedOption;
    };

    return {
      entitlementsOptions,
      infoBoxModelValue,
      updateInfoBoxModelValue,
    };
  },
};
</script>

<style scoped>
.oxd-info-drop-down-main-label {
  font-weight: 700;
}

.label-tile-content {
  padding: 15px 0px;
}

.oxd-info-drop-down-content {
  margin: 0px 0px 3px 0px;
  text-align: initial;
}

.oxd-info-drop-down-content {
  font-size: 0.75rem;
  text-decoration: none;
  color: #64728c;
}

.oxd-info-drop-down-content-option-item span {
  display: initial;
}

.oxd-info-drop-down-description {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: initial;
  color: #64728c;
}
</style>
