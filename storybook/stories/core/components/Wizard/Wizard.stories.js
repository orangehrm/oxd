import Wizard from '@orangehrm/oxd/core/components/Wizard/Wizard.vue';
import {ref} from 'vue';

export default {
  title: 'Layout/Wizard',
  component: Wizard,
  argTypes: {
    tabs: {
      control: {type: 'array'},
      table: {
        type: {
          summary:
            'Array of WizardTab objects with id, title, disabled, iconName, completed, and clickable properties',
        },
      },
    },
    modelValue: {
      control: {type: 'number'},
      description: 'Currently active tab ID',
    },
    showCompletedIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show completed icon for completed steps',
    },
    completedIconName: {
      control: {type: 'text'},
      description: 'Icon name to show for completed steps',
    },
  },
};

const Template = (args) => ({
  setup() {
    const currentStep = ref(args.modelValue);
    const handleUpdate = (value) => {
      currentStep.value = value;
    };
    return {
      args,
      currentStep,
      handleUpdate,
    };
  },
  components: {'oxd-wizard': Wizard},
  template:
    '<div style="margin: 2rem 0 4rem 0"><oxd-wizard v-bind="args" v-model="currentStep" @update:modelValue="handleUpdate" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {id: 1, title: 'Personal Details'},
    {id: 2, title: 'Job Details'},
    {id: 3, title: 'Salary Details'},
  ],
  modelValue: 1,
};

export const WithCustomIcons = Template.bind({});
WithCustomIcons.args = {
  tabs: [
    {
      id: 1,
      title: 'Personal Details',
      iconName: 'oxd-employee-autocomplete',
    },
    {
      id: 2,
      title: 'Job Details',
      iconName: 'oxd-masterdata',
    },
    {
      id: 3,
      title: 'Salary Details',
      iconName: 'oxd-detailed-report',
    },
  ],
  modelValue: 1,
};

export const WithDisabledSteps = Template.bind({});
WithDisabledSteps.args = {
  tabs: [
    {id: 1, title: 'Personal Details'},
    {id: 2, title: 'Job Details', disabled: true, clickable: false},
    {id: 3, title: 'Salary Details', disabled: true, clickable: false},
  ],
  modelValue: 1,
};

export const WithCompletedSteps = Template.bind({});
WithCompletedSteps.args = {
  tabs: [
    {
      id: 1,
      title: 'Personal Details',
      completed: true,
    },
    {
      id: 2,
      title: 'Job Details',
      completed: true,
    },
    {id: 3, title: 'Salary Details'},
  ],
  modelValue: 3,
  showCompletedIcon: true,
};

export const WithNonClickableSteps = Template.bind({});
WithNonClickableSteps.args = {
  tabs: [
    {id: 1, title: 'Personal Details'},
    {id: 2, title: 'Job Details', clickable: false},
    {id: 3, title: 'Salary Details'},
  ],
  modelValue: 1,
};

const NavigationTemplate = (args) => ({
  setup() {
    const currentStep = ref(args.modelValue);
    const handleUpdate = (value) => {
      currentStep.value = value;
    };
    const handleNext = () => {
      if (currentStep.value < args.tabs.length) {
        currentStep.value++;
      }
    };
    const handlePrevious = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };
    return {
      args,
      currentStep,
      handleUpdate,
      handleNext,
      handlePrevious,
    };
  },
  components: {'oxd-wizard': Wizard},
  template: `
    <div style="margin: 2rem 0 4rem 0">
      <oxd-wizard v-bind="args" v-model="currentStep" @update:modelValue="handleUpdate" />
      <div style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center;">
        <button @click="handlePrevious" :disabled="currentStep === 1">Previous</button>
        <button @click="handleNext" :disabled="currentStep === args.tabs.length">Next</button>
      </div>
    </div>
  `,
});

export const NonClickableWithNavigationButtons = NavigationTemplate.bind({});
NonClickableWithNavigationButtons.args = {
  tabs: [
    {id: 1, title: 'Personal Details', clickable: false},
    {id: 2, title: 'Job Details', clickable: false},
    {id: 3, title: 'Salary Details', clickable: false},
  ],
  modelValue: 1,
};

export const WithCustomCompletedIcon = Template.bind({});
WithCustomCompletedIcon.args = {
  tabs: [
    {
      id: 1,
      title: 'Personal Details',
      completed: true,
    },
    {
      id: 2,
      title: 'Job Details',
      completed: true,
    },
    {id: 3, title: 'Salary Details'},
  ],
  modelValue: 3,
  showCompletedIcon: true,
  completedIconName: 'oxd-status',
};

const EventsTemplate = (args) => ({
  setup() {
    const currentStep = ref(args.modelValue);
    const lastEvent = ref('');
    const lastEventData = ref(null);

    const handleTabClick = (event) => {
      lastEvent.value = 'tab-click';
      lastEventData.value = event;
    };
    const handleTabFocus = (event) => {
      lastEvent.value = 'tab-focus';
      lastEventData.value = event;
    };
    const handleTabBlur = (event) => {
      lastEvent.value = 'tab-blur';
      lastEventData.value = event;
    };
    const handleUpdate = (value) => {
      currentStep.value = value;
      lastEvent.value = 'update:modelValue';
      lastEventData.value = {newValue: value};
    };

    return {
      args,
      currentStep,
      lastEvent,
      lastEventData,
      handleTabClick,
      handleTabFocus,
      handleTabBlur,
      handleUpdate,
    };
  },
  components: {'oxd-wizard': Wizard},
  template: `
    <div style="margin: 2rem 0 4rem 0">
      <oxd-wizard 
        v-bind="args"
        v-model="currentStep"
        @update:modelValue="handleUpdate"
        @tab-click="handleTabClick"
        @tab-focus="handleTabFocus"
        @tab-blur="handleTabBlur"
      />
      <div style="margin-top: 2rem">
        <p>Current Step: {{ currentStep }}</p>
        <p>Event: {{ lastEvent }}</p>
        <p>Event Data: {{ JSON.stringify(lastEventData, null, 2) }}</p>
      </div>
    </div>
  `,
});

export const Events = EventsTemplate.bind({});
Events.args = {
  tabs: [
    {id: 1, title: 'Personal Details'},
    {id: 2, title: 'Job Details'},
    {id: 3, title: 'Salary Details'},
  ],
  modelValue: 1,
};
