const leftPanel = {
  visible: true,
  header: {
    visible: true,
    button: {
      props: {
        label: "Add Candidate",
        displayType: "secondary",
        size: "long",
        iconName: "oxd-add",
        iconSize: "xx-small",
      },
      events: [
        {
          type: "click",
          identifier: "get-add-candidates-modal",
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
      label: "All Vacancies",
      labelMini: "Vacancy",
      iconName: "eye",
      iconSize: "large",
      iconStyle: "height: 20px; display: flex; align-items: center;",
      displayType: "label",
      doubleLineLabel: true,
      style: {
        "background-color": "#ebfcd6",
        "justify-content": "space-between",
      },
    },
    dropdown: {
      style: {
        width: "200px",
      },
    },
    buttonSecondary: {
      visible: true,
      icon: "oxd-info",
      tooltip: "Vacancy Info",
      style: "min-width: unset; min-height: unset;",
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
