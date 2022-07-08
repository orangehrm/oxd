const drawer = {
  visible: true,
  width: "600px",
  height: "100%",
  fullHeight: false,
  stickyFooter: true,
  fixedPosition: true,
  position: "right",
  header: {
    visible: true,
    title: "Filter Candidates",
    charmButton: {
      visible: true,
      icon: "oxd-refresh",
      tooltip: "Reset",
    },
  },
  footer: {
    okButton: {
      label: "Search",
    },
  },
};

export default drawer;
