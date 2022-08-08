import PopOver from '@orangehrm/oxd/core/components/PopOver/PopOver';
import PopOverStory from "../PopOver/PopOver.story";
import PopOverStoryRightAligned from "../PopOver/PopOverRightAligned.story";

export default {
    title: 'Popups/PopOver',
    component: PopOver,
};

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {'oxd-input': PopOver},
    template: '<oxd-input v-bind="args" />',
});

export const Default = () => PopOverStory;
export const RightAligned = () => PopOverStoryRightAligned;
