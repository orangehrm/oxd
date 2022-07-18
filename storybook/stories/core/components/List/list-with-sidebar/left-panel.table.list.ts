const leftPanel = {
  visible: true,
  header: {
    visible: true,
    button: {
      props: {
        label: 'Add Candidate',
        displayType: 'secondary',
        size: 'long',
        iconName: 'plus',
        iconSize: 'small',
      },
      events: [
        {
          type: 'click',
          identifier: 'get-add-candidates-modal',
        },
      ],
    },
    secondaryButton: {
      props: {
        icon: 'oxd-info',
        size: 'xx-small',
        label: 'Info',
        style: {color: 'blue'},
      },
    },
  },
  body: {
    visible: true,
    button: {
      label: 'All Vacancies',
      labelMini: 'Vacancy',
      iconName: 'eye',
      iconSize: 'large',
      iconStyle: 'height: 20px; display: flex; align-items: center;',
      displayType: 'label',
      doubleLineLabel: true,
      style: {
        'background-color': '#ebfcd6',
        'justify-content': 'space-between',
      },
    },
    dropdown: {
      style: {
        width: '200px',
      },
    },
  },
  list: {
    visible: true,
    bubble: {
      visible: true,
    },
  },
};

export default leftPanel;
