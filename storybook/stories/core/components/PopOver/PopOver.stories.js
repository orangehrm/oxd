import PopOverStory from "./PopOver.story.vue"

export default {
    title: 'Popups/PopOver',
    components: {
        PopOverStory,

    }
};

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {PopOverStory},
    template: `<PopOverStory />`,

});

export const Default = Template.bind({});
