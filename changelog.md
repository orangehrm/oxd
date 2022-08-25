2022-08-16 - 8a27adb9dfff1bbe7324caedbce570b0a6f25687 - Form/Form.vue, focus-first-element/index.ts - focus fist element not return back to correct element

2022-08-14 - 87ed14348cc352d130fc59f79250129674e0c11a - Input/Time/TimeInput.vue - Added allowEmpty prop to enable placeholder text suppport, set HH-MM AM for default placeholder value and fix movelValue setting issue

2022-08-10 - f92f4a97da8b281f841c643da93ef0a74bc68ce5 - Icon/Icons.ts - Add 3 new icons

2022-08-05 - 544a46d0de236d1eb15fb5ee42dda2c9e338ac8a - Icon/Icons.ts - Add now oxd-duration icon

2022-08-04 - f07e979f20aa3d4779c3eaa57e4f63f81e7c2cad - Icon/Icons.ts - Change fill colour of oxd-add icon

2022-08-03 - b3553e6029bed67fc9ff472079d3ea56c5cd31cb - RadioPilLGroup - Changes to support InputField

2022-07-28 - 0b9810356ba78246cff49fbced59645a7ba55ee6 - tyles/\_utility.scss - Fix tooltip width

2022-07-26 - 96b3eebc64674b1ecea4c501c788ce4d9701f953 - components/CardTable/Cell/Dropdown - Added a secondary column for TableDropdown component.

2022-07-18 - 9cdc47a69c2bb8bafbb8a55eeeded20ffb2ba7fb - components/TableSidebar/TableSidebar - Made secondary header action button color changeable with style prop.

2022-07-16 - e38bd333495ee2afea19b06676e83a405aa98172 - components/List/List - passes a prop to tableSideBar component to render the Secondary header action button.

2022-07-25 - b9271bec74aad8cb48e4ff6bf0e0ba84a80912b6 - components/Table/ClassicTable - Classic Table - Add support for tooltips and rendering styled contents

2022-07-25 - 23d88c64daee0475d64f9f1f8d2a3b8184ff7864 - styles/\_utility.scss - Show tool tips in multi line if the content is too lengthy

2022-07-20 - b7038ebe7ef9a2ab5c513ad2c7f1a00f6d31c8af - components/Table/ClassicTable - Fixing column widths in oxd-classic-table

2022-07-19 - 0dbfe9656449b2c80b09b09e05ec779c0ea8a301 - components/src/core/components/CardTable/Cell/actions.scss - Remove extra padding and in components/src/core/components/List/list.scss - Remove the extra padding and if there is a left pannel, it will add 1rem extra padding to the left

2022-07-11 - 983922db066fe3298f70e5be1b42e8fdf9aff2cd - components/Input/Time - changes to functionality and style of Time Input and Picker

2022-07-08 - 2d7295d529ac95349ebe163cfb8ffe2aef6ba128 - components/src/core/components/CardTable/Table/table.scss - Change the header padding and in components/src/core/components/List/list.scss - Fix the card padding is not equal in left and right sides issue

2022-06-30 - 0f6416adf5331113ba1741b95a9e00c5a673e2c1 - components/CardTable/Cell/\_variables.scss, actions.scss - Change the action button gap according to oxd-guide and in components/TableFilter/table-filter.scss - Action buttons moved further to the right

2022-06-30 - 8378af0e1a2dc9182389dc0f43ff9dd8d22e0682 - components/Icon/Icons.ts, components/Icon/Icons.ts, - this refectoring effects to change the colour of the oxd-calendar icon

2022-06-28 - 424bfb945f611fc0eb875299196452f7c4bf9350 - components/Input/InputField.vue, components/Input/InputGroup.vue - this refectoring effects to label help text and hint. Need to test and correct the usage

2022-06-21 - 424bfb945f611fc0eb875299196452f7c4bf9350 - components/Input/RadioInput.vue - Focus style changed

2022-06-17 - 76707a16abb47778eca8b30784ccd82ae851cf47 - components/List/list.scss - Fixing the issue of When changing the resolutions with "No data found" screen in leave type ,it shows a gap between 2 panels

2022-06-16 - aff5d11f5a3a65a227df1053a959355d959a4348 - components/Input/SwitchInput.vue - css only change to increase space between switch label and switch to 15px.

2022-06-13 - 146f216bd9e2ae408eced6af09fe5c937185f20f - components/List/list.scss - Fix the position of 'No Data Found' icon in the List component

2022-06-11 - d54e259faa978699db974f1113f8c470f5bc1590 - InputGroup.vue - Input label icon size related styles changed. Check any places where input field label has an icon.

2022-06-10 - 78f3c1344de36cf5d95fe13c6e91c8c1147eccba - Input.vue - Added icon suppport for the input text field. Can be affected to the other places which use oxd-input. Date input, text area, time, checkbox, select, multiselect, autocomplete

2022-06-03 - e45f6bee3abf87ffc71b9265746d2d372a53253f - Label.vue - Explicitly set .oxd-label margin to zero, since it's getting overridden by angular application styles.

2022-06-02 - dbc3b27a1b82ef7a5bf485a37b0f0332404dcd92 - List.vue - Added changes make QuickSearch, Pagination and leftSideBar optional. No need to send empty values for these props hereafter.

2022-05-31 - 47b230b2ae9fad2a68033c6de25a0dba048416f0 - Divider.vue - Applied in BuzzShareViewer.vue, BuzzCreatePost.vue, BuzzFileUploadModal.vue, BuzzImageViewer.vue, BuzzPost.vue, CommentList.vue, KudosPoost.vue, VideoPost.vue, CandidateProfile.vue, AddNewFolderDialogue.vue, AddNewReportDialogue.vue, ReportsCatalogue.vue in the codebase.

2022-04-27 - 142465669cff13509290ca84ea9914cdfad613b8 - AutocompleteInput.vue - cleared options each on every search initiation to refrain from showing old list items untill the API request resolves.

2022-04-19 - 64859152abe759529d145b96af6bcdf232501517 - AutocompleteInput.vue - Added translation to placeholder, imported translationMixin and updated unit tests [autocomplete-input.spec.ts, quicksearch-input.spec.ts]
