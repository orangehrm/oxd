import DefaultStory from './Default.story.vue';
import ListTopTabsStory from './ListTopTabs.story.vue';
import ListTopTitleStory from './ListTopTitle.story.vue';
import NoSidepanelStory from './NoSidepanel.story.vue';
import ListSkeletonStory from './ListSkeleton.story.vue';

export default {
  title: 'Data Tables/List v2',
  argTypes: {
    showCollapse: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary:
            'Whether or not to show sidepanel collapse button. false if sidepanel slot empty',
        },
      },
    },
    flatTop: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary:
            'Removes top padding from list, allows to connect other component on top like tabs',
        },
      },
    },
    loading: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary: 'Sets loading state of list for skeleton loading',
        },
      },
    },
  },
};

export const Default = () => DefaultStory;
Default.parameters = {
  docs: {
    source: {
      code: `
<oxd-list>
  <template #sidepanel="{collapsed}">
    <div class="placeholder sidepanel">
      <oxd-text tag="p" class="placeholder-text">
        Slot for sidepanel
      </oxd-text>
    </div>
  </template>
  <template #contentHeaderLeft>
    <div class="placeholder slotheaderleft">
      <oxd-text tag="p" class="placeholder-text">
        Slot for header left
      </oxd-text>
    </div>
  </template>
  <template #contentHeaderRight>
    <div class="placeholder slotheaderright">
      <oxd-text tag="p" class="placeholder-text">
        Slot for header right
      </oxd-text>
    </div>
  </template>
  <template #contentBody>
    <div class="placeholder slotbody">
      <oxd-text tag="p" class="placeholder-text"> Slot for body </oxd-text>
    </div>
  </template>
  <template #contentFooter>
    <div class="placeholder slotfooter">
      <oxd-text tag="p" class="placeholder-text">
        Slot for footer
      </oxd-text>
    </div>
  </template>
</oxd-list>
    `,
    },
  },
};

export const ListTopTabs = () => ListTopTabsStory;
ListTopTabs.parameters = {
  docs: {
    source: {
      code: `
<div class="bg-wrapper">
  <oxd-list-tabs :tabs="tabs" v-model="tab" />
  <oxd-list :flatTop="true" v-if="tab === 'goal'">
  </oxd-list>
  <oxd-list :flatTop="true" v-if="tab === 'okrs'">
  </oxd-list>
</div>
    `,
    },
  },
};

export const ListTopTitle = () => ListTopTitleStory;
ListTopTitle.parameters = {
  docs: {
    source: {
      code: `
<div class="bg-wrapper">
  <oxd-list-title
    title="Work Schedules"
    mainButtonLabel="Add Work Schedule"
  ></oxd-list-title>
  <oxd-list :flatTop="true"></oxd-list>
</div>
    `,
    },
  },
};

export const NoSidepanel = () => NoSidepanelStory;
NoSidepanel.parameters = {
  docs: {
    source: {
      code: `
<oxd-list>
  <template #contentHeaderLeft>
    <div class="placeholder slotheaderleft">
      <oxd-text tag="p" class="placeholder-text">
        Slot for header left
      </oxd-text>
    </div>
  </template>
  <template #contentHeaderRight>
    <div class="placeholder slotheaderright">
      <oxd-text tag="p" class="placeholder-text">
        Slot for header right
      </oxd-text>
    </div>
  </template>
  <template #contentBody>
    <div class="placeholder slotbody">
      <oxd-text tag="p" class="placeholder-text"> Slot for body </oxd-text>
    </div>
  </template>
</oxd-list>
    `,
    },
  },
};

export const SkeletonLoader = () => ListSkeletonStory;
SkeletonLoader.parameters = {
  docs: {
    source: {
      code: `
<oxd-list :loading="isLoading">
  <template #sidepanel="{collapsed}">
    <oxd-status-tab-panel
      :loading="isLoading"
      :collapsed="collapsed"
      :filters="sidepanelFilters"
    >
    </oxd-status-tab-panel>
  </template>
  <template #contentHeaderLeft>
    <oxd-skeleton height="28px" width="220px" animate></oxd-skeleton>
  </template>
  <template #contentBody>
    <oxd-list-table
      :items="items"
      :skeleton="true"
      :flashing="true"
      :selectable="true"
      :headers="headers"
      :loading="isLoading"
      v-model:selected="checkedItems"
    ></oxd-list-table>
  </template>
</oxd-list>
    `,
    },
  },
};
