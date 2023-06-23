import {mount} from '@vue/test-utils';
import SchemaForm from '@orangehrm/oxd/core/components/SchemaForm/SchemaForm.vue';
import useSchemaForm from '../../../../composables/useSchemaForm';
import {FormSchema} from '../types';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import TextArea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';

const options = [
  {
    id: 1,
    label: 'HR',
  },
  {
    id: 2,
    label: 'Admin',
  },
];

const syncFunction = function() {
  return options;
};

const formSchema: FormSchema = {
  name: 'FormDisable',
  disabled: true,
  layout: [
    {
      type: 'grid',
      props: {
        cols: 1,
      },
      children: {
        default: [
          {
            name: 'resume',
            label: 'Select resume',
            type: 'file',
          },
        ],
      },
    },
    {
      type: 'grid',
      props: {
        cols: 2,
      },
      children: {
        default: [
          {
            name: 'facebook',
            label: 'Facebook',
            type: 'input',
            visible: true,
            props: {
              imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
            },
          },
          {
            name: 'contactNumber',
            label: 'Contact Number',
            type: 'input',
          },
          {
            name: 'vacancy',
            label: 'Vacancy',
            type: 'select',
            props: {
              options: [
                {id: 1, label: 'Vaccancy One'},
                {id: 2, label: 'Vaccancy Two'},
              ],
            },
          },
          {
            name: 'user',
            label: 'Users',
            type: 'multiselect',
            value: [],
            props: {
              options: [
                {id: 1, label: 'HR'},
                {id: 2, label: 'Admin'},
              ],
            },
          },
          {
            name: 'autofocusUser',
            label: 'Search Users',
            type: 'autocomplete',
            value: [],
            props: {
              placeholder: 'test',
              autofocus: true,
              createOptions: syncFunction,
            },
          },
          {
            name: 'date',
            label: 'Date of Application',
            type: 'date',
          },
          {
            name: 'comment',
            label: 'Comment',
            type: 'textarea',
          },
        ],
      },
    },
    {
      type: 'action',
      style: {
        'margin-top': '0.5rem',
      },
      children: {
        default: [
          {
            name: 'submit',
            label: 'Submit',
            type: 'button',
            style: {
              'margin-left': '0.5rem',
            },
            props: {
              type: 'submit',
              displayType: 'secondary',
            },
          },
        ],
      },
    },
  ],
};
const {model, schema} = useSchemaForm(formSchema);

describe('SchemaForm.vue', () => {
  it('file input is disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(wrapper.find('.oxd-file-div--disabled')).toBeTruthy();
  });

  it('text, date  input are disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(
      wrapper.findComponent(Input).find('input').element.disabled,
    ).toBeTruthy();
  });

  it('select and multiselect input are disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(wrapper.find('.oxd-select-text--disabled')).toBeTruthy();
  });

  it('auto complete text input is disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(wrapper.find('.oxd-autocomplete-text-input--disabled')).toBeTruthy();
  });

  it('text area input is disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(
      wrapper.findComponent(TextArea).find('textarea').element.disabled,
    ).toBeTruthy();
  });

  it('submit button is disabled when the form is disabled', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        model: model,
      },
    });
    expect(wrapper.find('button').element.disabled).toBeTruthy();
  });
});
