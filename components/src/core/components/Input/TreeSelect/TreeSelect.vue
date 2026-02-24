<template>
  <div
    ref="inputContainerRef"
    v-click-outside="closeDropdownOnOutsideClick"
    class="oxd-multiselect-wrapper"
  >
    <oxd-select-text
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      :value="displayValue"
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
      <template v-if="$slots.topOfInput" #topOfInput>
        <slot name="topOfInput"></slot>
      </template>
      <template #afterInput>
        <div v-if="remainingCount > 0 && !(allSelectedText && isAllSelected)" class="selected-count-chip">
          <oxd-chip
            v-if="String(remainingCount).length == 1"
            :label="'&nbsp;' + '+' + remainingCount + '&nbsp;'"
          ></oxd-chip>
          <oxd-chip
            v-if="String(remainingCount).length > 1"
            :label="'+' + remainingCount"
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
                  @keyup.esc="onCloseDropdown"
                  @keydown.enter.prevent="
                    isAllSelected
                      ? ToggleSelectAll(false)
                      : ToggleSelectAll(true)
                  "
                ></oxd-checkbox-input>
              </div>
              <div
                @click="
                  isAllSelected ? ToggleSelectAll(false) : ToggleSelectAll(true)
                "
                class="all-text"
              >
                {{ $vt('All') }}
              </div>
            </div>
            <oxd-divider></oxd-divider>
          </div>

          <div class="tree-select-table-container">
            <table cellpadding="0" class="tree-select-table">
              <tr
                v-for="(option, i) in optionsArr"
                :key="i"
                class="oxd-select-option"
              >
                <td class="checkbox-td">
                  <oxd-checkbox-input
                    :modelValue="
                      selectedIdsComputed.includes(String(option.id))
                    "
                    @update:modelValue="
                      selectOptionsOnCheckbox($event, option.id)
                    "
                    :disabled="option._disabled"
                    @keyup.esc="onCloseDropdown"
                    @keydown.enter.prevent="
                      keyUpEnterOnCheckbox($event, option)
                    "
                  ></oxd-checkbox-input>
                </td>
                <td
                  :style="
                    'display: flex ; width: 90%; margin-left:5%; padding-left:' +
                      (option._level * 20 - 20) +
                      'px'
                  "
                >
                  <span
                    :class="
                      getIcon(option) === ''
                        ? 'icon-td-without-icon'
                        : 'icon-td'
                    "
                    @click="
                      getIcon(option) === '' ? '' : expandIconClicked(option)
                    "
                  >
                    <oxd-icon
                      v-if="getIcon(option) === '' ? false : true"
                      :name="getIcon(option)"
                      :tabindex="tabIndex()"
                      :size="'xxx-small'"
                      :withContainer="false"
                      @keyup.esc.prevent="onCloseDropdown"
                      @keydown.enter="expandIconClicked(option)"
                    ></oxd-icon
                  ></span>
                  <span
                    @click="selectOptionOnlabelClick(option)"
                    :style="getOptionLabelStyle(option)"
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
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, PropType, watch, nextTick} from 'vue';

import SelectText from '../Select/SelectText.vue';
import useTranslate from '../../../../composables/useTranslate';
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
import {memoize} from 'lodash-es';
import {Option, OptionProp, IdsObject, NOT_FOUND} from './type';

const CHIP_RESERVE_WIDTH = 52;

/**
 * Pure calculation: how many option labels fit in availableWidth when rendered
 * with the given font. Used with memoize to avoid repeated canvas measurement.
 */
