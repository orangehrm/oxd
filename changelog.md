
2022-06-11 - d54e259faa978699db974f1113f8c470f5bc1590 - InputGroup.vue - Input label icon size related styles changed. Check any places where input field label has an icon.

2022-06-10 - 78f3c1344de36cf5d95fe13c6e91c8c1147eccba - Input.vue - Added icon suppport for the input text field. Can be affected to the other places which use oxd-input. Date input, text area,  time, checkbox, select, multiselect, autocomplete

2022-06-03 - e45f6bee3abf87ffc71b9265746d2d372a53253f - Label.vue - Explicitly set .oxd-label margin to zero, since it's getting overridden by angular application styles.

2022-06-02 - dbc3b27a1b82ef7a5bf485a37b0f0332404dcd92 - List.vue - Added changes make QuickSearch, Pagination and leftSideBar optional. No need to send empty values for these props hereafter.

2022-05-31 - 47b230b2ae9fad2a68033c6de25a0dba048416f0 - Divider.vue - Applied in BuzzShareViewer.vue, BuzzCreatePost.vue, BuzzFileUploadModal.vue, BuzzImageViewer.vue, BuzzPost.vue, CommentList.vue, KudosPoost.vue, VideoPost.vue, CandidateProfile.vue, AddNewFolderDialogue.vue, AddNewReportDialogue.vue, ReportsCatalogue.vue in the codebase.

2022-04-27 - 142465669cff13509290ca84ea9914cdfad613b8 - AutocompleteInput.vue - cleared options each on every search initiation to refrain from showing old list items untill the API request resolves.

2022-04-19 - 64859152abe759529d145b96af6bcdf232501517 - AutocompleteInput.vue - Added translation to placeholder, imported translationMixin and updated unit tests [autocomplete-input.spec.ts, quicksearch-input.spec.ts]