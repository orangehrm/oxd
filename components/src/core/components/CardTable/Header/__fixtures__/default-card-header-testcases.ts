export const getCheckIconTestCases = [
  {
    message: 'renders OXD CardTable > TableBody with selected one',
    allItems: [
      {id: 1, isSelectable: true, isDisabled: false},
      {id: 2},
      {id: 3},
    ],
    selected: [1],
    rowToSelect: 2,
    icon: 'dash',
  },
  {
    message: 'renders OXD CardTable > TableBody with selecting all',
    allItems: [
      {id: 1, isSelectable: true, isDisabled: false},
      {id: 2},
      {id: 3},
    ],
    rowToSelect: 3,
    selected: [1, 2],
    icon: 'oxd-check',
  },
  {
    message: 'renders OXD CardTable > TableBody with unselecting one',
    allItems: [
      {id: 1, isSelectable: true, isDisabled: false},
      {id: 2},
      {id: 3},
    ],
    rowToUnSelect: 3,
    selected: [1, 2, 3],
    icon: 'dash',
  },
  {
    message: 'renders OXD CardTable > TableBody with selectable false',
    allItems: [
      {id: 1, isSelectable: false, isDisabled: false},
      {id: 2},
      {id: 3},
    ],
    rowToSelect: 3,
    selected: [2],
    icon: 'oxd-check',
  },
  {
    message:
      'renders OXD CardTable > TableBody with selectable false and unchecked',
    allItems: [
      {id: 1, isSelectable: false, isDisabled: false},
      {id: 2},
      {id: 3},
    ],
    rowToUnSelect: 3,
    selected: [2, 3],
    icon: 'dash',
  },
  {
    message: 'renders OXD CardTable > TableBody with disabled',
    allItems: [
      {id: 1, isSelectable: false, isDisabled: true},
      {id: 2},
      {id: 3},
    ],
    rowToSelect: 3,
    selected: [2],
    icon: 'oxd-check',
  },
];
