import {shallowMount} from '@vue/test-utils';
import TableSidebarWithIcons from '@orangehrm/oxd/core/components/TableSidebarWithIcons/TableSidebarWithIcons.vue';

describe('TableSidebarWithIcons.vue', () => {
  it('renders OXD TableSidebarWithIcons', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD TableSidebarWithIcons without header', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: false,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD TableSidebarWithIcons without body', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: true,
        bodyVisible: false,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD TableSidebarWithIcons without list', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: false,
        selectedListItemId: '1',
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD TableSidebarWithIcons with diffeent item selected', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD TableSidebarWithIcons with empty list', () => {
    const wrapper = shallowMount(TableSidebarWithIcons, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        sidePanelList: [],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
