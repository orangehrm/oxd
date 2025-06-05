<template>
  <oxd-skeleton
    v-if="isLoading"
    circle
    animate
    width="2.8rem"
    height="2.8rem"
  ></oxd-skeleton>
  <div v-else class="profile-wrapper">
    <oxd-profile-pic
      :size="profilePicture.size"
      :link="profilePicture.link"
      :imageSrc="profilePicture.src"
      :link-mode="profilePicture.target"
      :link-handler="handleLinkClick"
      v-bind="$attrs"
    />
    <div v-if="secondaryIconName" class="secondary-icon-indicators">
      <oxd-icon-button
        class="secondary-icon"
        :name="secondaryIconName"
        size="small"
        :flow="tooltipFlowDirection"
        :tooltip="secondaryIconToolTip ? $vt(secondaryIconToolTip) : undefined"
        :style="{
          backgroundColor: secondaryIconBackgroundColor,
          color: secondaryIconColor,
        }"
        @click="onClickHandleSecondaryButton"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {SIZE_SMALL} from '../../ProfilePic/types';
import {cellMixin} from './cell-mixin';
import {TargetTypes, TARGET_SELF, TARGETS} from './types';
import {defineComponent, computed, ref, watchEffect} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';

export default defineComponent({
  name: 'oxd-table-cell-profile-pic',
  inheritAttrs: false,
  mixins: [cellMixin, translateMixin],
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-profile-pic': ProfilePic,
    'oxd-icon-button': IconButton,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    link: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
      validator: (value: TargetTypes) => {
        return TARGETS.indexOf(value) !== -1;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    header: {
      type: Object,
      default: () => ({}),
    },
    rowItem: {
      type: Object,
      default: () => ({}),
    },
    secondaryIconToolTip: {
      type: String,
      default: '',
    },
    secondaryIconName: {
      type: String,
      default: '',
    },
    secondaryIconBackgroundColor: {
      type: String,
      default: '#e6eaf3',
    },
    secondaryIconColor: {
      type: String,
      default: '#4d4d4d',
    },
    tooltipFlowDirection: {
      type: String,
      default: 'top',
    },
  },
  setup(props) {
    const imgSrc = ref(null);
    const imgLoading = ref(false);

    const loadImage = (url: string): Promise<string | null> => {
      if (!url || !props.loading) return Promise.resolve(url);

      imgLoading.value = true;
      return new Promise(_resolve => {
        const resolve = (value: string | null) => {
          imgLoading.value = false;
          _resolve(value);
        };
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    };

    const profilePicture = computed(() => {
      return {
        src: imgSrc.value,
        size: props.size ?? SIZE_SMALL,
        link:
          props.link && props.rowItem[props.link]
            ? props.rowItem[props.link]
            : null,
        target: props.target ?? TARGET_SELF,
      };
    });

    const isLoading = computed(() => props.loading || imgLoading.value);

    const handleLinkClick = (event: MouseEvent) => {
      const cellConfig = props.header?.cellConfig;
      if (cellConfig && typeof cellConfig?.onClick === 'function') {
        event.preventDefault();
        props.header?.cellConfig.onClick(props.rowItem, event);
      }
    };

    const onClickHandleSecondaryButton = (event: MouseEvent) => {
      const cellConfig = props.header?.cellConfig;
      if (
        cellConfig &&
        typeof cellConfig?.onClickSecondaryButton === 'function'
      ) {
        event.preventDefault();
        cellConfig.onClickSecondaryButton(props.rowItem, event);
      }
    };

    watchEffect(async () => {
      imgSrc.value = await loadImage(props.item as string);
    });

    return {
      isLoading,
      profilePicture,
      handleLinkClick,
      onClickHandleSecondaryButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-wrapper {
  position: relative;
  display: inline-block;
}

.secondary-icon-indicators {
  position: absolute;
  top: 25px;
  right: -8px;
  display: flex;
  gap: 4px;
  z-index: 1;

  .secondary-icon {
    min-height: inherit;
    min-width: inherit;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    ::v-deep(.oxd-icon) {
      color: white !important;
      font-size: 12px;
    }
  }
}
</style>
