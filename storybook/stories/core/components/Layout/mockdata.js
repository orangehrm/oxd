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
    icon: 'admin',
    active: false,
  },
  {
    name: 'PIM',
    url: '#',
    icon: 'pim',
    active: true,
  },
  {
    name: 'Leave',
    url: '#',
    icon: 'leave',
    active: false,
  },
  {
    name: 'Time',
    url: '#',
    icon: 'time',
    active: false,
  },
  {
    name: 'Recruitment',
    url: '#',
    icon: 'recruitment',
    active: false,
  },
  {
    name: 'My Info',
    url: '#',
    icon: 'myinfo',
    active: false,
  },
  {
    name: 'Performance',
    url: '#',
    icon: 'performance',
    active: false,
  },
  {
    name: 'Dashboard',
    url: '#',
    icon: 'dashboard',
    active: false,
  },
  {
    name: 'Directory',
    url: '#',
    icon: 'directory',
    active: false,
  },
  {
    name: 'Maintenance',
    url: '#',
    icon: 'maintenance',
    active: false,
  },
  {
    name: 'Buzz',
    url: '#',
    icon: 'buzz',
    active: false,
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
