const topBar = {
  visible: true,
  listRecordCount: {
    singleTerm: "Candidate",
    multiTerm: "Candidates",
  },
  bulkActions: [
    {
      conditional: true,
      type: "oxd-button",
      props: {
        label: "Archive",
        size: "medium",
        displayType: "label-info",
        iconName: "oxd-archive",
        "disabled-tooltip":
          "Your selection should contain only active candidates",
        flow: "bottom",
      },
      class: "info-color",
      events: [
        {
          type: "click",
          identifier: "archive-candidates",
        },
      ],
    },
    {
      conditional: true,
      visible: false,
      type: "oxd-button",
      props: {
        label: "Unarchive",
        size: "medium",
        displayType: "label-info",
        iconName: "oxd-archive",
        "icon-size": "small",
        "disabled-tooltip":
          "Your selection should contain only archived candidates",
        flow: "bottom",
      },
      class: "info-color",
      events: [
        {
          type: "click",
          identifier: "unarchive-candidates",
        },
      ],
    },
    {
      type: "oxd-button",
      props: {
        label: "Delete Selected",
        size: "medium",
        displayType: "label-feedback-danger",
        iconName: "oxd-trash",
        "icon-size": "extra-small",
      },
      events: [
        {
          type: "click",
          identifier: "delete-candidates",
        },
      ],
    },
  ],
  quickSearch: {
    visible: true,
    placeholder: "Search",
    withImageSearch: true,
    clear: false,
    style: {
      width: "261px",
    },
    button: {
      visible: true,
      class: "quick-search-btn",
      style: {
        "background-color": "rgba(100, 114, 140, 0.1)",
        padding: "0",
        "min-width": "unset",
        "min-height": "unset",
        width: "28px",
        height: "28px",
      },
      props: {
        name: "oxd-search",
        displayType: "label-info",
      },
    },
  },
  singleActions: [
    {
      type: "oxd-icon-button",
      props: {
        size: "medium",
        displayType: "label-info",
        name: "funnel",
        tooltip: "Filter",
        flow: "top",
      },
      class: "btn-large",
      style: {
        "margin-left": "font-size: 14px",
        "font-size": "unset",
      },
      events: [
        {
          type: "click",
          identifier: "drawer:show",
        },
      ],
    },
    {
      type: "oxd-button",
      props: {
        label: "CSV",
        size: "medium",
        displayType: "label-info",
        iconName: "oxd-document-text",
        tooltip: "Export to CSV",
        flow: "top",
      },
      events: [
        {
          type: "click",
          identifier: "topfilters:onExportBtnClick",
        },
      ],
    },
  ],
};

export default topBar;
