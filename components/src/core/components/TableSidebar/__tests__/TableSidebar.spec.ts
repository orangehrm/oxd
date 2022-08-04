import {mount, shallowMount} from '@vue/test-utils';
import TableSidebar from '@orangehrm/oxd/core/components/TableSidebar/TableSidebar.vue';

describe('TableSidebar.vue', () => {
  it('renders header action button with default iconSize of medium', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        headerActionButtonVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
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
    expect(
      wrapper.findComponent('.table-header-action-btn').attributes('iconsize'),
    ).toBe('medium');
  });

  it('renders header action button with specified iconSize', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        headerActionButtonVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
          },
        ],
        width: '230px',
        button: {
          props: {
            label: 'New Candidate',
            displayType: 'secondary',
            size: 'long',
            iconSize: 'large',
            'display-type': 'label-info',
            'icon-name': 'plus',
          },
        },
      },
    });
    expect(
      wrapper.findComponent('.table-header-action-btn').attributes('iconsize'),
    ).toBe('large');
  });
});

describe('TableSidebar.vue with oxd-icon on left', () => {
  it('renders OXD TableSidebar with icon on left', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

  it('renders OXD TableSidebar  with icon on left without header', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: false,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

  it('renders OXD TableSidebar with icon on left without body', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: false,
        listVisible: true,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

  it('renders OXD TableSidebar  with icon on left without list', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: false,
        selectedListItemId: '1',
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

  it('renders OXD TableSidebar with icon on left with different item selected', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

  it('renders OXD TableSidebar with icon on left with empty list', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        sidePanelList: [],
        sidePanelIconVisible: true,
        bubbleVisible: false,
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

describe('TableSidebar.vue with oxd-chip on left', () => {
  it('renders OXD TableSidebar with chip on left', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        bubbleVisible: true,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
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

  it('renders OXD TableSidebar  with chip on left without header', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: false,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '1',
        bubbleVisible: true,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
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

  it('renders OXD TableSidebar with chip on left without body', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: false,
        listVisible: true,
        selectedListItemId: '1',
        bubbleVisible: true,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
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

  it('renders OXD TableSidebar  with chip on left without list', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: false,
        selectedListItemId: '1',
        bubbleVisible: true,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
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

  it('renders OXD TableSidebar with chip on left with different item selected', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,

        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        bubbleVisible: true,
        sidePanelList: [
          {
            id: -1,
            label: 'All Candidates',
            iconName: 'oxd-standard-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 1,
            label: 'Application Received',
            iconName: 'oxd-all-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
          },
          {
            id: 2,
            label: 'Phone Screening',
            iconName: 'oxd-my-reports',
            style: {
              backgroundColor: '#f9e3e9',
              color: '#e74432',
            },
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

  it('renders OXD TableSidebar with chip on left with empty list', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        selectedListItemId: '2',
        sidePanelList: [],
        bubbleVisible: true,
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
  it('renders OXD TableSidebar with secondary header button', () => {
    const wrapper = shallowMount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        headerActionButtonVisible: true,
        selectedListItemId: '2',
        sidePanelList: [],
        bubbleVisible: true,
        width: '230px',
        button: {
          props: {
            label: 'New Report',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'oxd-add',
          },
        },
        secondaryButton: {
          props: {
            label: 'New Folder',
            icon: 'oxd-new-folder',
            size: 'extra-large',
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should emit OXD secondary button click', () => {
    const wrapper = mount(TableSidebar, {
      props: {
        headerVisible: true,
        bodyVisible: true,
        listVisible: true,
        headerActionButtonVisible: true,
        selectedListItemId: '2',
        sidePanelList: [],
        bubbleVisible: true,
        width: '230px',
        button: {
          props: {
            label: 'New Report',
            displayType: 'secondary',
            size: 'long',
            'display-type': 'label-info',
            'icon-name': 'oxd-add',
          },
        },
        secondaryButton: {
          props: {
            label: 'New Folder',
            icon: 'oxd-new-folder',
            size: 'extra-large',
          },
        },
      },
    });
    wrapper
      .findComponent(TableSidebar)
      .find('.table-header-action-secondary-btn')
      .trigger('click');
    expect(
      wrapper.emitted('sidePanelList:onHeaderSecondaryBtnClick'),
    ).toBeTruthy();
  });
});
