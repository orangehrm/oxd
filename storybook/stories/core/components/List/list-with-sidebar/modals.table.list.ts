const modals = [
  {
    identifier: "add-candidate-modal",
    props: {
      "with-transition": true,
    },
    style: {
      width: "800px",
    },
    header: {
      title: "Add Candidate",
    },
    body: {
      columnsPerRow: 2,
      elements: [
        {
          label: "Select resume",
          key: "file",
          type: "file",
          props: {
            multiselect: false,
          },
          span: 1,
          returnObjectKeyMapping: {
            name: "fileName",
            type: "fileType",
            size: "fileSize",
            base64: "file",
          },
          getValueType: "object",
        },
        {
          label: "First Name",
          required: true,
          key: "firstName",
          type: "input",
          props: {},
          rules: [
            {
              rule: "required",
            },
            {
              rule: "length",
              params: {
                charLength: 30,
              },
            },
          ],
        },
        {
          label: "Middle Name",
          key: "middleName",
          type: "input",
          props: {},
          rules: [
            {
              rule: "length",
              params: {
                charLength: 30,
              },
            },
          ],
        },
        {
          label: "Last Name",
          key: "lastName",
          type: "input",
          props: {},
          rules: [
            {
              rule: "required",
            },
            {
              rule: "length",
              params: {
                charLength: 30,
              },
            },
          ],
        },
        {
          label: "Email",
          key: "email",
          type: "input",
          props: {},
          rules: [
            {
              rule: "required",
            },
            {
              rule: "email",
            },
          ],
        },
        {
          label: "Contact Number",
          key: "contactNo",
          type: "input",
          props: {},
          rules: [
            {
              rule: "number",
            },
          ],
        },
        {
          label: "Facebook",
          key: "facebook",
          type: "input",
          props: {},
          rules: [
            {
              rule: "length",
              params: {
                charLength: 100,
              },
            },
          ],
        },
        {
          label: "Twitter",
          key: "twitter",
          type: "input",
          props: {},
          rules: [
            {
              rule: "length",
              params: {
                charLength: 100,
              },
            },
          ],
        },
        {
          label: "LinkedIn",
          key: "linkedin",
          type: "input",
          props: {},
          rules: [
            {
              rule: "length",
              params: {
                charLength: 100,
              },
            },
          ],
        },
        {
          label: "Vacancy",
          key: "vacancy",
          type: "select",
          getValueFrom: "id",
          getValueType: "number",
          props: {
            "hide-dropdown-default-label": true,
            options: [],
          },
          events: [
            {
              type: "update:modelValue",
              identifier: "select-vacancy",
            },
          ],
        },
        {
          label: "Date of Application",
          key: "appliedDate",
          type: "date",
          props: {
            placeholder: "yyyy/mm/dd/",
          },
        },
        {
          label: "Keywords",
          key: "keywords",
          type: "input",
          props: {
            placeholder: "Enter comma separate keywords...",
          },
          rules: [
            {
              rule: "length",
              params: {
                charLength: 254,
              },
            },
          ],
        },
        {
          label: "Notes",
          key: "note",
          type: "textarea",
          props: {
            placeholder: "Enter any other notes about the candidate",
          },
        },
        {
          label: "* Required field",
          key: "footer-label",
          type: "label",
        },
      ],
    },
    footer: {
      actions: [
        {
          type: "oxd-button",
          props: {
            label: "Cancel",
            size: "medium",
            displayType: "ghost",
          },
          class: "default-btn--cancel",
          events: [
            {
              type: "click",
              identifier: "getAddCandidateModalState",
            },
          ],
        },
        {
          type: "oxd-button",
          props: {
            label: "Search",
            size: "medium",
            displayType: "secondary",
          },
          class: "default-btn--save",
          events: [
            {
              type: "click",
              identifier: "getAddCandidateModalState",
            },
          ],
          style: {
            "margin-left": "0.5rem",
          },
        },
      ],
    },
  },
];

export default modals;
