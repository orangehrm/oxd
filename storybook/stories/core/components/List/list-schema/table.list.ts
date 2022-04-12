import leftPanel from './left-panel.table.list';
import topBar from './top-bar.table.list';
import headers from './headers.table.list';

const table = {
  leftPanel: leftPanel,
  topBar: topBar,
  headers: headers,
  selectable: true,
  addable: true,
  pagination: {
    maxPageLimit: 5,
  },
};

export default table;
