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
  <br />
  <p>{{ LinkPhillResult }}</p>
  <br/>
  <p>{{ profilePicResult }}</p>
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
      LinkPhillResult: '',
      profilePicResult: '',
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
          name: 'profilePic',
          style: {
            width: '55px',
            'justify-content': 'center',
          },
          iconName: 'oxd-profile-pic',
          iconStyle: 'color: #929baa; justify-content: center;',
          cellType: 'oxd-table-cell-profile-pic',
          cellProps: {
            link: "url1",
            target: "_blank",
          },
          cellConfig: {
            onClick: this.onClickProfilePic,
          },
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
          name: 'col2',
          title: 'Link with Pill with onClick event',
          style: {flex: 1},
          cellType: 'oxd-table-cell-link-with-pill',
          cellProps: {
            link: 'url1',
            target: '_blank',
            pillProperty: ['tag', 'name'],
          },
          cellConfig: {
            onClick: this.onClickLinkWithPill,
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

  methods: {
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
    onClickLinkWithPill(row, event) {
      this.LinkPhillResult = 'Link with Pill with onClick function executed: ' + row.col2;
    },
    onClickProfilePic(row, event) {
      this.profilePicResult = 'Profile Pic with onClick function executed: ' + row.col2;
    },
  },

  beforeMount() {
    this.isLoading = true;
    // simulate async data fetch
    setTimeout(() => {
      this.items = [
        {
          col1: 'Data 1',
          col2: 'Data 1',
          col3: 'https://github.com/orangehrm',
          col4: '2022-10-01',
          url1: 'https://orangehrm.com',
          tag: {
            name: 'external',
            type: 'http',
          },
          type: null,
        },
        {
          col1: 'Data 2',
          col2: 'Data 2',
          col3: 'https://github.com/orangehrm/oxd',
          col4: '1995-01-01',
          url1: 'https://orangehrm.com',
          tag: {
            name: 'external',
            type: 'http',
          },
          type: null,
        },
        {
          col1: 'Data 3',
          col2: 'Data 3',
          col3: null,
          col4: '',
          url1: 'https://orangehrm.com',
          tag: {
            name: 'external',
            type: 'http',
          },
          type: null,
        },
      ];
      this.isLoading = false;
    }, 2000);
  },
};
</script>
