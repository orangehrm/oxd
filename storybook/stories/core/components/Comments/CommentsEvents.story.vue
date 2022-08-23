<template>
  <div>
    <div style="margin-top: 2rem; margin-bottom: 2rem">
      <span v-if="InputEvent">Input Event Triggered</span>
      <span v-if="ClickEvent">Click Event Triggered</span>
    </div>
    <div>
      <span v-if="value">Value entered : {{ value }}</span>
    </div>
    <oxd-comments
      :enableAvatar="true"
      :scrollHeight="200"
      :commentGroups="commentGroups"
      :commentDeleteConfirmationMsg="'The current comment will be permanently deleted. Are you sure you want to continue?'"
      :modelValue="value"
      @addComment="onClick"
      @update:modelValue="onInput"
    />
  </div>
</template>

<script>
import {nanoid} from 'nanoid';
import Comments from '@orangehrm/oxd/core/components/Comments/Comments';

export default {
  data() {
    return {
      InputEvent: false,
      ClickEvent: false,
      value: null,
      commentGroups: [
        {
          id: 'group-1',
          label: 'Offer notes',
          comments: [
            {
              groupId: 'group-1',
              id: nanoid(6),
              content:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
              user: {
                id: nanoid(4),
                commenterName: 'Peter Sidius Weiss',
              },
              time: '2021/08/24',
            },
            {
              groupId: 'group-1',
              id: nanoid(6),
              labelHint: '(Added note on CV)',
              content:
                'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.',
              user: {
                id: nanoid(4),
                commenterName: 'Adrew Peters',
              },
              time: '2021/09/04',
            },
          ],
        },
        {
          id: 'group-2',
          label: 'Test notes',
          comments: [
            {
              groupId: 'group-2',
              id: nanoid(6),
              content:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,',
              user: {
                id: nanoid(4),
                commenterName: 'Andrew Simeon',
              },
              time: '2021/08/24',
            },
            {
              groupId: 'group-2',
              id: nanoid(6),
              content: 'Good job',
              user: {
                id: nanoid(4),
                commenterName: 'Deby Alexbery',
              },
              time: '2021/09/04',
            },
          ],
        },
        {
          id: 'group-3',
          label: 'Interview',
          comments: [
            {
              groupId: 'group-3',
              id: nanoid(6),
              content:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              user: {
                id: nanoid(4),
                commenterName: 'Deby Alexbery',
              },
              time: '2021/08/24',
            },
            {
              groupId: 'group-3',
              id: nanoid(6),
              content:
                'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.',
              user: {
                id: nanoid(4),
                commenterName: 'Andrew Simeon',
              },
              time: '2021/09/04',
            },
          ],
        },
      ],
    };
  },

  components: {
    'oxd-comments': Comments,
  },
  methods: {
    clearFields() {
      this.InputEvent = false;
      this.ClickEvent = false;
    },
    onInput(value) {
      this.clearFields();
      this.value = value;
      this.InputEvent = true;
    },
    onClick(value, successCallback) {
      this.clearFields();
      this.ClickEvent = true;
      this.commentGroups[2].comments.push(
        {
          groupId: 'group-3',
          id: nanoid(6),
          content: value,
          user: {
            id: nanoid(4),
            commenterName: 'Gayan Sandamal',
          },
          time: '2022/08/07',
        }
      );
      successCallback();
    },
  },
};
</script>
