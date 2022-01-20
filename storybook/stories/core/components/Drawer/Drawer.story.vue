<template>
  <div class="container">
    <oxd-icon-button
      :label="'Toggle drawer'"
      :displayType="'secondary'"
      @click="toggleDrawer"
      :style="{
        position: 'fixed',
        left: `${position === 'right' ? '0px': null}`,
        right: `${position === 'left' ? '0px': null}`,
      }"
    />
    <oxd-drawer
      :modal-state="modalState"
      :width="'800px'"
      :height="'100%'"
      :full-height="false"
      :sticky-footer="true"
      :fixed="true"
      :position="position"
      :ok-button="{
        label: 'Search',
        click: applySearch
      }"
      :cancel-button="{
        click: cancelSearch
      }"
    >
      <template v-slot:header>
        <div class="d-flex align-center justify-between">
          <h5>Filters</h5>
          <oxd-icon-button
            :name="'oxd-refresh'"
          />
        </div>
      </template>
      <template v-slot:body>
        <oxd-grid :cols="2">
          <oxd-grid-item>
            <oxd-input-group
              :label="'Job Title'"
            >
              <oxd-select-input
                :options="[
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
                  }
                ]"
              />
            </oxd-input-group>
          </oxd-grid-item>
          <oxd-grid-item>
            <oxd-input-group
              :label="'Sub-unit'"
            >
              <oxd-select-input
                :options="[
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
                  }
                ]"
              />
            </oxd-input-group>
          </oxd-grid-item>
          <oxd-grid-item>
            <oxd-input-group
              :label="'Location'"
            >
              <oxd-select-input
                :options="[
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
                  }
                ]"
              />
            </oxd-input-group>
          </oxd-grid-item>
          <oxd-grid-item>
            <oxd-input-group
              :label="'Status'"
            >
              <oxd-select-input
                :options="[
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
                  }
                ]"
              />
            </oxd-input-group>
          </oxd-grid-item>

          <oxd-grid-item>
            <oxd-input-group
              placeholder="dd/mm/yyyy"
              :label="'From'"
            >
              <oxd-date-input />
            </oxd-input-group>
          </oxd-grid-item>

          <oxd-grid-item>
            <oxd-input-group
              placeholder="dd/mm/yyyy"
              :label="'To'"
            >
              <oxd-date-input />
            </oxd-input-group>
          </oxd-grid-item>
        </oxd-grid>
      </template>
    </oxd-drawer>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon';
import Drawer from '@orangehrm/oxd/core/components/Drawer/Drawer';
import Grid from '@orangehrm/oxd/core/components/Grid/Grid';
import GridItem from '@orangehrm/oxd/core/components/Grid/GridItem';
import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput';
import oxdIconButton from '@orangehrm/oxd/core/components/Button/Button.vue';

export default defineComponent({
  components: {
    'oxd-icon-button': IconButton,
    'oxd-grid': Grid,
    'oxd-grid-item': GridItem,
    'oxd-input-field': InputField,
    'oxd-select-input': SelectInput,
    'oxd-drawer': Drawer,
    'oxd-input-group': InputGroup,
    'oxd-date-input': DateInput,
    'oxd-icon-button': oxdIconButton,
  },

  setup() {
    const modalState = ref<boolean>(false);
    const position = ref<string>('right');
    const applySearch = () => {
      modalState.value = false
      console.log('search applied');
    }
    const cancelSearch = () => {
      modalState.value = false
      console.log('search cancelled');
    }

    const toggleDrawer = () => {
      modalState.value = !modalState.value
    }

    return {
      position,
      modalState,
      applySearch,
      cancelSearch,
      toggleDrawer,
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
