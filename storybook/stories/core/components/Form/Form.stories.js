import DefaultForm from './DefaultForm.story.vue';
import AddJobTitle from './AddJobTitle.story.vue';
import CustomLabelForm from './CustomLabelForm.story.vue';
import ValidatableFrom from './ValidatableFrom.story.vue';
import DynamicValidatableFrom from './DynamicValidatableFrom.story.vue';
import GeneralInformation from './GeneralInformation.story.vue';
import InputGroupedForm from './InputGroupedForm.story.vue';
import AsyncValidatableForm from './AsyncValidatableForm.story.vue';
import CrossValidationForm from './CrossValidationForm.story.vue';

export default {
  title: 'Form',
};

export const Default = () => DefaultForm;

export const CustomLabel = () => CustomLabelForm;

export const AddJobTitleForm = () => AddJobTitle;

export const FormWithValidation = () => ValidatableFrom;

export const DynamicFormWithValidation = () => DynamicValidatableFrom;

export const GeneralInformationForm = () => GeneralInformation;

export const InputGroupForm = () => InputGroupedForm;

export const FormWithAsyncValidation = () => AsyncValidatableForm;

export const CrossValidation = () => CrossValidationForm;
