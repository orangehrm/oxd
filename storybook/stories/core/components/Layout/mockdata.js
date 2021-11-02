const topMenuItems = [
  {
    id: 2,
    name: 'User Management',
    url: '#',
    children: [
      {
        id: 81,
        name: 'Users',
        url: '#',
      },
    ],
  },
  {
    id: 6,
    name: 'Job',
    url: '#',
    children: [
      {
        id: 7,
        name: 'Job Titles',
        url: '#',
      },
      {
        id: 8,
        name: 'Pay Grades',
        url: '#',
      },
      {
        id: 9,
        name: 'Employment Status',
        url: '#',
      },
      {
        id: 10,
        name: 'Job Categories',
        url: '#',
      },
    ],
  },
  {
    id: 12,
    name: 'Organization',
    url: '#',
    children: [
      {
        id: 13,
        name: 'General Information',
        url: '#',
      },
      {
        id: 14,
        name: 'Locations',
        url: '#',
      },
      {
        id: 15,
        name: 'Structure',
        url: '#',
      },
    ],
  },
  {
    id: 16,
    name: 'Qualifications',
    url: '#',
    children: [
      {
        id: 17,
        name: 'Skills',
        url: '#',
      },
      {
        id: 18,
        name: 'Education',
        url: '#',
      },
      {
        id: 19,
        name: 'Licenses',
        url: '#',
      },
      {
        id: 20,
        name: 'Languages',
        url: '#',
      },
      {
        id: 21,
        name: 'Memberships',
        url: '#',
      },
    ],
  },
  {
    id: 22,
    name: 'Nationalities',
    url: '#',
    children: [],
  },
  {
    id: 23,
    name: 'Configuration',
    url: '#',
    active: true,
    children: [
      {
        id: 24,
        name: 'Email Configuration',
        url: '#',
      },
      {
        id: 28,
        name: 'Modules',
        url: '#',
        active: true,
      },
      {
        id: 95,
        name: 'Register OAuth Client',
        url: '#',
      },
    ],
  },
];

const sidePanelItems = [
  {
    name: 'Admin',
    url: '#',
    icon: 'icon-admin',
    active: false,
  },
  {
    name: 'PIM',
    url: '#',
    icon: 'icon-pim',
    active: false,
  },
  {
    name: 'Leave',
    url: '#',
    icon: 'icon-leave',
    active: false,
  },
  {
    name: 'Time',
    url: '#',
    icon: 'icon-time',
    active: false,
  },
  {
    name: 'Recruitment',
    url: '#',
    icon: 'icon-recruitment',
    active: false,
  },
  {
    name: 'Attendance',
    url: '#',
    icon: 'icon-pim',
    active: true,
  },
];

const headers = [
  {
    name: 'Leave Type',
    prop: 'type',
    pin: 'colPinStart',
  },
  {
    name: 'Balance In Days',
    children: [
      {
        name: 'Leave Entitlement (Days)',
        prop: 'entitlement',
        cellProperties: () => {
          return {
            class: {
              'col-alt': true,
              'cell-action': true,
            },
          };
        },
      },
      {
        name: 'Leave Pending Approval (Days)',
        prop: 'pending',
      },
      {
        name: 'Leave Scheduled (Days)',
        prop: 'scheduled',
      },
      {
        name: 'Leave Taken (Days)',
        prop: 'taken',
      },
      {
        name: 'Leave Balance (Days)',
        prop: 'balance',
        cellProperties: () => {
          return {
            class: {
              'col-alt': true,
            },
          };
        },
      },
    ],
  },
];

const breadcrumb = {
  moduleName: 'Admin',
  level: 'Configuration',
};

export {topMenuItems, sidePanelItems, headers, breadcrumb};
