import ListTableStory from './ListTable.story.vue';
import ListSkeletonStory from './ListSkeleton.story.vue';

export default {
  title: 'Data Tables/List Table',
  argTypes: {
    clickable: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'Whether or not to row is clickable, if not clickable event will not fire',
        },
      },
    },
    selectable: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Allows selecting table rows with checkboxes',
        },
      },
    },
    disabled: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Disable all table rows from selection',
        },
      },
    },
    loading: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Sets the loading state of table',
        },
      },
    },
    skeleton: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Shows skeleton while table is loading',
        },
      },
    },
    skeletonCount: {
      control: {type: 'number'},
      defaultValue: 10,
      table: {
        type: {
          summary: 'Number of skeleton rows to be shown while table is loading',
        },
      },
    },
    flashing: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'If true, after the initial data load with every change done to table rows will be highlighted',
        },
      },
    },
    flashRows: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary: 'Array of indexes of row to be highlighted',
        },
      },
    },
    tableId: {
      control: {type: 'string'},
      table: {
        type: {
          summary: 'Unique id of table, generated automatically by default',
        },
      },
    },
    headers: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Array of table headers to be displayed. Objects containing header title, row key and other data is accepted',
        },
      },
    },
    items: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Array of table rows to be displayed. Key value pairs corresponding to table headers will be accepted',
        },
      },
    },
    selected: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Array of table rows currently selected. table row index only. v-model accepted',
        },
      },
    },
    order: {
      control: {type: 'object'},
      defaultValue: {},
      table: {
        type: {
          summary: 'Object containing sort definition. v-model accepted',
        },
      },
    },
    partialLoading: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'If true and skeleton prop is also true, the table will display 3 skeleton rows to indicate partial loading.',
        },
      },
    },
  },
};

export const Default = () => ListTableStory;
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <oxd-list-table
    :flashing="true"
    :selectable="true"
    :headers="headers"
    :loading="isLoading"
    :items="sortedItems"
    v-model:order="order"
    v-model:selected="checkedItems"
  ></oxd-list-table>
  <br />
  <oxd-button label="Add Item" @click="onClickAdd"></oxd-button>
</template>

<script>
import Button from '@orangehrm/oxd/core/components/Button/Button';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable';
import TableSelectInput from '@orangehrm/oxd/core/components/CardTable/Cell/TableSelectInput';

export default {
  components: {
    'oxd-button': Button,
    'oxd-list-table': ListTable,
  },

  data() {
    return {
      selector: {
        style: {flex: 1},
      },
      headers: [
        {
          name: 'col1',
          sortField: 'col1.name',
          title: 'Column 1',
          style: {flex: 1},
        },
        {
          name: 'col2',
          title: 'Column 2',
          style: {flex: 1},
        },
        {
          name: 'action',
          title: 'Action',
          style: {flex: 1},
          cellRenderer: this.actionsRenderer,
        },
      ],
      items: [],
      checkedItems: [],
      isLoading: false,
      order: {
        'col1.name': {
          order: 'ASC',
          iconAsc: '',
          iconDesc: '',
        },
      },
    };
  },

  methods: {
    onClickAdd() {
      const length = this.items.length + 1;
      this.items.push({
        col1: 'Data' + length,
        col2: 'Data' + length,
        type: null,
      });
    },
    actionsRenderer(index, data, header, row) {
      return {
        component: TableSelectInput,
        props: {
          options: [
            {
              id: 1,
              label: 'HR Admin',
            },
            {
              id: 2,
              label: 'ESS User',
            },
          ],
          modelValue: row.type,
          'onUpdate:modelValue': ($event) => {
            this.items[index].type = $event;
          },
        },
      };
    },
  },

  beforeMount() {
    this.isLoading = true;
    // simulate async data fetch
    setTimeout(() => {
      this.items = [
        {col1: 'Data 1', col2: 'Data 1', type: null},
        {col1: 'Data 2', col2: 'Data 2', type: null},
        {col1: 'Data 3', col2: 'Data 3', type: null},
      ];
      this.isLoading = false;
    }, 2000);
  },
};
</script>
    `,
    },
  },
};

export const Skeleton = () => ListSkeletonStory;
Skeleton.parameters = {
  docs: {
    source: {
      code: `
<template>
  <div style="display: flex; gap: 10px">
    <oxd-switch-input v-model="showSkeleton" optionLabel="Toggle Skeleton" />
    <oxd-switch-input v-model="isLoading" optionLabel="Toggle Loading" />
  </div>
  <br />
  <oxd-list-table
    :items="items"
    :flashing="true"
    :selectable="true"
    :headers="headers"
    :loading="isLoading"
    :skeleton="showSkeleton"
    v-model:selected="checkedItems"
  ></oxd-list-table>
</template>

<script>
import Button from '@orangehrm/oxd/core/components/Button/Button';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput';
import TableSelectInput from '@orangehrm/oxd/core/components/CardTable/Cell/TableSelectInput';

export default {
  components: {
    'oxd-button': Button,
    'oxd-list-table': ListTable,
    'oxd-switch-input': SwitchInput,
  },

  data() {
    return {
      selector: {
        style: {flex: 1},
      },
      headers: [
        {
          name: 'profilePic',
          style: {
            width: '55px',
            'justify-content': 'center',
          },
          iconName: 'oxd-profile-pic',
          iconStyle: 'color: #929baa; justify-content: center;',
          cellType: 'oxd-table-cell-profile-pic',
        },
        {
          name: 'col1',
          sortField: 'col1.name',
          title: 'Default',
          style: {width: '100px'},
        },
        {
          name: 'col3',
          title: 'Link',
          style: {flex: 1},
          cellType: 'oxd-table-cell-link',
          cellProps: {
            link: 'url1',
            target: '_blank',
          },
        },
        {
          name: 'col2',
          title: 'Link with Pill',
          style: {flex: 1},
          cellType: 'oxd-table-cell-link-with-pill',
          cellProps: {
            link: 'url1',
            target: '_blank',
            pillProperty: ['tag', 'name'],
          },
        },
        {
          name: 'col4',
          title: 'Date',
          cellType: 'oxd-table-cell-date',
          style: {flex: 1},
          cellProps: {
            displayFormat: 'Y/m/d',
          },
        },
        {
          name: 'action',
          title: 'Action',
          style: {flex: 1},
          cellRenderer: this.actionsRenderer,
        },
      ],
      items: [],
      checkedItems: [],
      isLoading: false,
      showSkeleton: true,
    };
  },
};
</script>
    `,
    },
  },
};
