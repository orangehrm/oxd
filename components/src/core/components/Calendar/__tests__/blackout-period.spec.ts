import {mount} from '@vue/test-utils';
import Calendar from '@orangehrm/oxd/core/components/Calendar/Calendar.vue';
import DateVue from '@orangehrm/oxd/core/components/Calendar/Date.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

describe('Calendar.vue Blackout Period Tests', () => {
  const dateExpected = new Date(2025, 6, 27, 0, 0, 0);

  describe('Strict Blackout Events', () => {
    it('should render strict blackout with proper styling', () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 15, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      const strictBlackoutDate = wrapper.find('.oxd-calendar-date.--strict-blackout');
      expect(strictBlackoutDate.exists()).toBeTruthy();
      expect(strictBlackoutDate.text()).toStrictEqual('15');
    });

    it('should render strict blackout with slash-circle icon', () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 10, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      // Find the specific date component for the blackout event
      const dateComponents = wrapper.findAllComponents(DateVue);
      const blackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 10;
      });

      expect(blackoutDateComponent).toBeTruthy();
      
      const icon = blackoutDateComponent!.findComponent(Icon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props('name')).toStrictEqual('oxd-slash-circle');
    });

    it('should render strict blackout with tooltip', () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 20, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'System Maintenance - No Service Available',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      const dateWrapper = wrapper.find('.oxd-calendar-date-wrapper[tooltip="System Maintenance - No Service Available"]');
      expect(dateWrapper.exists()).toBeTruthy();
      expect(dateWrapper.attributes('flow')).toStrictEqual('top');
    });

    it('should render strict blackout with custom tooltip position', () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 25, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'Public Holiday - Office Closed',
        tooltipPosition: 'bottom'
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      const dateWrapper = wrapper.find('.oxd-calendar-date-wrapper[tooltip="Public Holiday - Office Closed"]');
      expect(dateWrapper.exists()).toBeTruthy();
      expect(dateWrapper.attributes('flow')).toStrictEqual('bottom');
    });

    it('should not disable selection for strict blackout dates when not disabled', async () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 15, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'System Maintenance - No Service Available',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      // Find the Date component for the strict blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 15 && comp.props('disabled') === false;
      });

      expect(strictBlackoutDateComponent).toBeTruthy();
      expect(strictBlackoutDateComponent!.props('disabled')).toStrictEqual(false);

      // Try to click the disabled strict blackout date
      await strictBlackoutDateComponent!.trigger('click');

      // Should emit update:modelValue for disabled dates
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('should change modelValue when clicking strict blackout dates when not disabled', async () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 10, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
      };

      const originalModelValue = new Date(2025, 6, 27, 0, 0, 0);
      
      const wrapper = mount(Calendar, {
        props: {
          modelValue: originalModelValue,
          events: [strictBlackoutEvent],
        },
      });

      // Find and click the strict blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 10 && comp.props('disabled') === false;
      });

      await strictBlackoutDateComponent!.trigger('click');

      // Should not emit update:modelValue
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      
      // Verify the date is marked as disabled
      expect(strictBlackoutDateComponent!.props('disabled')).toStrictEqual(false);
    });


    it('should disable selection for strict blackout dates when disabled', async () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 15, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'System Maintenance - No Service Available',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent],
        },
      });

      // Find the Date component for the strict blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 15 && comp.props('disabled') === true;
      });

      expect(strictBlackoutDateComponent).toBeTruthy();
      expect(strictBlackoutDateComponent!.props('disabled')).toStrictEqual(true);

      // Try to click the disabled strict blackout date
      await strictBlackoutDateComponent!.trigger('click');

      // Should not emit update:modelValue for disabled dates
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('should not change modelValue when clicking strict blackout dates when disabled', async () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 10, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
      };

      const originalModelValue = new Date(2025, 6, 27, 0, 0, 0);
      
      const wrapper = mount(Calendar, {
        props: {
          modelValue: originalModelValue,
          events: [strictBlackoutEvent],
        },
      });

      // Find and click the strict blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 10 && comp.props('disabled') === true;
      });

      await strictBlackoutDateComponent!.trigger('click');

      // Should not emit update:modelValue
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      
      // Verify the date is marked as disabled
      expect(strictBlackoutDateComponent!.props('disabled')).toStrictEqual(true);
    });

    it('should render strict blackout disabled variant with proper styling', () => {
      const strictBlackoutDisabledEvent = {
        date: new Date(2025, 6, 26, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Disabled Date - Office Closed',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutDisabledEvent],
        },
      });

      const strictBlackoutDisabledDate = wrapper.find('.oxd-calendar-date.--strict-blackout-disabled');
      expect(strictBlackoutDisabledDate.exists()).toBeTruthy();
      expect(strictBlackoutDisabledDate.text()).toStrictEqual('26');
    });

    it('should render strict blackout disabled variant with icon', () => {
      const strictBlackoutDisabledEvent = {
        date: new Date(2025, 6, 27, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Disabled Date - Office Closed',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutDisabledEvent],
        },
      });

      // Find the specific date component for the disabled blackout event
      const dateComponents = wrapper.findAllComponents(DateVue);
      const disabledBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 27;
      });

      expect(disabledBlackoutDateComponent).toBeTruthy();
      
      const icon = disabledBlackoutDateComponent!.findComponent(Icon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props('name')).toStrictEqual('oxd-slash-circle');
    });

    it('should render strict blackout disabled variant with tooltip', () => {
      const strictBlackoutDisabledEvent = {
        date: new Date(2025, 6, 26, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Disabled Date - Office Closed',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutDisabledEvent],
        },
      });

      const dateWrapper = wrapper.find('.oxd-calendar-date-wrapper[tooltip="Disabled Date - Office Closed"]');
      expect(dateWrapper.exists()).toBeTruthy();
      expect(dateWrapper.attributes('flow')).toStrictEqual('top');

      const strictBlackoutDisabledDate = wrapper.find('.oxd-calendar-date.--strict-blackout-disabled');
      expect(strictBlackoutDisabledDate.exists()).toBeTruthy();
    });
  });

  describe('Warning Blackout Events', () => {
    it('should render warning blackout with proper styling', () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 12, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [warningBlackoutEvent],
        },
      });

      const warningBlackoutDate = wrapper.find('.oxd-calendar-date.--warning-blackout');
      expect(warningBlackoutDate.exists()).toBeTruthy();
      expect(warningBlackoutDate.text()).toStrictEqual('12');
    });

    it('should render warning blackout with slash-circle icon', () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 18, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [warningBlackoutEvent],
        },
      });

      // Find the specific date component for the blackout event
      const dateComponents = wrapper.findAllComponents(DateVue);
      const blackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 18;
      });

      expect(blackoutDateComponent).toBeTruthy();
      
      const icon = blackoutDateComponent!.findComponent(Icon);
      expect(icon.exists()).toBeTruthy();
      expect(icon.props('name')).toStrictEqual('oxd-slash-circle');
    });

    it('should render warning blackout with tooltip', () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 8, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Staff - Reduced Capacity',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [warningBlackoutEvent],
        },
      });

      const dateWrapper = wrapper.find('.oxd-calendar-date-wrapper[tooltip="Limited Staff - Reduced Capacity"]');
      expect(dateWrapper.exists()).toBeTruthy();
      expect(dateWrapper.attributes('flow')).toStrictEqual('top');
    });

    it('should render warning blackout with custom tooltip position', () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 22, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Training Day - Slower Response Time',
        tooltipPosition: 'left'
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [warningBlackoutEvent],
        },
      });

      const dateWrapper = wrapper.find('.oxd-calendar-date-wrapper[tooltip="Training Day - Slower Response Time"]');
      expect(dateWrapper.exists()).toBeTruthy();
      expect(dateWrapper.attributes('flow')).toStrictEqual('left');
    });

    it('should allow selection for warning blackout dates', async () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 12, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Staff - Reduced Capacity',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [warningBlackoutEvent],
        },
      });

      // Find the Date component for the warning blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const warningBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 12;
      });

      expect(warningBlackoutDateComponent).toBeTruthy();
      expect(warningBlackoutDateComponent!.props('disabled')).toStrictEqual(false);

      // Click the warning blackout date (should be selectable)
      await warningBlackoutDateComponent!.trigger('click');

      // Should emit update:modelValue for warning blackout dates
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('should change modelValue when clicking warning blackout dates', async () => {
      const warningBlackoutEvent = {
        date: new Date(2025, 6, 18, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
      };

      const originalModelValue = new Date(2025, 6, 27, 0, 0, 0);
      
      const wrapper = mount(Calendar, {
        props: {
          modelValue: originalModelValue,
          events: [warningBlackoutEvent],
        },
      });

      // Find and click the warning blackout date
      const dateComponents = wrapper.findAllComponents(DateVue);
      const warningBlackoutDateComponent = dateComponents.find(comp => {
        return comp.props('date').getDate() === 18;
      });

      await warningBlackoutDateComponent!.trigger('click');

      // Should emit update:modelValue
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      
      // Verify the date is NOT disabled
      expect(warningBlackoutDateComponent!.props('disabled')).toStrictEqual(false);
    });
  });

  describe('Mixed Blackout Events', () => {
    it('should render multiple blackout events with different types', () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 1, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'New Year Holiday - Office Closed',
      };

      const warningBlackoutEvent = {
        date: new Date(2025, 6, 15, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Mid-Month Review - Limited Availability',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent, warningBlackoutEvent],
        },
      });

      const strictBlackoutDate = wrapper.find('.oxd-calendar-date.--strict-blackout');
      expect(strictBlackoutDate.exists()).toBeTruthy();
      expect(strictBlackoutDate.text()).toStrictEqual('1');

      const warningBlackoutDate = wrapper.find('.oxd-calendar-date.--warning-blackout');
      expect(warningBlackoutDate.exists()).toBeTruthy();
      expect(warningBlackoutDate.text()).toStrictEqual('15');

      const strictTooltip = wrapper.find('.oxd-calendar-date-wrapper[tooltip="New Year Holiday - Office Closed"]');
      expect(strictTooltip.exists()).toBeTruthy();

      const warningTooltip = wrapper.find('.oxd-calendar-date-wrapper[tooltip="Mid-Month Review - Limited Availability"]');
      expect(warningTooltip.exists()).toBeTruthy();
    });

    it('should render multiple blackout events with different tooltip positions', () => {
      const events = [
        {
          date: new Date(2025, 6, 5, 0, 0, 0),
          type: 'strict-blackout',
          class: '--strict-blackout',
          tooltip: 'System Upgrade',
          tooltipPosition: 'top'
        },
        {
          date: new Date(2025, 6, 10, 0, 0, 0),
          type: 'warning-blackout',
          class: '--warning-blackout',
          tooltip: 'Staff Meeting',
          tooltipPosition: 'bottom'
        },
        {
          date: new Date(2025, 6, 15, 0, 0, 0),
          type: 'strict-blackout',
          class: '--strict-blackout',
          tooltip: 'Security Audit',
          tooltipPosition: 'left'
        },
        {
          date: new Date(2025, 6, 20, 0, 0, 0),
          type: 'warning-blackout',
          class: '--warning-blackout',
          tooltip: 'Team Training',
          tooltipPosition: 'right'
        }
      ];

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: events,
        },
      });

      expect(wrapper.find('[tooltip="System Upgrade"][flow="top"]').exists()).toBeTruthy();
      expect(wrapper.find('[tooltip="Staff Meeting"][flow="bottom"]').exists()).toBeTruthy();
      expect(wrapper.find('[tooltip="Security Audit"][flow="left"]').exists()).toBeTruthy();
      expect(wrapper.find('[tooltip="Team Training"][flow="right"]').exists()).toBeTruthy();

      expect(wrapper.findAll('.oxd-calendar-date.--strict-blackout').length).toStrictEqual(2);
      expect(wrapper.findAll('.oxd-calendar-date.--warning-blackout').length).toStrictEqual(2);
    });

    it('should render blackout events with icons and tooltips together', () => {
      const events = [
        {
          date: new Date(2025, 6, 3, 0, 0, 0),
          type: 'strict-blackout',
          class: '--strict-blackout',
          tooltip: 'Database Migration - Complete Downtime'
        },
        {
          date: new Date(2025, 6, 17, 0, 0, 0),
          type: 'warning-blackout',
          class: '--warning-blackout',
          tooltip: 'Network Optimization - Potential Slowdowns'
        }
      ];

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: events,
        },
      });

      // Check both events have icons
      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutComponent = dateComponents.find(comp => comp.props('date').getDate() === 3);
      const warningBlackoutComponent = dateComponents.find(comp => comp.props('date').getDate() === 17);
      
      expect(strictBlackoutComponent!.findComponent(Icon).exists()).toBeTruthy();
      expect(warningBlackoutComponent!.findComponent(Icon).exists()).toBeTruthy();

      // Check both events have tooltips
      expect(wrapper.find('[tooltip="Database Migration - Complete Downtime"]').exists()).toBeTruthy();
      expect(wrapper.find('[tooltip="Network Optimization - Potential Slowdowns"]').exists()).toBeTruthy();

      // Check styling is applied
      expect(wrapper.find('.oxd-calendar-date.--strict-blackout').exists()).toBeTruthy();
      expect(wrapper.find('.oxd-calendar-date.--warning-blackout').exists()).toBeTruthy();
    });

    it('should have different selection behavior for strict vs warning blackout', async () => {
      const strictBlackoutEvent = {
        date: new Date(2025, 6, 5, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        tooltip: 'System Down - No Access',
      };

      const warningBlackoutEvent = {
        date: new Date(2025, 6, 15, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Limited Service Available',
      };

      const strictBlackoutDisabledEvent = {
        date: new Date(2025, 6, 26, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        tooltip: 'Disabled Date - Office Closed',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEvent, strictBlackoutDisabledEvent, warningBlackoutEvent],
        },
      });

      const dateComponents = wrapper.findAllComponents(DateVue);
      
      // Find strict blackout date component
      const strictBlackoutComponent = dateComponents.find(comp => comp.props('date').getDate() === 5);
      // Find warning blackout date component  
      const warningBlackoutComponent = dateComponents.find(comp => comp.props('date').getDate() === 15);

      // Find strict blackout disabled date component
      const strictBlackoutDisabledComponent = dateComponents.find(comp => comp.props('date').getDate() === 26);

      // Verify strict blackout is disabled
      expect(strictBlackoutComponent!.props('disabled')).toStrictEqual(false);
      // Verify strict blackout disabled is disabled
      expect(strictBlackoutDisabledComponent!.props('disabled')).toStrictEqual(true);
      // Verify warning blackout is NOT disabled
      expect(warningBlackoutComponent!.props('disabled')).toStrictEqual(false);


       // Try to click strict blackout disabled (should not work)
       await strictBlackoutDisabledComponent!.trigger('click');
       expect(wrapper.emitted('update:modelValue')).toBeFalsy();
       
      // Try to click strict blackout
      await strictBlackoutComponent!.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();

      // Click warning blackout (should work)
      await warningBlackoutComponent!.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });
  });

  describe('Blackout Event Edge Cases', () => {
    it('should handle blackout event without tooltip gracefully', () => {
      const blackoutEventNoTooltip = {
        date: new Date(2025, 6, 14, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [blackoutEventNoTooltip],
        },
      });

      const strictBlackoutDate = wrapper.find('.oxd-calendar-date.--strict-blackout');
      expect(strictBlackoutDate.exists()).toBeTruthy();

      const dateWrappers = wrapper.findAll('.oxd-calendar-date-wrapper');
      const tooltipWrappers = dateWrappers.filter(w => w.attributes('tooltip'));
      expect(tooltipWrappers.length).toStrictEqual(0);

      const dateComponents = wrapper.findAllComponents(DateVue);
      const blackoutDateComponent = dateComponents.find(comp => comp.props('date').getDate() === 14);
      const icon = blackoutDateComponent!.findComponent(Icon);
      expect(icon.exists()).toBeTruthy();
    });

    it('should handle blackout event with empty tooltip', () => {
      const blackoutEventEmptyTooltip = {
        date: new Date(2025, 6, 16, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: '',
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [blackoutEventEmptyTooltip],
        },
      });

      const warningBlackoutDate = wrapper.find('.oxd-calendar-date.--warning-blackout');
      expect(warningBlackoutDate.exists()).toBeTruthy();

      const dateWrappers = wrapper.findAll('.oxd-calendar-date-wrapper');
      const tooltipWrappers = dateWrappers.filter(w => w.attributes('tooltip'));
      expect(tooltipWrappers.length).toStrictEqual(0);
    });

    it('should handle blackout event with custom styling', () => {
      const blackoutEventCustomStyle = {
        date: new Date(2025, 6, 24, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout',
        style: { backgroundColor: '#ff0000', color: '#ffffff' },
        tooltip: 'Critical System Maintenance'
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [blackoutEventCustomStyle],
        },
      });

      const strictBlackoutDate = wrapper.find('.oxd-calendar-date.--strict-blackout');
      expect(strictBlackoutDate.exists()).toBeTruthy();

      const tooltipWrapper = wrapper.find('[tooltip="Critical System Maintenance"]');
      expect(tooltipWrapper.exists()).toBeTruthy();

      const dateComponents = wrapper.findAllComponents(DateVue);
      const blackoutDateComponent = dateComponents.find(comp => comp.props('date').getDate() === 24);
      const icon = blackoutDateComponent!.findComponent(Icon);
      expect(icon.exists()).toBeTruthy();
    });

    it('should not interfere with calendar selection functionality', async () => {
      const blackoutEvent = {
        date: new Date(2025, 6, 11, 0, 0, 0),
        type: 'warning-blackout',
        class: '--warning-blackout',
        tooltip: 'Scheduled Maintenance'
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [blackoutEvent],
        },
      });

      // Should still be able to select non-blackout dates
      const dateComponent = wrapper.findComponent(DateVue);
      await dateComponent.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();

      // Blackout styling should still be present
      const warningBlackoutDate = wrapper.find('.oxd-calendar-date.--warning-blackout');
      expect(warningBlackoutDate.exists()).toBeTruthy();
    });

    it('should prevent selection on strict blackout when disabled even with custom styling', async () => {
      const strictBlackoutEventCustomStyle = {
        date: new Date(2025, 6, 25, 0, 0, 0),
        type: 'strict-blackout',
        class: '--strict-blackout-disabled',
        style: { backgroundColor: '#ff0000', color: '#ffffff' },
        tooltip: 'Critical Emergency Maintenance'
      };

      const wrapper = mount(Calendar, {
        props: {
          modelValue: dateExpected,
          events: [strictBlackoutEventCustomStyle],
        },
      });

      const dateComponents = wrapper.findAllComponents(DateVue);
      const strictBlackoutComponent = dateComponents.find(comp => comp.props('date').getDate() === 25);

      // Should be disabled despite custom styling
      expect(strictBlackoutComponent!.props('disabled')).toStrictEqual(true);

      // Should not be selectable
      await strictBlackoutComponent!.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();

      // Should still show styling and tooltip
      const strictBlackoutDate = wrapper.find('.oxd-calendar-date.--strict-blackout-disabled');
      expect(strictBlackoutDate.exists()).toBeTruthy();
      
      const tooltipWrapper = wrapper.find('[tooltip="Critical Emergency Maintenance"]');
      expect(tooltipWrapper.exists()).toBeTruthy();
    });
  });
});
