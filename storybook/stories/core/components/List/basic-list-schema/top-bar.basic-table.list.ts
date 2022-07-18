const topBar = {
    visible: true,
    listRecordCount: {
        singleTerm: "Event",
        multiTerm: "Events",
    },
    bulkActions: [
        {
            type: "oxd-button",
            props: {
                label: "Delete Selected",
                size: "medium",
                displayType: "label-feedback-danger",
                iconName: "oxd-trash",
                "icon-size": "extra-small",
                "disabled-tooltip":
                    "You don't have permissions to delete some of the selected events",
                flow: "bottom",
            },
            events: [
                {
                    type: "click",
                    identifier: "delete-events",
                },
            ],
        },
    ],
    singleActions: [
        {
            type: "oxd-button",
            props: {
                label: "Add Event",
                size: "medium",
                displayType: "secondary",
                iconName: "oxd-add",
                iconSize: "small",
                flow: "bottom",
            },
            class: "info-color",
            events: [
                {
                    type: "click",
                    identifier: "addEvent:show",
                },
            ],
        },
    ],
};

export default topBar;
