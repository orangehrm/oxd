import { shallowMount } from "@vue/test-utils";
import Collapsible from '@orangehrm/oxd/core/components/Collapsible/Collapsible.vue';

describe("Collapsible", () => {
  it("renders the collapsible component", () => {
    const wrapper = shallowMount(Collapsible, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("header title label", () => {
    const wrapper = shallowMount(Collapsible, {
      props: {
        headerTitle: "Candidate History",
      },
    });
    expect(wrapper.html()).toContain("Candidate History");
  });

  it("when collapsed the collapsed slot is shown and the expanded slot is not shown", () => {
    const wrapper = shallowMount(Collapsible, {
      slots: {
        collapsedContent: "<div>This is the collapsed view</div>",
        expandedContent: "<div>This is the expanded view</div>",
      },
    });
    expect(wrapper.find(".oxd-collapsed-content").isVisible()).toBe(true);
    expect(wrapper.find(".oxd-expanded-content").isVisible()).toBe(false);
  });

  it("when expanded the expanded slot is shown and the collapsed slot is not shown", () => {
    const wrapper = shallowMount(Collapsible, {
      props: {
        defaultExpand: true,
      },
      slots: {
        collapsedContent: "<div>This is the collapsed view</div>",
        expandedContent: "<div>This is the expanded view</div>",
      },
    });
    expect(wrapper.find(".oxd-expanded-content").isVisible()).toBe(true);
    expect(wrapper.find(".oxd-collapsed-content").isVisible()).toBe(false);
  });

  it("content is expanded when click on carrot down button", async () => {
    const wrapper = shallowMount(Collapsible, {});
    const button = wrapper.find(".oxd-collapsible-caret-icon");
    await button.trigger("click");
    expect(wrapper.vm.isExpanded).toBe(true);
    expect(wrapper.find(".oxd-expanded-content").isVisible()).toBe(true);
  });

  it("content is collapsed when click on carrot up button", async () => {
    const wrapper = shallowMount(Collapsible, {
      props: {
        defaultExpand: true,
      },
    });
    const button = wrapper.find(".oxd-collapsible-caret-icon");
    await button.trigger("click");
    expect(wrapper.vm.isExpanded).toBe(false);
    expect(wrapper.find(".oxd-collapsed-content").isVisible()).toBe(true);
  });
});
