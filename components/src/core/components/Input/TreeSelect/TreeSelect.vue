<template>
  <div
    v-click-outside="closeDropdownOnOutsideClick"
    class="oxd-multiselect-wrapper"
  >
    <oxd-select-text
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      :value="
        getPlaceholderValue() + (selectedIdsComputed.length > 1 ? ',' : '')
      "
      :placeholder="placeholder"
      :dropdownOpened="dropdownOpen"
      @blur="onBlur"
      @click="onToggleDropdown()"
      @keyup.esc="onCloseDropdown"
      @keydown.enter.prevent="onToggleDropdown()"
      @keydown.down.exact.prevent="onSelectDown"
      @keydown.up.exact.prevent="onSelectUp"
      @keydown="onKeypress"
    >
      <template #afterInput>
        <div v-if="selectedIdsComputed.length > 1" class="selected-count-chip">
          <oxd-chip
            v-if="String(selectedIdsComputed.length - 1).length == 1"
            :label="
              '&nbsp;' + '+' + (selectedIdsComputed.length - 1) + '&nbsp;'
            "
          ></oxd-chip>
          <oxd-chip
            v-if="String(selectedIdsComputed.length - 1).length > 1"
            :label="'+' + (selectedIdsComputed.length - 1)"
          ></oxd-chip>
        </div>
      </template>
    </oxd-select-text>

    <oxd-select-dropdown
      v-dropdown-direction
      v-if="dropdownOpen"
      :class="dropdownClasses"
      :loading="false"
      :empty="optionsArr.length == 0"
    >
      <template #default>
        <div class="dropdown-container">
          <div
            v-if="!(removeAllSelection || disableUncheckedOptions)"
            class="dropdown-header-div"
          >
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
                    :disabled="option._disabled"
                  ></oxd-checkbox-input>
                </td>
                <td
                  :style="
                    'display: flex ; width: 95%; padding-left:' +
                      (option.level * 20 - 20) +
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
                      @keydown.enter="expandIconClicked(option)"
                      @click="expandIconClicked(option)"
                    ></oxd-icon
                  ></span>
                  <span
                    @click="selectOptionOnlabelClick(option)"
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
                @click="onCloseDropdown(null)"
                :label="$vt('Done')"
                :displayType="'secondary'"
              ></oxd-button>
            </div>
          </div>
        </div>
      </template>
    </oxd-select-dropdown>
    <!-- 
    <br />
    selectedIds- {{ selectedIdsComputed }} <br />
    expandedIds-
    {{ Object.keys(expandedIdsObject).filter(k => expandedIdsObject[k]) }} -->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, PropType} from 'vue';

import SelectText from '../Select/SelectText.vue';
import SelectDropdown from '../Select/SelectDropdown.vue';
import IconVue from '../../Button/Icon.vue';
import CheckboxInputVue from '../CheckboxInput.vue';
import dropdownDirectionDirective from '@orangehrm/oxd/directives/dropdown-direction';
import eventsMixin from '../Select/events-mixin';
import navigationMixin from '../Select/navigation-mixin';
import translateMixin from '../../../../mixins/translate';
import {BOTTOM, DROPDOWN_POSITIONS, Position, TOP} from '../types';
import clickOutsideDirective from '@orangehrm/oxd/directives/click-outside';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider';
import Chip from '../../Chip/Chip.vue';
import Button from '../../Button/Button.vue';
import {Option, OptionProp, SelectedIdsObject} from './type';

