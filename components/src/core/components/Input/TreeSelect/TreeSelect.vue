<template>
  <div
    v-click-outside="closeDropdownOnOutsideClick"
    class="oxd-multiselect-wrapper"
  >
    <oxd-tree-select-text
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      :value="getPlaceholderValue()"
      :placeholder="placeholder"
      :selectedCount="selectedIdsComputed.length"
      :dropdownOpened="dropdownOpen"
      @blur="onBlur"
      @click="onToggleDropdown"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onSelectEnter"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
    </oxd-tree-select-text>

    <oxd-tree-select-dropdown
      v-dropdown-direction
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="false"
      :empty="optionsArr.length == 0"
    >
      <template #default>
        <div class="dropdown-container">
          <div class="dropdown-header-div">
            <div class="checkbox-text-group">
              <div class="all-checkbox-div">
                <oxd-checkbox-input
                  :modelValue="isAllSelected"
                  @update:modelValue="ToggleSelectAll($event)"
                ></oxd-checkbox-input>
              </div>
              <div class="all-text">{{ $vt('All') }}</div>
            </div>
            <oxd-divider></oxd-divider>
          </div>

          <div class="tree-select-table-container">
            <table class="tree-select-table">
              <tr v-for="(option, i) in optionsArr" class="oxd-select-option">
                <td class="checkbox-td">
                  <oxd-checkbox-input
                    :modelValue="
                      selectedIdsComputed.includes(String(option.id))
                    "
                    @update:modelValue="
                      selectOptionsOnCheckbox($event, option.id)
                    "
                  ></oxd-checkbox-input>
                </td>
                <td
                  :style="
                    'display: flex ; width: 95%; padding-left:' +
                      option.level * 20 +
                      'px'
                  "
                >
                  <span class="icon-td">
                    <oxd-icon
                      v-if="getIcon(option) === '' ? false : true"
                      :name="getIcon(option)"
                      :tabindex="tabIndex()"
                      :size="'xxx-small'"
                      :withContainer="false"
                      @keydown.enter="iconClicked(option)"
                      @click="iconClicked(option)"
                    ></oxd-icon
                  ></span>
                  <span
                    @click="selectOptionOnlabelClick(option.id)"
                    :class="
                      getIcon(option) == ''
                        ? 'option-label-without-icon'
                        : 'option-label-with-icon'
                    "
                    >{{ option.label }}</span
                  >
                </td>
              </tr>
            </table>
          </div>

          <oxd-divider></oxd-divider>

          <div class="dropdown-footer-div">
            <div>
              <oxd-button
                @click="closeDropdown()"
                :label="$vt('Done')"
                :displayType="'secondary'"
              ></oxd-button>
            </div>
          </div>
        </div>
      </template>
    </oxd-tree-select-dropdown>

    <br />
    selectedIds- {{ selectedIdsComputed }} <br />
    expandedIds- {{ expandedIds }}
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, PropType} from 'vue';

import TreeSelectText from './TreeSelectText.vue';
import SelectDropdown from './TreeSelectDropdown.vue';
import IconVue from '../../Button/Icon.vue';
import CheckboxInputVue from '../CheckboxInput.vue';
import dropdownDirectionDirective from '@orangehrm/oxd/directives/dropdown-direction';
import eventsMixin from '../Select/events-mixin';
import navigationMixin from '../Select/navigation-mixin';
import translateMixin from '../../../../mixins/translate';
import {BOTTOM, DROPDOWN_POSITIONS, Position, TOP} from '../types';
import clickOutsideDirective from '@orangehrm/oxd/directives/click-outside';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Button from '../../Button/Button.vue';
import {Option, OptionProp, SelectedIdsObject} from './type';

