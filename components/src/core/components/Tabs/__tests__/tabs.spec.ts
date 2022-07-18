import {mount, shallowMount} from '@vue/test-utils';
import Tabs from '@orangehrm/oxd/core/components/Tabs/Tabs.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

describe('Tabs.vue', () => {
    it('Renders two tabs along with icons', async () => {
        const wrapper = mount(Tabs, {
            props: {
                tabs : [ { id: "tab1", title: "Details", icon : 'oxd-posts' }, { id: "tab2", title: "Resume", icon : 'oxd-profile' }]
            },
            slots: {
                tab1: '<div> This is the content of tab 1</div>',
                tab2: '<div> This is the content of tab 2</div>'
            }
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toMatchSnapshot();
        const icon = wrapper.findComponent(Icon);
        expect(icon.find('.tab-icon')).toBeTruthy();
    });

    it('Renders two tabs without icons', () => {
        const wrapper = shallowMount(Tabs, {
            props: {
                tabs : [ { id: "tab1", title: "Details" }, { id: "tab2", title: "Resume"}]
            },
            slots: {
                tab1: '<div> This is the content of tab 1</div>',
                tab2: '<div>This is the content of tab 2</div>'
            }
        });
        expect(wrapper.find('.tab-icon').exists()).toBeFalsy();
    });

    it('In initial rendering first tab Id is set to the currentTabId', () => {
        const wrapper = shallowMount(Tabs, {
            props: {
                tabs : [ { id: "tab1", title: "Details", icon : 'oxd-posts' }, { id: "tab2", title: "Resume", icon : 'oxd-profile' }]
            }
        });
        expect(wrapper.vm.currentTabId).toBe("tab1");
    });
   
    it('Click on the second tab', () => {
            const wrapper = shallowMount(Tabs, {
                props: {
                    tabs : [ { id: "tab1", title: "Details" }, { id: "tab2", title: "Resume"}]
                },
                slots: {
                    tab1: '<div> This is the content of tab 1</div>',
                    tab2: '<div>This is the content of tab 2</div>'
                }
            });

    
            wrapper.find('#tab2').trigger('click');
            wrapper.vm.$nextTick();
            expect(wrapper.emitted().click[0]).toContainEqual(
                { 
                    id: "tab2", 
                    title: "Resume"
                }
            );

            expect(wrapper.emitted('change')).toBeTruthy();
            expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('Hit Enter when focusing on the 2nd tab', () => {
            const wrapper = shallowMount(Tabs, {
                props: {
                    tabs : [ { id: "tab1", title: "Details" }, { id: "tab2", title: "Resume"}]
                }
            });
            
            wrapper.find('#tab2').trigger('keyup.enter');
            wrapper.vm.$nextTick();
            expect(wrapper.emitted().change[0]).toContainEqual(
                { 
                    id: "tab2", 
                    title: "Resume"
                }
            );
            expect(wrapper.emitted('change')).toBeTruthy();
            expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('Focusing on the third tab', () => {
        const wrapper = shallowMount(Tabs, {
            props: {
                tabs : [ { id: "tab1", title: "Details" }, { id: "tab2", title: "Resume"}, { id: "tab3", title: "Notes"}]
            }
        });
        
        wrapper.find('#tab3').trigger('focus');
        wrapper.vm.$nextTick();
        expect(wrapper.emitted().focus[0]).toContainEqual(
            { 
                id: "tab3", 
                title: "Notes"
            }
        );
        expect(wrapper.emitted('focus')).toBeTruthy();
    });

    it('Bluring on the first tab', () => {
        const wrapper = shallowMount(Tabs, {
            props: {
                tabs : [ { id: "tab1", title: "Details" }, { id: "tab2", title: "Resume"}]
            }
        });
        
        wrapper.find('#tab1').trigger('blur');
        wrapper.vm.$nextTick();
        expect(wrapper.emitted().blur[0]).toContainEqual(
            { 
                id: "tab1", 
                title: "Details"
            }
        );
        expect(wrapper.emitted('blur')).toBeTruthy();
    });
});