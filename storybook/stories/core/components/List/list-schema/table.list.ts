import leftPanel from "./left-panel.table.list";
import topBar from "./top-bar.table.list";
import headers from "./headers.table.list";

import { ListTable } from "@orangehrm/oxd/core/components/List/types";

const table: ListTable = {
  leftPanel: leftPanel,
  topBar: topBar,
  headers: headers,
  pagination: {
    maxPageLimit: 5,
  },
};

export default table;
