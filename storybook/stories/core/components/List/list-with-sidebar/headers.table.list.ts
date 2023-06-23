const headers = [
  {
    name: 'profilePic',
    slot: 'footer',
    title: '',
    style: {
      width: '55px',
      'justify-content': 'center',
    },
    cellType: 'oxd-table-cell-profile-pic',
    iconName: 'oxd-profile-pic',
    iconStyle: 'color: #929baa; justify-content: center;',
    cellProps: {
      link: 'profileUrl',
      target: '_blank',
    },
  },
  {
    name: 'candidate',
    sortField: 'candidate',
    initialSortOrder: 'DEFAULT',
    title: 'Candidate',
    style: {
      flex: '10%',
      'padding-left': '1rem',
      'margin-right': '0',
    },
    cellType: 'oxd-table-cell-link-with-pill',
    cellProps: {
      link: 'profileUrl',
      target: '_blank',
      pillProperty: ['vacancy', 'vacancyName'],
    },
  },
  {
    name: 'email',
    sortField: 'email',
    initialSortOrder: 'DEFAULT',
    title: 'Email',
    cellType: 'oxd-table-cell-link-with-pill',
    cellProps: {
      pillProperty: ['emailType'],
      pillInline: true,
    },
    style: {
      flex: '5%',
      'min-width': '90px',
      'margin-right': '0',
    },
  },
  {
    name: 'contactNumber',
    sortField: 'contactNumber',
    initialSortOrder: 'DEFAULT',
    title: 'Contact Number',
    style: {
      flex: '5%',
      'min-width': '90px',
      'margin-right': '0',
    },
  },
  {
    name: 'dateOfApplication',
    sortField: 'dateOfApplication',
    initialSortOrder: 'DESC',
    html: 'Date Applied<br>GMT +5.5',
    style: {
      flex: '5%',
      'min-width': '90px',
      'margin-right': '0',
    },
    cellType: 'oxd-table-cell-date',
    cellProps: {},
  },
  {
    name: 'action',
    sortField: 'stage',
    initialSortOrder: 'DEFAULT',
    sortIcons: {
      asc: 'oxd-sort-asc-arrow',
      desc: 'oxd-sort-desc-arrow',
    },
    slot: 'footer',
    title: 'Stage',
    style: {
      flex: '185px',
      'margin-right': '0',
    },
    cellType: 'oxd-table-cell-actions',
    cellRenderer: 'actionsRenderer',
  },
];

export default headers;