function getVisibleCount(
  optionLabels: string[],
  availableWidth: number,
  fontString: string,
): number {
  if (optionLabels.length === 0) return 0;
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return optionLabels.length;
    ctx.font = fontString;
    let totalWidth = 0;
    let visibleCount = 0;
    for (let i = 0; i < optionLabels.length; i++) {
      const itemText = i > 0 ? `, ${optionLabels[i]}` : optionLabels[i];
      const itemWidth = ctx.measureText(itemText).width;
      const remainingItems = optionLabels.length - (i + 1);
      const needsChip = remainingItems > 0;
      const requiredWidth =
        totalWidth + itemWidth + (needsChip ? CHIP_RESERVE_WIDTH : 0);
      if (requiredWidth <= availableWidth) {
        totalWidth += itemWidth;
        visibleCount++;
      } else {
        break;
      }
    }
    return visibleCount === 0 && optionLabels.length > 0 ? 1 : visibleCount;
  } catch {
    return optionLabels.length;
  }
}

const getVisibleCountMemoized = memoize(
  getVisibleCount,
  (optionLabels: string[], availableWidth: number, fontString: string) =>
    `${availableWidth};${fontString};${optionLabels.join('\0')}`,
);

export default defineComponent({
  name: 'oxd-tree-select-input',
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
        const options = value;
        let idsCount = 0;
        const uniqueIds = new Set();
        function getUniqueIds(options: OptionProp[]) {
          for (const option of options) {
            uniqueIds.add(option.id);
            idsCount++;
            if (option.children ? option.children.length != 0 : false) {
              if (option.children) {
                getUniqueIds(option.children);
              }
            }
          }
        }
        getUniqueIds(options);
        if (!(uniqueIds.size === idsCount)) {
          // eslint-disable-next-line no-console
          console.error(
            'prop validation error: treeSelect- options array prop cannot include duplicate option ids',
          );
        }
        return uniqueIds.size === idsCount;
      },
    },
    modelValue: {
      //Pre Selected Ids
      type: Array as PropType<Array<string>> | null,
      required: false,
      default: null,
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
    countTopmostParents: {
      type: Boolean,
      default: true,
    },
    allSelectedText: {
      type: String,
      default: '',
      validator: function(value: string) {
        return value.length <= 100;
      },
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
    const {$t} = useTranslate();
    const selectedIdsObject = ref<IdsObject>({});
    const expandedIdsObject = ref<IdsObject>({});
    const optionsArr = ref<Option[]>([]);
    const dropdownOpen = ref<boolean>(false);
    const isAllSelected = ref<boolean>(false);
    const inputContainerRef = ref<HTMLElement | null>(null);
    const visibleItemsCount = ref<number>(0);

    const spreadOptions = () => {
      optionsArr.value = [...JSON.parse(JSON.stringify(props.options))];
    };

    const setDisabledOptions = (option: Option) => {
      option['_disabled'] =
        option['_disabled'] !== undefined ? option['_disabled'] : false;
      if (props.selectParentsOnChildSelection) {
        // have to implement the logic to disable options with parent-child relationship
        //when user sets options to be disabled manually
      }
    };

    const levelizeOptions = (
      optionsArr: Option[],
      level: number,
      parentOptions: Option[],
    ) => {
      for (const option of optionsArr) {
        option['_level'] = level;
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

    const getLevelOneOptions = () => {
      return optionsArr.value.filter(option_ => {
        return option_._level === 1;
      });
    };

    const selectedIdsComputed = computed(() => {
      const selectedIds = Object.keys(selectedIdsObject.value).filter(
        k => selectedIdsObject.value[k],
      );
      return selectedIds;
    });

    const selectedIdsLengthComputed = computed(() => {
      if (props.countTopmostParents) {
        return selectedIdsComputed.value.length;
      } else {
        let selectedLevelOneOptionsCount = 0;
        const levelOneOptions = getLevelOneOptions();
        for (const option of levelOneOptions) {
          if (selectedIdsObject.value[option.id]) {
            selectedLevelOneOptionsCount++;
          }
        }
        return selectedIdsComputed.value.length - selectedLevelOneOptionsCount;
      }
    });

    const getOptionLabelStyle = (option: Option) => {
      if (selectedIdsObject.value[option.id]) {
        if (option.children ? option.children.length != 0 : false) {
          return 'color:#38455D; font-weight:600;';
        } else {
          return 'color:#64728c; font-weight:600;';
        }
      } else return '';
    };

    const addChildrenToSelectedIdsArray = (option: Option) => {
      if (!selectedIdsObject.value[option.id]) {
        selectedIdsObject.value[option.id] = true;
      }
      if (option.children ? option.children.length != 0 : false) {
        const children = option.children;
        for (const child of children) {
          addChildrenToSelectedIdsArray(child);
        }
      }
    };

    const selectParentsIfAllChildrenAreSelected = (option: Option) => {
      for (let i = option.parentOptions.length - 1; i >= 0; i--) {
        const parentOption = option.parentOptions[i];
        let allChildrenIncluded = true;
        for (const child of parentOption.children) {
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

    const removeOptionIdFromSelectedIdsArray = (optionId: string) => {
      if (selectedIdsObject.value[optionId]) {
        selectedIdsObject.value[optionId] = false;
      }
    };

    const removeChildrenFromSelectedIdsArray = (option: Option) => {
      removeOptionIdFromSelectedIdsArray(option.id);

      if (option.children ? option.children.length != 0 : false) {
        const children = option.children;
        for (const child of children) {
          removeChildrenFromSelectedIdsArray(child);
        }
      }
    };
    const removeParentsOfUnselectedOptionsFromSelectedIdsArray = (
      option: Option,
    ) => {
      for (const parentOption of option.parentOptions) {
        removeOptionIdFromSelectedIdsArray(parentOption.id);
      }
    };

    const disableChildrenOptions = (
      options: Option[],
      optionToSkip: Option,
    ) => {
      for (const option of options) {
        if (option.id != optionToSkip.id && !option._disabled) {
          option._disabled = true;
          if (option.children ? option.children.length != 0 : false) {
            disableChildrenOptions(option.children, optionToSkip);
          }
        }
      }
    };

    const disableUncheckedOptions = (option: Option) => {
      const levelOneOptions = getLevelOneOptions();

      if (option.parentOptions.length == 0) {
        disableChildrenOptions(levelOneOptions, option);
      } else {
        disableChildrenOptions(levelOneOptions, option.parentOptions[0]);
      }
    };

    const isAllchildrenUnselect = (options: Option[]): boolean => {
      for (const option of options) {
        if (selectedIdsObject.value[option.id]) {
          return false;
        } else if (option.children ? option.children.length != 0 : false) {
          const returnedVal = isAllchildrenUnselect(option.children);
          if (!returnedVal) {
            return false;
          }
        }
      }
      return true;
    };

    const enableChildrenOptions = (options: Option[], optionToSkip: Option) => {
      for (const option of options) {
        if (option.id != optionToSkip.id) {
          option._disabled = false;
          if (option.children ? option.children.length != 0 : false) {
            enableChildrenOptions(option.children, optionToSkip);
          }
        }
      }
    };

    const enableUncheckedOptions = (option: Option) => {
      const levelOneOptions = getLevelOneOptions();

      if (option.parentOptions.length == 0) {
        enableChildrenOptions(levelOneOptions, option);
      } else {
        if (isAllchildrenUnselect(option.parentOptions[0].children)) {
          enableChildrenOptions(levelOneOptions, option.parentOptions[0]);
        }
      }
    };

    const emitSelectedIds = () => {
      emit('update:modelValue', selectedIdsComputed.value);
    };

    const isIfAllOptionsSelected = () => {
      for (const key in selectedIdsObject.value) {
        if (!selectedIdsObject.value[key]) return false;
      }
      return true;
    };

    const selectOptionsOnCheckbox = (
      checkboxVal: boolean,
      optionId: string,
    ) => {
      const option = optionsArr.value.find((obj: {id: string}) => {
        return obj.id == optionId;
      });

      if (checkboxVal && option) {
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
      } else if (!checkboxVal && option) {
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

    const addExpandedChildrenToOptionsArray = (option: Option) => {
      const optionIndex = optionsArr.value.findIndex(x => x.id == option.id);
      if (optionIndex > -1) {
        const children = optionsArr.value[optionIndex].children;
        optionsArr.value.splice(optionIndex + 1, 0, ...children);
      }
    };

    const removeOptionIdFromExpandedIdsArray = (option: Option) => {
      if (expandedIdsObject.value[option.id]) {
        expandedIdsObject.value[option.id] = false;
      }
      if (option.children ? option.children.length != 0 : false) {
        const children = option.children;
        for (const child of children) {
          removeOptionIdFromExpandedIdsArray(child);
        }
      }
    };

    const removeExpandedChildrenFromOptionsArray = (option: Option) => {
      const children = option.children ?? [];
      for (const child of children) {
        const index = optionsArr.value.findIndex(
          option_ => option_.id == child.id,
        );
        if (index > -1) {
          optionsArr.value.splice(index, 1);
        }
        if (option.children ? option.children.length != 0 : false) {
          const childrenOfchild = option.children;
          for (const childOfChild of childrenOfchild) {
            removeExpandedChildrenFromOptionsArray(childOfChild);
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
      const levelOneOptions = getLevelOneOptions();
      for (const option of levelOneOptions) {
        if (expandedIdsObject.value[option.id]) {
          expandIconClicked(option);
        }
      }
    };

    const findOptionByOptionId = (
      optionId: string,
      options: Option[],
    ): Option | string => {
      for (const option of options) {
        if (option.id == optionId) {
          return option;
        } else if (option.children ? option.children.length != 0 : false) {
          const result = findOptionByOptionId(optionId, option.children);
          if (result !== NOT_FOUND && typeof result !== 'string') {
            return result;
          }
        }
      }
      return NOT_FOUND;
    };

    const addSelectedOptionsToOptionsArrayOnDropdownOpen = () => {
      for (const selectedId in selectedIdsObject.value) {
        if (selectedIdsObject.value[selectedId]) {
          const option = findOptionByOptionId(selectedId, optionsArr.value);

          if (typeof option !== 'string' && option._level > 1) {
            for (const parent of option.parentOptions) {
              if (!expandedIdsObject.value[parent.id]) {
                expandIconClicked(parent);
              }
            }
          }
        }
      }
    };

    const selectAllOptions = () => {
      for (const key in selectedIdsObject.value) {
        const option = findOptionByOptionId(key, optionsArr.value);
        if (option && typeof option !== 'string' && !option._disabled) {
          // Only select non-disabled options
          selectedIdsObject.value[key] = true;
        }
      }
    };

    const unselectAllOptions = () => {
      for (const key in selectedIdsObject.value) {
        selectedIdsObject.value[key] = false;
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

    const selectPreSelectedOptions = () => {
      if (props.modelValue && Array.isArray(props.modelValue)) {
        for (const selectedId of props.modelValue) {
          if (selectedIdsObject.value[selectedId] != undefined) {
            const option = findOptionByOptionId(selectedId, optionsArr.value);
            if (typeof option !== 'string') {
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
            }
          }
        }
      }
    };

    const selectOptionOnlabelClick = (option: Option) => {
      if (!option._disabled) {
        if (selectedIdsObject.value[option.id]) {
          selectOptionsOnCheckbox(false, option.id);
        } else {
          selectOptionsOnCheckbox(true, option.id);
        }
      }
    };

    const allSelectedOptions = computed((): Option[] => {
      return selectedIdsComputed.value
        .map(id => findOptionByOptionId(id, optionsArr.value))
        .filter((option): option is Option => 
          typeof option !== 'string' && 
          (props.countTopmostParents || option._level > 1)
        );
    });

    const calculateVisibleItems = () => {
      const selectedOptions = allSelectedOptions.value;
      if (selectedOptions.length === 0) {
        visibleItemsCount.value = 0;
        return;
      }

      if (!inputContainerRef.value) {
        visibleItemsCount.value = selectedOptions.length;
        return;
      }

      const inputElement = inputContainerRef.value.querySelector(
        '.oxd-select-text-input',
      ) as HTMLElement;
      if (!inputElement) {
        visibleItemsCount.value = selectedOptions.length;
        return;
      }

      const inputRect = inputElement.getBoundingClientRect();
      const inputStyles = window.getComputedStyle(inputElement);
      const paddingLeft = parseFloat(inputStyles.paddingLeft) || 0;
      const paddingRight = parseFloat(inputStyles.paddingRight) || 0;
      const availableWidth = inputRect.width - (paddingLeft + paddingRight);
      const fontString = `${inputStyles.fontWeight || 'normal'} ${inputStyles.fontSize || '12px'} ${inputStyles.fontFamily || 'sans-serif'}`;

      const optionLabels = selectedOptions.map(opt => opt.label);
      visibleItemsCount.value = getVisibleCountMemoized(
        optionLabels,
        availableWidth,
        fontString,
      );
    };

    const visibleSelectedOptions = computed(() => {
      return allSelectedOptions.value.slice(0, visibleItemsCount.value);
    });

    const remainingCount = computed(() => {
      return Math.max(0, allSelectedOptions.value.length - visibleItemsCount.value);
    });

    const displayValue = computed(() => {
      if (props.allSelectedText && isAllSelected.value) {
        return $t(props.allSelectedText);
      }
      
      const visible = visibleSelectedOptions.value;
      if (visible.length === 0) {
        return '';
      }
      
      return visible.map(option => option.label).join(', ');
    });

    const keyUpEnterOnCheckbox = ($e: KeyboardEvent, option: Option) => {
      $e.stopPropagation();
      selectOptionOnlabelClick(option);
    };

    const onBlur = () => {
      emit('dropdown:blur');
    };

    const tabIndex = () => {
      return props.disabled ? -1 : 0;
    };

    const onCloseDropdown = ($e: KeyboardEvent | null) => {
      if (props.disabled || props.readonly || !dropdownOpen.value) return;
      if ($e && $e.key === 'Escape' && dropdownOpen.value) $e.stopPropagation();
      dropdownOpen.value = false;
      removeExpandedOptionsFromOptionsArrayOnDropdownClose();
      emit('dropdown:closed');
    };

    const closeDropdownOnOutsideClick = () => {
      onCloseDropdown(null);
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

    const init = () => {
      selectedIdsObject.value = {};
      expandedIdsObject.value = {};
      optionsArr.value = [];
      dropdownOpen.value = false;
      isAllSelected.value = false;
      spreadOptions();
      levelizeOptions(optionsArr.value, 1, []);
      selectPreSelectedOptions();
    };
    init();

    const recalculateVisible = () => {
      nextTick(() => {
        calculateVisibleItems();
      });
    };

    watch(
      () => props.options,
      () => {
        init();
        recalculateVisible();
      },
    );

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue == null) {
          //when clicked reset in schema form
          init();
          recalculateVisible();
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      [selectedIdsComputed],
      () => {
        recalculateVisible();
      },
    );

    watch(
      () => inputContainerRef.value,
      (newVal) => {
        if (newVal && selectedIdsComputed.value.length > 0) {
          recalculateVisible();
        }
      },
    );

    return {
      optionsArr,
      selectedIdsComputed,
      dropdownOpen,
      dropdownClasses,
      isAllSelected,
      expandedIdsObject,
      selectedIdsLengthComputed,
      displayValue,
      inputContainerRef,
      remainingCount,
      getOptionLabelStyle,
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
      keyUpEnterOnCheckbox,
    };
  },
});
</script>

<style src="./tree-select-input.scss" lang="scss" scoped></style>
