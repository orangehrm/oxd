import topBar from './top-bar.basic-table.list';
import headers from './headers.basic-table.list';

const table = {
  topBar: topBar,
  headers: headers,
  selectable: true,
  addable: true,
  pagination: {
    maxPageLimit: 5,
  },
};

export default table;
