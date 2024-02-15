import {mount} from '@vue/test-utils';
import Comments from '@orangehrm/oxd/core/components/Comments/Comments.vue';
import Comment from '@orangehrm/oxd/core/components/Comments/Comment.vue';
import {END, SMOOTH} from '../types';

const commentGroups = [
  {
    id: 'group-1',
    label: 'Offer notes',
    comments: [
      {
        groupId: 'group-1',
        id: 1,
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
        user: {
          id: 5,
          commenterName: 'Peter Sidius Weiss',
        },
        time: '2021/08/24',
        formattedTime: '2021/08/24',
      },
      {
        groupId: 'group-1',
        id: 2,
        labelHint: '(Added note on CV)',
        content:
          'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.',
        user: {
          id: 6,
          commenterName: 'Adrew Peters',
          avatarUrl:
            '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',
        },
        time: '2021/09/04',
        formattedTime: '2021/09/04',
      },
    ],
  },
  {
    id: 'group-2',
    label: 'Test notes',
    comments: [
      {
        groupId: 'group-2',
        id: 3,
        content:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
        user: {
          id: 7,
          commenterName: 'Andrew Simeon',
        },
        time: '2021/08/24',
        formattedTime: '2021/08/24',
      },
      {
        groupId: 'group-2',
        id: 4,
        content: 'Good job',
        user: {
          id: 8,
          commenterName: 'Deby Alexbery (Past Employee)',
        },
        time: '2021/09/04',
        formattedTime: '2021/09/04',
      },
    ],
  },
];

describe('Comments.vue', () => {
  window.HTMLElement.prototype.scrollIntoView = function() {
    //do nothing
  };
  it('renders OXD Comments with comments', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: false,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    expect(comment.length).toBe(4);
  });

  it('scroll is enabled when provided a scroll height', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: false,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const commentsContainer = wrapper.find('.oxd-comment-groups-container');
    expect(commentsContainer.classes()).toContain('scroll-vertical');
  });

  it('renders avatar in OXD Comments', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const avatarWrapper = comment[0].find('.oxd-comment-avatar-wrapper');
    expect(avatarWrapper).toBeTruthy();
  });

  it('allow OXD Comments to edit', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: true,
        allowToDelete: false,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const contentContainer = comment[0].find('.oxd-comment-content-container');
    const editButton = contentContainer.find('[data-test="editIcon"]');
    expect(editButton).toBeTruthy();
    editButton.trigger('click');
    await wrapper.vm.$nextTick();
    const commentBoxTextarea = contentContainer.find(
      '[data-test="comment-box-textarea"]',
    );
    await commentBoxTextarea.setValue('new comment');
    const addCommentbutton = wrapper.find('[data-test="add-comment-button"]');
    addCommentbutton.trigger('click');
  });

  it('allow OXD Comments to delete', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: true,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const commentWrapper = comment[0].find('.oxd-comment-wrapper');
    const deleteButton = commentWrapper.find('[data-test="deleteIcon"]');
    expect(deleteButton).toBeTruthy();
  });

  it('confirm comment deletion', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: true,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const commentWrapper = comment[0].find('.oxd-comment-wrapper');
    const deleteButton = commentWrapper.find('[data-test="deleteIcon"]');
    deleteButton.trigger('click');
    await wrapper.vm.$nextTick();
    const deleteConfirmationButton = commentWrapper.find(
      '[data-test="deleteButton"]',
    );
    deleteConfirmationButton.trigger('click');
  });

  it('cancel comment deletion', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: true,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const commentWrapper = comment[0].find('.oxd-comment-wrapper');
    const deleteButton = commentWrapper.find('[data-test="deleteIcon"]');
    deleteButton.trigger('click');
    await wrapper.vm.$nextTick();
    const cancelDeleteConfirmationButton = commentWrapper.find(
      '[data-test="cancelButton"]',
    );
    cancelDeleteConfirmationButton.trigger('click');
  });

  it('add button should be hidden when the text field is empty', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    // const commentBoxTextarea = wrapper.find(
    //   '[data-test="comment-box-textarea"]',
    // );

    // await commentBoxTextarea.setValue('new comment');

    const addCommentbutton = wrapper.find('[data-test="add-comment-button"]');
    expect(addCommentbutton.exists()).toBeFalsy();
  });

  it('add button should be visible when the text field is filled', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const commentBoxTextarea = wrapper.find(
      '[data-test="comment-box-textarea"]',
    );

    await commentBoxTextarea.setValue('new comment');

    const addCommentbutton = wrapper.find('[data-test="add-comment-button"]');
    expect(addCommentbutton.exists()).toBeTruthy();
  });

  it('add new comment', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: true,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    const commentBoxTextarea = wrapper.find(
      '[data-test="comment-box-textarea"]',
    );

    await commentBoxTextarea.setValue('new comment');

    const addCommentbutton = wrapper.find('[data-test="add-comment-button"]');
    addCommentbutton.trigger('click');
  });

  it('should not render edit button input when readOnly mode enabled', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: true,
        allowToDelete: true,
        enableAvatar: true,
        scrollHeight: 300,
        readOnly: true,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const contentContainer = comment[0].find('.oxd-comment-content-container');
    const editButton = contentContainer.find('[data-test="editIcon"]');
    expect(editButton.exists()).toBe(false);
  });

  it('should not render delete button input when readOnly mode enabled', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: true,
        enableAvatar: true,
        scrollHeight: 300,
        readOnly: true,
      },
    });
    await wrapper.vm.$nextTick();
    const comment = wrapper.findAllComponents(Comment);
    const contentContainer = comment[0].find('.oxd-comment-content-container');
    const deleteButton = contentContainer.find('[data-test="deleteIcon"]');
    expect(deleteButton.exists()).toBe(false);
  });

  it('should not render comment input when readOnly mode enabled', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: true,
        allowToDelete: true,
        enableAvatar: false,
        scrollHeight: 300,
        readOnly: true,
      },
    });
    await wrapper.vm.$nextTick();
    const commentbox = wrapper.find('.oxd-comment-box');
    expect(commentbox.exists()).toBe(false);
  });

  it('set scroll settings', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: false,
        scrollHeight: 150,
        scrollSettings: {
          mode: SMOOTH,
          scrollTo: END,
        },
      },
    });
    await wrapper.vm.$nextTick();
  });

  it('should not render section headers when group by is none', async () => {
    const wrapper = mount(Comments, {
      props: {
        commentGroups,
        groupBy: 'none',
        allowToEdit: false,
        allowToDelete: false,
        enableAvatar: false,
        scrollHeight: 300,
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.comments-group-wrapper').exists()).toBeFalsy();
    expect(wrapper.find('.oxd-comment-group').exists()).toBeFalsy();
    expect(wrapper.find('.comments-wrapper').exists()).toBeTruthy();
  });
});