export default defineComponent({
  name: 'oxd-tree-select',
  components: {
    'oxd-select-text': SelectText,
    'oxd-select-dropdown': SelectDropdown,
    'oxd-checkbox-input': CheckboxInputVue,
    'oxd-icon': IconVue,
    'oxd-divider': Divider,
    'oxd-button': Button,
    'oxd-chip': Chip,
  },
  directives: {
    'dropdown-direction': dropdownDirectionDirective,
    'click-outside': clickOutsideDirective,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  props: {
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
    modelValue: {
      //Pre Selected Ids
      type: Array as PropType<string[]>,
      required: false,
      default: [],
    },
    selectParentsOnChildSelection: {
      type: Boolean,
      default: false,
    },
    disableUncheckedOptions: {
      type: Boolean,
      default: false,
    },
    removeAllSelection: {
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
    const selectedIdsObject = ref<SelectedIdsObject>({});
    const expandedIdsObject = ref<SelectedIdsObject>({});
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
        setDisabledOptions(option);
        selectedIdsObject.value[option.id] = false; //initially makes all the ids false (unselected)
        expandedIdsObject.value[option.id] = false; //initially makes all the ids false (un-expanded)
        if (option.children ? option.children.length != 0 : false) {
          levelizeOptions(option.children, level + 1, [
            ...parentOptions,
            option,
          ]);
        }
      }
    };

    const setDisabledOptions = (option: Option) => {
      option['_disabled'] =
        option['_disabled'] !== undefined ? option['_disabled'] : false;
      if (props.selectParentsOnChildSelection) {
        // have to implement the logic to disable options with parent-child relationship
        //when user sets options to be disabled manually
      }
    };

    levelizeOptions(optionsArr.value, 1, []);

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
          if (props.disableUncheckedOptions) {
            disableUncheckedOptions(option);
          }
        }
        if (isIfAllOptionsSelected()) {
          isAllSelected.value = true;
        }
      } else {
        removeChildrenFromSelectedIdsArray(option);
        if (props.selectParentsOnChildSelection) {
          removeParentsOfUnselectedOptionsFromSelectedIdsArray(option);
          if (props.disableUncheckedOptions) {
            enableUncheckedOptions(option);
          }
        }
        isAllSelected.value = false;
      }
      emitSelectedIds();
    };

    const emitSelectedIds = () => {
      emit('update:modelValue', selectedIdsComputed.value);
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

    const getLevelOneOptions = () => {
      return optionsArr.value.filter(option_ => {
        return option_.level === 1;
      });
    };

    const disableUncheckedOptions = (option: Option) => {
      let levelOneOptions = getLevelOneOptions();

      if (option.parentOptions.length == 0) {
        disableChildrenOptions(levelOneOptions, option);
      } else {
        disableChildrenOptions(levelOneOptions, option.parentOptions[0]);
      }
    };

    const disableChildrenOptions = (
      options: Option[],
      optionToSkip: Option,
    ) => {
      for (let option of options) {
        if (option.id != optionToSkip.id && !option._disabled) {
          option._disabled = true;
          if (option.children ? option.children.length != 0 : false) {
            disableChildrenOptions(option.children, optionToSkip);
          }
        }
      }
    };

    const enableUncheckedOptions = (option: Option) => {
      let levelOneOptions = getLevelOneOptions();

      if (option.parentOptions.length == 0) {
        enableChildrenOptions(levelOneOptions, option);
      } else {
        if (isAllchildrenUnselect(option.parentOptions[0].children)) {
          enableChildrenOptions(levelOneOptions, option.parentOptions[0]);
        }
      }
    };

    const isAllchildrenUnselect = (options: Option[]): boolean => {
      for (let option of options) {
        if (selectedIdsObject.value[option.id]) {
          return false;
        } else if (option.children ? option.children.length != 0 : false) {
          let returnedVal = isAllchildrenUnselect(option.children);
          if (!returnedVal) {
            return false;
          }
        }
      }
      return true;
    };

    const enableChildrenOptions = (options: Option[], optionToSkip: Option) => {
      for (let option of options) {
        if (option.id != optionToSkip.id) {
          option._disabled = false;
          if (option.children ? option.children.length != 0 : false) {
            enableChildrenOptions(option.children, optionToSkip);
          }
        }
      }
    };

    const expandIconClicked = (option: Option) => {
      if (expandedIdsObject.value[option.id]) {
        removeOptionIdFromExpandedIdsArray(option);
        removeExpandedChildrenFromOptionsArray(option);
      } else {
        expandedIdsObject.value[option.id] = true;
        addExpandedChildrenToOptionsArray(option);
      }
    };

    const removeOptionIdFromExpandedIdsArray = (option: Option) => {
      if (expandedIdsObject.value[option.id]) {
        expandedIdsObject.value[option.id] = false;
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
        if (expandedIdsObject.value[option.id]) {
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

    const removeExpandedOptionsFromOptionsArrayOnDropdownClose = () => {
      let levelOneOptions = getLevelOneOptions();
      for (let option of levelOneOptions) {
        if (expandedIdsObject.value[option.id]) {
          expandIconClicked(option);
        }
      }
    };

    const addSelectedOptionsToOptionsArrayOnDropdownOpen = () => {
      for (let selectedId in selectedIdsObject.value) {
        if (selectedIdsObject.value[selectedId]) {
          let option = findOptionByOptionId(selectedId, optionsArr.value);

          if (typeof option !== 'string' && option.level > 1) {
            for (let parent of option.parentOptions) {
              if (!expandedIdsObject.value[parent.id]) {
                expandIconClicked(parent);
              }
            }
          }
        }
      }
    };

    const ToggleSelectAll = (checkboxVal: boolean) => {
      if (checkboxVal) {
        isAllSelected.value = true;
        selectAllOptions();
      } else {
        isAllSelected.value = false;
        unselectAllOptions();
      }
      emitSelectedIds();
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
      for (let selectedId of props.modelValue) {
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

    const selectOptionOnlabelClick = (option: option) => {
      if (!option._disabled) {
        if (selectedIdsObject.value[option.id]) {
          selectOptionsOnCheckbox(false, option.id);
        } else {
          selectOptionsOnCheckbox(true, option.id);
        }
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

    const onBlur = () => {
      emit('dropdown:blur');
    };

    const tabIndex = () => {
      return props.disabled ? -1 : 0;
    };

    const closeDropdownOnOutsideClick = () => {
      onCloseDropdown(null);
    };

    const onCloseDropdown = ($e: KeyboardEvent | null) => {
      if (props.disabled || props.readonly || !dropdownOpen.value) return;
      if ($e && $e.key === 'Escape' && dropdownOpen.value) $e.stopPropagation();
      dropdownOpen.value = false;
      removeExpandedOptionsFromOptionsArrayOnDropdownClose();
      emit('dropdown:closed');
    };

    const onOpenDropdown = () => {
      if (!dropdownOpen.value && !(props.readonly || props.disabled)) {
        dropdownOpen.value = true;
        addSelectedOptionsToOptionsArrayOnDropdownOpen();
        emit('dropdown:opened');
      }
    };

    const onToggleDropdown = () => {
      if (!dropdownOpen.value) {
        onOpenDropdown();
      } else {
        onCloseDropdown(null);
      }
    };

    return {
      optionsArr,
      selectedIdsComputed,
      dropdownOpen,
      dropdownClasses,
      isAllSelected,
      expandedIdsObject,
      selectOptionsOnCheckbox,
      expandIconClicked,
      getIcon,
      closeDropdownOnOutsideClick,
      ToggleSelectAll,
      onBlur,
      tabIndex,
      selectOptionOnlabelClick,
      onCloseDropdown,
      onToggleDropdown,
      getPlaceholderValue,
    };
  },
});
</script>

<style src="./tree-select-input.scss" lang="scss" scoped></style>
