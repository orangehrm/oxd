import DefaultForm from './DefaultForm.story.vue';
import AddJobTitle from './AddJobTitle.story.vue';
import CustomLabelForm from './CustomLabelForm.story.vue';
import ValidatableFrom from './ValidatableFrom.story.vue';
import DynamicValidatableFrom from './DynamicValidatableFrom.story.vue';

export default {
  title: 'Example/Form',
};

export const Default = () => DefaultForm;

export const CustomLabel = () => CustomLabelForm;

export const AddJobTitleForm = () => AddJobTitle;

export const FormWithValidation = () => ValidatableFrom;

export const DynamicFormWithValidation = () => DynamicValidatableFrom;