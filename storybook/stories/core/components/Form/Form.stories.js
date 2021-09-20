/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
 
import DefaultForm from './DefaultForm.story.vue';
import AddJobTitle from './AddJobTitle.story.vue';
import CustomLabelForm from './CustomLabelForm.story.vue';
import ValidatableFrom from './ValidatableFrom.story.vue';
import DynamicValidatableFrom from './DynamicValidatableFrom.story.vue';
import GeneralInformation from './GeneralInformation.story.vue';
import InputGroupedForm from './InputGroupedForm.story.vue';
import AsyncValidatableFrom from './AsyncValidatableFrom.story.vue';

export default {
  title: 'Example/Form',
};

export const Default = () => DefaultForm;

export const CustomLabel = () => CustomLabelForm;

export const AddJobTitleForm = () => AddJobTitle;

export const FormWithValidation = () => ValidatableFrom;

export const DynamicFormWithValidation = () => DynamicValidatableFrom;

export const GeneralInformationForm = () => GeneralInformation;

export const InputGroupForm = () => InputGroupedForm;

export const FormWithAsyncValidation = () => AsyncValidatableFrom;