export default defineComponent({
  name: 'oxd-tree-select',
  components: {
    'oxd-tree-select-text': TreeSelectText,
    'oxd-tree-select-dropdown': SelectDropdown,
    'oxd-checkbox-input': CheckboxInputVue,
    'oxd-icon': IconVue,
    'oxd-divider': Divider,
    'oxd-button': Button,
  },
  directives: {
    'dropdown-direction': dropdownDirectionDirective,
    'click-outside': clickOutsideDirective,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  props: {
    modelValue: {
      type: Array,
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<OptionProp[]>,
      required: true,
      validator: function(value: OptionProp[]) {
        let options = value;
        let idsCount = 0;
        let uniqueIds = new Set();
        getUniqueIds(options);
        function getUniqueIds(options: OptionProp[]) {
          for (let option of options) {
            uniqueIds.add(option.id);
            idsCount++;
            if (option.children ? option.children.length != 0 : false) {
              getUniqueIds(option.children!);
            }
          }
        }
        if (!(uniqueIds.size === idsCount)) {
          console.warn(
            'prop validation warning: options array prop cannot include non-unique ids',
          );
        }
        return uniqueIds.size === idsCount;
      },
    },
    preSelectedIds: {
      type: Array as PropType<string[]>,
      required: false,
      default: [],
    },
    selectParentsOnChildSelection: {
      type: Boolean,
      default: false,
    },
    dropdownPosition: {
      type: String,
      default: BOTTOM,
      validator: function(value: Position) {
        return DROPDOWN_POSITIONS.indexOf(value) !== -1;
      },
    },
  },

  setup: function(props, {emit}) {
    const expandedIds = ref<string[]>([]);
    const selectedIdsObject = ref<SelectedIdsObject>({});
    const optionsArr = ref<any[]>([...props.options]);
    const dropdownOpen = ref<Boolean>(false);
    const isAllSelected = ref<Boolean>(false);
    const placeholderOption = ref<OptionProp | null>(null);

    const levelizeOptions = (
      optionsArr: Option[],
      level: number,
      parentOptions: Option[],
    ) => {
      for (let option of optionsArr) {
        option['level'] = level;
        option['parentOptions'] = parentOptions;
        selectedIdsObject.value[option.id] = false; //initially makes all the ids false (unselected)
        if (option.children ? option.children.length != 0 : false) {
          levelizeOptions(option.children, level + 1, [
            ...parentOptions,
            option,
          ]);
        }
      }
    };
    levelizeOptions(optionsArr.value, 1, []);
    console.log(optionsArr.value, 'aftr lvlzed');
    console.log(selectedIdsObject.value, 'selectedIdsObject.value');

    const selectedIdsComputed = computed(() => {
      let selectedIds = Object.keys(selectedIdsObject.value).filter(
        k => selectedIdsObject.value[k],
      );
      return selectedIds;
    });

    const selectOptionsOnCheckbox = (
      checkboxVal: Boolean,
      optionId: string,
    ) => {
      let option = optionsArr.value.find((obj: {id: string}) => {
        return obj.id == optionId;
      });

      if (checkboxVal) {
        addChildrenToSelectedIdsArray(option);
        if (props.selectParentsOnChildSelection) {
          selectParentsIfAllChildrenAreSelected(option);
        }
        if (isIfAllOptionsSelected()) {
          isAllSelected.value = true;
        }
      } else {
        removeChildrenFromSelectedIdsArray(option);
        if (props.selectParentsOnChildSelection) {
          removeParentsOfUnselectedOptionsFromSelectedIdsArray(option);
        }
        isAllSelected.value = false;
      }
      emitSelectedIds();
    };

    const emitSelectedIds = () => {
      emit('updateSelectedIds', selectedIdsComputed.value);
    };

    const addChildrenToSelectedIdsArray = (option: Option) => {
      if (!selectedIdsObject.value[option.id]) {
        selectedIdsObject.value[option.id] = true;
      }
      if (option.children ? option.children.length != 0 : false) {
        let children = option.children;
        for (let child of children) {
          addChildrenToSelectedIdsArray(child);
        }
      }
    };

    const selectParentsIfAllChildrenAreSelected = (option: Option) => {
      for (let i = option.parentOptions.length - 1; i >= 0; i--) {
        let parentOption = option.parentOptions[i];
        let allChildrenIncluded = true;
        for (let child of parentOption.children) {
          if (!selectedIdsObject.value[child.id]) {
            allChildrenIncluded = false;
            break;
          }
        }
        if (allChildrenIncluded && !selectedIdsObject.value[parentOption.id]) {
          selectedIdsObject.value[parentOption.id] = true;
        }
      }
    };

    const removeChildrenFromSelectedIdsArray = (option: Option) => {
      removeOptionIdFromSelectedIdsArray(option.id);

      if (option.children ? option.children.length != 0 : false) {
        let children = option.children;
        for (let child of children) {
          removeChildrenFromSelectedIdsArray(child);
        }
      }
    };

    const removeParentsOfUnselectedOptionsFromSelectedIdsArray = (
      option: Option,
    ) => {
      for (let parentOption of option.parentOptions) {
        removeOptionIdFromSelectedIdsArray(parentOption.id);
      }
    };

    const removeOptionIdFromSelectedIdsArray = (optionId: string) => {
      if (selectedIdsObject.value[optionId]) {
        selectedIdsObject.value[optionId] = false;
      }
    };

    const iconClicked = (option: Option) => {
      if (expandedIds.value.includes(option.id)) {
        removeOptionIdFromExpandedIdsArray(option);
        removeExpandedChildrenFromOptionsArray(option);
      } else {
        expandedIds.value.push(option.id);
        addExpandedChildrenToOptionsArray(option);
      }
    };

    const removeOptionIdFromExpandedIdsArray = (option: Option) => {
      let index = expandedIds.value.findIndex(x => x == option.id);
      if (index > -1) {
        expandedIds.value.splice(index, 1);
      }
      if (option.children ? option.children.length != 0 : false) {
        let children = option.children;
        for (let child of children) {
          removeOptionIdFromExpandedIdsArray(child);
        }
      }
    };

    const addExpandedChildrenToOptionsArray = (option: Option) => {
      let optionIndex = optionsArr.value.findIndex(x => x.id == option.id);
      if (optionIndex > -1) {
        let children = optionsArr.value[optionIndex].children;
        optionsArr.value.splice(optionIndex + 1, 0, ...children);
      }
    };

    const removeExpandedChildrenFromOptionsArray = (option: Option) => {
      let children = option.children ?? [];
      for (let child of children) {
        let index = optionsArr.value.findIndex(
          option_ => option_.id == child.id,
        );
        if (index > -1) {
          optionsArr.value.splice(index, 1);
        }
        if (option.children ? option.children.length != 0 : false) {
          let childrenOfchild = option.children;
          for (let childOfChild of childrenOfchild) {
            removeExpandedChildrenFromOptionsArray(childOfChild);
          }
        }
      }
    };

    const getIcon = (option: Option) => {
      if (option.children ? option.children.length != 0 : false) {
        if (expandedIds.value.includes(option.id)) {
          return 'oxd-arrow-down';
        } else return 'oxd-arrow-right';
      } else return '';
    };

    const dropdownClasses = computed(() => {
      return {
        '--positon-bottom': props.dropdownPosition === BOTTOM,
        '--positon-top': props.dropdownPosition === TOP,
      };
    });

    const closeDropdownOnOutsideClick = () => {
      closeDropdown();
    };

    const closeDropdown = () => {
      dropdownOpen.value = false;
    };

    const ToggleSelectAll = (checkboxVal: boolean) => {
      if (checkboxVal) {
        isAllSelected.value = true;
        selectAllOptions();
      } else {
        isAllSelected.value = false;
        unselectAllOptions();
      }
    };

    const selectAllOptions = () => {
      for (let key in selectedIdsObject.value) {
        selectedIdsObject.value[key] = true;
      }
    };

    const unselectAllOptions = () => {
      for (let key in selectedIdsObject.value) {
        selectedIdsObject.value[key] = false;
      }
    };

    const isIfAllOptionsSelected = () => {
      for (let key in selectedIdsObject.value) {
        if (!selectedIdsObject.value[key]) return false;
      }
      return true;
    };

    const selectPreSelectedOptions = () => {
      for (let selectedId of props.preSelectedIds) {
        if (selectedIdsObject.value[selectedId] != undefined) {
          let option = findOptionByOptionId(selectedId, optionsArr.value);
          if (typeof option !== 'string') {
            addChildrenToSelectedIdsArray(option);
            if (props.selectParentsOnChildSelection) {
              selectParentsIfAllChildrenAreSelected(option);
            }
            if (isIfAllOptionsSelected()) {
              isAllSelected.value = true;
            }
          }
        }
      }
    };

    const findOptionByOptionId = (
      optionId: string,
      options: Option[],
    ): Option | string => {
      for (let option of options) {
        console.log(option.id, 'option in loop ---', optionId);
        if (option.id == optionId) {
          return option;
        } else if (option.children ? option.children.length != 0 : false) {
          let result = findOptionByOptionId(optionId, option.children);
          if (result !== 'NOT FOUND' && typeof result !== 'string') {
            return result;
          }
        }
      }
      return 'NOT FOUND';
    };
    selectPreSelectedOptions();

    const onBlur = () => {
      emit('dropdown:blur');
    };

    const tabIndex = () => {
      return props.disabled ? -1 : 0;
    };

    const onSelectEnter = () => {
      if (!dropdownOpen.value && !(props.readonly || props.disabled)) {
        dropdownOpen.value = true;
        emit('dropdown:opened');
      } else {
        dropdownOpen.value = false;
      }
    };

    const selectOptionOnlabelClick = (optionId: string) => {
      if (selectedIdsObject.value[optionId]) {
        selectOptionsOnCheckbox(false, optionId);
      } else {
        selectOptionsOnCheckbox(true, optionId);
      }
    };

    const getPlaceholderValue = () => {
      let placeholderString = '';
      if (
        placeholderOption.value
          ? selectedIdsObject.value[placeholderOption.value.id]
          : false
      ) {
        placeholderString = placeholderOption.value
          ? placeholderOption.value.label
          : '';
      } else {
        let option = findPlaceholderOption(props.options);
        console.log(option, 'findPlaceholderOption');
        if (typeof option !== 'string') {
          placeholderOption.value = option;
          placeholderString = placeholderOption.value.label;
        }
      }
      return placeholderString;
    };

    const findPlaceholderOption = (
      options: OptionProp[],
    ): OptionProp | string => {
      for (let option of options) {
        if (selectedIdsObject.value[option.id]) {
          return option;
        } else if (option.children ? option.children.length !== 0 : false) {
          let result = findPlaceholderOption(option.children!);
          if (result !== 'NOT FOUND' && typeof result !== 'string') {
            return result;
          }
        }
      }
      return 'NOT FOUND';
    };

    return {
      expandedIds,
      optionsArr,
      selectedIdsComputed,
      dropdownOpen,
      dropdownClasses,
      isAllSelected,
      selectOptionsOnCheckbox,
      iconClicked,
      getIcon,
      closeDropdownOnOutsideClick,
      ToggleSelectAll,
      onBlur,
      tabIndex,
      selectOptionOnlabelClick,
      closeDropdown,
      onSelectEnter,
      getPlaceholderValue,
    };
  },
});
</script>

<style src="./tree-select-input.scss" lang="scss" scoped></style>
