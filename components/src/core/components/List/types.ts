interface Visible {
  visible?: boolean;
}

interface ListEmitEvent {
  type: string;
  identifier: string;
}

interface Tooltip {
  tooltip?: string;
  flow?: string;
}

interface Style {
  [key: string]: string | undefined;
}

interface Icon {
  iconName?: string;
  "icon-size"?: string;
  iconSize?: string;
  iconStyle?: string;
}

interface ButtonIcon extends Icon {
  "icon-name"?: string;
}

interface ListButtonProps extends Tooltip, ButtonIcon {
  label?: string;
  displayType?: string;
  size?: string;
  "display-type"?: string;
}

interface ListButton {
  props: ListButtonProps;
  events?: ListEmitEvent[];
  class?: string;
  style?: Style;
}

interface ListBulkAction extends ListButton, Visible {
  conditional?: boolean;
  type?: string;
}

interface ListQuickSearch extends ListButtonProps, Visible {
  placeholder?: string;
  clear?: boolean;
}

interface ListLeftPanelHeader extends Visible {
  button: ListButton;
}

interface SelectDropdownButton extends Icon {
  labelMini: string;
  doubleLineLabel: boolean;
  label: string;
  displayType: string;
  style: Style;
}

export interface ListLeftPanelBody extends Visible {
  button: SelectDropdownButton;
  dropdown: {
    style: Style;
  };
  buttonSecondary: {
    visible: boolean;
    icon: string;
    tooltip: string;
    style: string;
  };
}

interface cellProps {
  link?: string;
  target?: string;
  pillProperty?: string[];
}

interface ListLeftPanel {
  visible: boolean;
  header: ListLeftPanelHeader;
  body: ListLeftPanelBody;
  list: {
    visible: boolean;
    bubble: {
      visible: boolean;
    };
  };
}

interface ListTopBar extends Visible {
  listRecordCount: {
    singleTerm: string;
    multiTerm: string;
  };
  bulkActions: ListBulkAction[];
  singleActions: ListBulkAction[];
  quickSearch: ListQuickSearch;
}

interface ListTableHeaderCell extends Icon {
  name?: string;
  slot?: string;
  title?: string;
  style?: Style;
  cellType?: string;
  cellProps?: cellProps;
  cellRenderer?: string;
  sortField?: string;
  initialSortOrder?: string;
}

export interface ListTable {
  leftPanel?: ListLeftPanel;
  topBar?: ListTopBar;
  headers?: ListTableHeaderCell[];
  pagination?: {
    maxPageLimit: number;
  };
}
