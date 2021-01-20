import { shallowMount } from "@vue/test-utils";
import Button from "@orangehrm/oxd/core/components/Button/Button.vue";

describe("Button.vue", () => {
  it("renders OXD button", () => {
    const label = "new message";
    const wrapper = shallowMount(Button, {
      props: { label },
    });
    expect(wrapper.text()).toMatch(label);
  });
});
