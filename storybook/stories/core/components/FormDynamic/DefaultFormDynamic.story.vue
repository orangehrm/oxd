<template>
  <oxd-form-dynamic :form="formConfigs"></oxd-form-dynamic>
</template>

<script>
import {defineComponent, ref} from 'vue';
import FormDynamic from '@orangehrm/oxd/core/components/FormDynamic/FormDynamic';

export default defineComponent({
  name: 'DefaultFormDynamic',
  components: {
    'oxd-form-dynamic': FormDynamic,
  },
  setup() {
    const jobTitles = [
      {
        "id": "1",
        "jobTitleName": "Accompanist",
        "jobDescription": "Accompanist Description",
        "note": "Accompanist Note",
        "isDeleted": "0",
        "label": "Accompanist"
      },
      {
        "id": "14",
        "jobTitleName": "Accountant",
        "jobDescription": "Accountant Description",
        "note": "Accountant Note",
        "isDeleted": "0",
        "label": "Accountant"
      },
      {
        "id": "15",
        "jobTitleName": "Accounting Assistant",
        "jobDescription": "Accounting Assistant Description",
        "note": "Accounting Assistant Note",
        "isDeleted": "0",
        "label": "Accounting Assistant"
      },
      {
        "id": "16",
        "jobTitleName": "Accounting Clerk",
        "jobDescription": "Accounting Clerk Description",
        "note": "Accounting Clerk Note",
        "isDeleted": "0",
        "label": "Accounting Clerk"
      },
      {
        "id": "17",
        "jobTitleName": "Accounts Payable Specialist",
        "jobDescription": "Accounts Payable Specialist Description",
        "note": "Accounts Payable Specialist Note",
        "isDeleted": "0",
        "label": "Accounts Payable Specialist"
      },
      {
        "id": "18",
        "jobTitleName": "Accounts Rec/Pay Clerk",
        "jobDescription": "Accounts Rec/Pay Clerk Description",
        "note": "Accounts Rec/Pay Clerk Note",
        "isDeleted": "0",
        "label": "Accounts Rec/Pay Clerk"
      },
      {
        "id": "76",
        "jobTitleName": "Administrative Aide",
        "jobDescription": "Administrative Aide Description",
        "note": "Administrative Aide Note",
        "isDeleted": "0",
        "label": "Administrative Aide"
      },
      {
        "id": "77",
        "jobTitleName": "Administrative Assistant",
        "jobDescription": "Administrative Assistant Description",
        "note": "Administrative Assistant Note",
        "isDeleted": "0",
        "label": "Administrative Assistant"
      },
      {
        "id": "78",
        "jobTitleName": "Administrative Secretary",
        "jobDescription": "Administrative Secretary Description",
        "note": "Administrative Secretary Note",
        "isDeleted": "0",
        "label": "Administrative Secretary"
      },
      {
        "id": "79",
        "jobTitleName": "Administrative Services Assistant",
        "jobDescription": "Administrative Services Assistant Description",
        "note": "Administrative Services Assistant Note",
        "isDeleted": "0",
        "label": "Administrative Services Assistant"
      },
      {
        "id": "2",
        "jobTitleName": "Art Model",
        "jobDescription": "Art Model Description",
        "note": "Art Model Note",
        "isDeleted": "0",
        "label": "Art Model"
      },
      {
        "id": "19",
        "jobTitleName": "Assistant Auditor",
        "jobDescription": "Assistant Auditor Description",
        "note": "Assistant Auditor Note",
        "isDeleted": "0",
        "label": "Assistant Auditor"
      },
      {
        "id": "20",
        "jobTitleName": "Assistant Bursar",
        "jobDescription": "Assistant Bursar Description",
        "note": "Assistant Bursar Note",
        "isDeleted": "0",
        "label": "Assistant Bursar"
      },
      {
        "id": "21",
        "jobTitleName": "Assistant Business Manager",
        "jobDescription": "Assistant Business Manager Description",
        "note": "Assistant Business Manager Note",
        "isDeleted": "0",
        "label": "Assistant Business Manager"
      },
      {
        "id": "80",
        "jobTitleName": "Assistant Coordinator",
        "jobDescription": "Assistant Coordinator Description",
        "note": "Assistant Coordinator Note",
        "isDeleted": "0",
        "label": "Assistant Coordinator"
      },
      {
        "id": "81",
        "jobTitleName": "Assistant Field Advisor",
        "jobDescription": "Assistant Field Advisor Description",
        "note": "Assistant Field Advisor Note",
        "isDeleted": "0",
        "label": "Assistant Field Advisor"
      },
      {
        "id": "82",
        "jobTitleName": "Assistant to Dean",
        "jobDescription": "Assistant to Dean Description",
        "note": "Assistant to Dean Note",
        "isDeleted": "0",
        "label": "Assistant to Dean"
      },
      {
        "id": "83",
        "jobTitleName": "Assistant to the Associate Dean",
        "jobDescription": "Assistant to the Associate Dean Description",
        "note": "Assistant to the Associate Dean Note",
        "isDeleted": "0",
        "label": "Assistant to the Associate Dean"
      },
      {
        "id": "84",
        "jobTitleName": "Assistant to the Chair",
        "jobDescription": "Assistant to the Chair Description",
        "note": "Assistant to the Chair Note",
        "isDeleted": "0",
        "label": "Assistant to the Chair"
      },
      {
        "id": "85",
        "jobTitleName": "Assistant to the Chancellor",
        "jobDescription": "Assistant to the Chancellor Description",
        "note": "Assistant to the Chancellor Note",
        "isDeleted": "0",
        "label": "Assistant to the Chancellor"
      },
      {
        "id": "86",
        "jobTitleName": "Assistant to the Dean",
        "jobDescription": "Assistant to the Dean Description",
        "note": "Assistant to the Dean Note",
        "isDeleted": "0",
        "label": "Assistant to the Dean"
      },
      {
        "id": "87",
        "jobTitleName": "Assistant to the Director",
        "jobDescription": "Assistant to the Director Description",
        "note": "Assistant to the Director Note",
        "isDeleted": "0",
        "label": "Assistant to the Director"
      },
      {
        "id": "22",
        "jobTitleName": "Assistant to the Treasurer",
        "jobDescription": "Assistant to the Treasurer Description",
        "note": "Assistant to the Treasurer Note",
        "isDeleted": "0",
        "label": "Assistant to the Treasurer"
      },
      {
        "id": "88",
        "jobTitleName": "Assistant to the Vice Chancellor",
        "jobDescription": "Assistant to the Vice Chancellor Description",
        "note": "Assistant to the Vice Chancellor Note",
        "isDeleted": "0",
        "label": "Assistant to the Vice Chancellor"
      },
      {
        "id": "23",
        "jobTitleName": "Assistant Treasurer",
        "jobDescription": "Assistant Treasurer Description",
        "note": "Assistant Treasurer Note",
        "isDeleted": "0",
        "label": "Assistant Treasurer"
      },
      {
        "id": "24",
        "jobTitleName": "Associate Auditor",
        "jobDescription": "Associate Auditor Description",
        "note": "Associate Auditor Note",
        "isDeleted": "0",
        "label": "Associate Auditor"
      },
      {
        "id": "25",
        "jobTitleName": "Associate Bursar",
        "jobDescription": "Associate Bursar Description",
        "note": "Associate Bursar Note",
        "isDeleted": "0",
        "label": "Associate Bursar"
      },
      {
        "id": "89",
        "jobTitleName": "Associate Coordinator",
        "jobDescription": "Associate Coordinator Description",
        "note": "Associate Coordinator Note",
        "isDeleted": "0",
        "label": "Associate Coordinator"
      },
      {
        "id": "26",
        "jobTitleName": "Associate Treasurer",
        "jobDescription": "Associate Treasurer Description",
        "note": "Associate Treasurer Note",
        "isDeleted": "0",
        "label": "Associate Treasurer"
      },
      {
        "id": "27",
        "jobTitleName": "Audit Clerk",
        "jobDescription": "Audit Clerk Description",
        "note": "Audit Clerk Note",
        "isDeleted": "0",
        "label": "Audit Clerk"
      },
      {
        "id": "28",
        "jobTitleName": "Auditor",
        "jobDescription": "Auditor Description",
        "note": "Auditor Note",
        "isDeleted": "0",
        "label": "Auditor"
      },
      {
        "id": "90",
        "jobTitleName": "Benefits Assistant",
        "jobDescription": "Benefits Assistant Description",
        "note": "Benefits Assistant Note",
        "isDeleted": "0",
        "label": "Benefits Assistant"
      },
      {
        "id": "91",
        "jobTitleName": "Benefits Specialist",
        "jobDescription": "Benefits Specialist Description",
        "note": "Benefits Specialist Note",
        "isDeleted": "0",
        "label": "Benefits Specialist"
      },
      {
        "id": "29",
        "jobTitleName": "Bookkeeper",
        "jobDescription": "Bookkeeper Description",
        "note": "Bookkeeper Note",
        "isDeleted": "0",
        "label": "Bookkeeper"
      },
      {
        "id": "30",
        "jobTitleName": "Budget Analyst",
        "jobDescription": "Budget Analyst Description",
        "note": "Budget Analyst Note",
        "isDeleted": "0",
        "label": "Budget Analyst"
      },
      {
        "id": "31",
        "jobTitleName": "Budget Assistant",
        "jobDescription": "Budget Assistant Description",
        "note": "Budget Assistant Note",
        "isDeleted": "0",
        "label": "Budget Assistant"
      },
      {
        "id": "32",
        "jobTitleName": "Budget Clerk",
        "jobDescription": "Budget Clerk Description",
        "note": "Budget Clerk Note",
        "isDeleted": "0",
        "label": "Budget Clerk"
      },
      {
        "id": "33",
        "jobTitleName": "Budget Coordinator",
        "jobDescription": "Budget Coordinator Description",
        "note": "Budget Coordinator Note",
        "isDeleted": "0",
        "label": "Budget Coordinator"
      },
      {
        "id": "34",
        "jobTitleName": "Budget Director",
        "jobDescription": "Budget Director Description",
        "note": "Budget Director Note",
        "isDeleted": "0",
        "label": "Budget Director"
      },
      {
        "id": "35",
        "jobTitleName": "Bursar",
        "jobDescription": "Bursar Description",
        "note": "Bursar Note",
        "isDeleted": "0",
        "label": "Bursar"
      },
      {
        "id": "36",
        "jobTitleName": "Business Assistant",
        "jobDescription": "Business Assistant Description",
        "note": "Business Assistant Note",
        "isDeleted": "0",
        "label": "Business Assistant"
      },
      {
        "id": "37",
        "jobTitleName": "Business Manager",
        "jobDescription": "Business Manager Description",
        "note": "Business Manager Note",
        "isDeleted": "0",
        "label": "Business Manager"
      },
      {
        "id": "92",
        "jobTitleName": "Buyer",
        "jobDescription": "Buyer Description",
        "note": "Buyer Note",
        "isDeleted": "0",
        "label": "Buyer"
      },
      {
        "id": "93",
        "jobTitleName": "Buyerâ€™s Assistant",
        "jobDescription": "Buyerâ€™s Assistant Description",
        "note": "Buyerâ€™s Assistant Note",
        "isDeleted": "0",
        "label": "Buyerâ€™s Assistant"
      },
      {
        "id": "38",
        "jobTitleName": "Campus Cashier",
        "jobDescription": "Campus Cashier Description",
        "note": "Campus Cashier Note",
        "isDeleted": "0",
        "label": "Campus Cashier"
      },
      {
        "id": "94",
        "jobTitleName": "Clerk",
        "jobDescription": "Clerk Description",
        "note": "Clerk Note",
        "isDeleted": "0",
        "label": "Clerk"
      },
      {
        "id": "95",
        "jobTitleName": "Clerk-Typist",
        "jobDescription": "Clerk-Typist Description",
        "note": "Clerk-Typist Note",
        "isDeleted": "0",
        "label": "Clerk-Typist"
      },
      {
        "id": "96",
        "jobTitleName": "Clinic Receptionist",
        "jobDescription": "Clinic Receptionist Description",
        "note": "Clinic Receptionist Note",
        "isDeleted": "0",
        "label": "Clinic Receptionist"
      },
      {
        "id": "39",
        "jobTitleName": "Collections Clerk",
        "jobDescription": "Collections Clerk Description",
        "note": "Collections Clerk Note",
        "isDeleted": "0",
        "label": "Collections Clerk"
      },
      {
        "id": "97",
        "jobTitleName": "Compensation Specialist",
        "jobDescription": "Compensation Specialist Description",
        "note": "Compensation Specialist Note",
        "isDeleted": "0",
        "label": "Compensation Specialist"
      },
      {
        "id": "98",
        "jobTitleName": "Conference Assistant",
        "jobDescription": "Conference Assistant Description",
        "note": "Conference Assistant Note",
        "isDeleted": "0",
        "label": "Conference Assistant"
      },
      {
        "id": "99",
        "jobTitleName": "Conference Specialist",
        "jobDescription": "Conference Specialist Description",
        "note": "Conference Specialist Note",
        "isDeleted": "0",
        "label": "Conference Specialist"
      },
      {
        "id": "40",
        "jobTitleName": "Contract Coordinator",
        "jobDescription": "Contract Coordinator Description",
        "note": "Contract Coordinator Note",
        "isDeleted": "0",
        "label": "Contract Coordinator"
      },
      {
        "id": "41",
        "jobTitleName": "Controller",
        "jobDescription": "Controller Description",
        "note": "Controller Note",
        "isDeleted": "0",
        "label": "Controller"
      },
      {
        "id": "100",
        "jobTitleName": "Coordinator",
        "jobDescription": "Coordinator Description",
        "note": "Coordinator Note",
        "isDeleted": "0",
        "label": "Coordinator"
      },
      {
        "id": "3",
        "jobTitleName": "Curator",
        "jobDescription": "Curator Description",
        "note": "Curator Note",
        "isDeleted": "0",
        "label": "Curator"
      },
      {
        "id": "4",
        "jobTitleName": "Demonstration Teacher",
        "jobDescription": "Demonstration Teacher Description",
        "note": "Demonstration Teacher Note",
        "isDeleted": "0",
        "label": "Demonstration Teacher"
      },
      {
        "id": "5",
        "jobTitleName": "Faculty Associate",
        "jobDescription": "Faculty Associate Description",
        "note": "Faculty Associate Note",
        "isDeleted": "0",
        "label": "Faculty Associate"
      },
      {
        "id": "42",
        "jobTitleName": "Fee Control Clerk",
        "jobDescription": "Fee Control Clerk Description",
        "note": "Fee Control Clerk Note",
        "isDeleted": "0",
        "label": "Fee Control Clerk"
      },
      {
        "id": "43",
        "jobTitleName": "Fee Control Supervisor",
        "jobDescription": "Fee Control Supervisor Description",
        "note": "Fee Control Supervisor Note",
        "isDeleted": "0",
        "label": "Fee Control Supervisor"
      },
      {
        "id": "44",
        "jobTitleName": "Fees Cashier",
        "jobDescription": "Fees Cashier Description",
        "note": "Fees Cashier Note",
        "isDeleted": "0",
        "label": "Fees Cashier"
      },
      {
        "id": "45",
        "jobTitleName": "Financial Analyst",
        "jobDescription": "Financial Analyst Description",
        "note": "Financial Analyst Note",
        "isDeleted": "0",
        "label": "Financial Analyst"
      },
      {
        "id": "46",
        "jobTitleName": "Financial Specialist",
        "jobDescription": "Financial Specialist Description",
        "note": "Financial Specialist Note",
        "isDeleted": "0",
        "label": "Financial Specialist"
      },
      {
        "id": "47",
        "jobTitleName": "Financial System Analyst",
        "jobDescription": "Financial System Analyst Description",
        "note": "Financial System Analyst Note",
        "isDeleted": "0",
        "label": "Financial System Analyst"
      },
      {
        "id": "48",
        "jobTitleName": "Grants & Contracts Clerk",
        "jobDescription": "Grants & Contracts Clerk Description",
        "note": "Grants & Contracts Clerk Note",
        "isDeleted": "0",
        "label": "Grants & Contracts Clerk"
      },
      {
        "id": "49",
        "jobTitleName": "Grants & Contracts Specialist",
        "jobDescription": "Grants & Contracts Specialist Description",
        "note": "Grants & Contracts Specialist Note",
        "isDeleted": "0",
        "label": "Grants & Contracts Specialist"
      },
      {
        "id": "50",
        "jobTitleName": "Investment Officer",
        "jobDescription": "Investment Officer Description",
        "note": "Investment Officer Note",
        "isDeleted": "0",
        "label": "Investment Officer"
      },
      {
        "id": "6",
        "jobTitleName": "Laboratory Preparator",
        "jobDescription": "Laboratory Preparator Description",
        "note": "Laboratory Preparator Note",
        "isDeleted": "0",
        "label": "Laboratory Preparator"
      },
      {
        "id": "51",
        "jobTitleName": "Loan Clerk",
        "jobDescription": "Loan Clerk Description",
        "note": "Loan Clerk Note",
        "isDeleted": "0",
        "label": "Loan Clerk"
      },
      {
        "id": "52",
        "jobTitleName": "Management Analyst",
        "jobDescription": "Management Analyst Description",
        "note": "Management Analyst Note",
        "isDeleted": "0",
        "label": "Management Analyst"
      },
      {
        "id": "7",
        "jobTitleName": "Museum Educator",
        "jobDescription": "Museum Educator Description",
        "note": "Museum Educator Note",
        "isDeleted": "0",
        "label": "Museum Educator"
      },
      {
        "id": "8",
        "jobTitleName": "Non-Credit Lecturer",
        "jobDescription": "Non-Credit Lecturer Description",
        "note": "Non-Credit Lecturer Note",
        "isDeleted": "0",
        "label": "Non-Credit Lecturer"
      },
      {
        "id": "53",
        "jobTitleName": "Payroll Assistant",
        "jobDescription": "Payroll Assistant Description",
        "note": "Payroll Assistant Note",
        "isDeleted": "0",
        "label": "Payroll Assistant"
      },
      {
        "id": "54",
        "jobTitleName": "Payroll Clerk",
        "jobDescription": "Payroll Clerk Description",
        "note": "Payroll Clerk Note",
        "isDeleted": "0",
        "label": "Payroll Clerk"
      },
      {
        "id": "55",
        "jobTitleName": "Payroll Coordinator",
        "jobDescription": "Payroll Coordinator Description",
        "note": "Payroll Coordinator Note",
        "isDeleted": "0",
        "label": "Payroll Coordinator"
      },
      {
        "id": "56",
        "jobTitleName": "Senior Accountant",
        "jobDescription": "Senior Accountant Description",
        "note": "Senior Accountant Note",
        "isDeleted": "0",
        "label": "Senior Accountant"
      },
      {
        "id": "57",
        "jobTitleName": "Senior Accounting Clerk",
        "jobDescription": "Senior Accounting Clerk Description",
        "note": "Senior Accounting Clerk Note",
        "isDeleted": "0",
        "label": "Senior Accounting Clerk"
      },
      {
        "id": "58",
        "jobTitleName": "Senior Accounts Rec/Pay Clerk",
        "jobDescription": "Senior Accounts Rec/Pay Clerk Description",
        "note": "Senior Accounts Rec/Pay Clerk Note",
        "isDeleted": "0",
        "label": "Senior Accounts Rec/Pay Clerk"
      },
      {
        "id": "59",
        "jobTitleName": "Senior Audit Clerk",
        "jobDescription": "Senior Audit Clerk Description",
        "note": "Senior Audit Clerk Note",
        "isDeleted": "0",
        "label": "Senior Audit Clerk"
      },
      {
        "id": "60",
        "jobTitleName": "Senior Auditor",
        "jobDescription": "Senior Auditor Description",
        "note": "Senior Auditor Note",
        "isDeleted": "0",
        "label": "Senior Auditor"
      },
      {
        "id": "61",
        "jobTitleName": "Senior Bookkeeper",
        "jobDescription": "Senior Bookkeeper Description",
        "note": "Senior Bookkeeper Note",
        "isDeleted": "0",
        "label": "Senior Bookkeeper"
      },
      {
        "id": "62",
        "jobTitleName": "Senior Budget Assistant",
        "jobDescription": "Senior Budget Assistant Description",
        "note": "Senior Budget Assistant Note",
        "isDeleted": "0",
        "label": "Senior Budget Assistant"
      },
      {
        "id": "63",
        "jobTitleName": "Senior Budget Clerk",
        "jobDescription": "Senior Budget Clerk Description",
        "note": "Senior Budget Clerk Note",
        "isDeleted": "0",
        "label": "Senior Budget Clerk"
      },
      {
        "id": "64",
        "jobTitleName": "Senior Collections Clerk",
        "jobDescription": "Senior Collections Clerk Description",
        "note": "Senior Collections Clerk Note",
        "isDeleted": "0",
        "label": "Senior Collections Clerk"
      },
      {
        "id": "65",
        "jobTitleName": "Senior Contract Coordinator     ",
        "jobDescription": "Senior Contract Coordinator      Description",
        "note": "Senior Contract Coordinator      Note",
        "isDeleted": "0",
        "label": "Senior Contract Coordinator     "
      },
      {
        "id": "66",
        "jobTitleName": "Senior Fee Control Clerk",
        "jobDescription": "Senior Fee Control Clerk Description",
        "note": "Senior Fee Control Clerk Note",
        "isDeleted": "0",
        "label": "Senior Fee Control Clerk"
      },
      {
        "id": "67",
        "jobTitleName": "Senior Fees Cashier",
        "jobDescription": "Senior Fees Cashier Description",
        "note": "Senior Fees Cashier Note",
        "isDeleted": "0",
        "label": "Senior Fees Cashier"
      },
      {
        "id": "68",
        "jobTitleName": "Senior Grants & Contracts Clerk",
        "jobDescription": "Senior Grants & Contracts Clerk Description",
        "note": "Senior Grants & Contracts Clerk Note",
        "isDeleted": "0",
        "label": "Senior Grants & Contracts Clerk"
      },
      {
        "id": "69",
        "jobTitleName": "Senior Loan Clerk",
        "jobDescription": "Senior Loan Clerk Description",
        "note": "Senior Loan Clerk Note",
        "isDeleted": "0",
        "label": "Senior Loan Clerk"
      },
      {
        "id": "70",
        "jobTitleName": "Senior Management Analyst",
        "jobDescription": "Senior Management Analyst Description",
        "note": "Senior Management Analyst Note",
        "isDeleted": "0",
        "label": "Senior Management Analyst"
      },
      {
        "id": "71",
        "jobTitleName": "Senior Payroll Clerk",
        "jobDescription": "Senior Payroll Clerk Description",
        "note": "Senior Payroll Clerk Note",
        "isDeleted": "0",
        "label": "Senior Payroll Clerk"
      },
      {
        "id": "9",
        "jobTitleName": "Senior Teaching Laboratories/Tutoring Specialist",
        "jobDescription": "Senior Teaching Laboratories/Tutoring Specialist Description",
        "note": "Senior Teaching Laboratories/Tutoring Specialist Note",
        "isDeleted": "0",
        "label": "Senior Teaching Laboratories/Tutoring Specialist"
      },
      {
        "id": "10",
        "jobTitleName": "Special Instructor",
        "jobDescription": "Special Instructor Description",
        "note": "Special Instructor Note",
        "isDeleted": "0",
        "label": "Special Instructor"
      },
      {
        "id": "72",
        "jobTitleName": "Student Fees Supervisor",
        "jobDescription": "Student Fees Supervisor Description",
        "note": "Student Fees Supervisor Note",
        "isDeleted": "0",
        "label": "Student Fees Supervisor"
      },
      {
        "id": "73",
        "jobTitleName": "Student Loan Fund Chief",
        "jobDescription": "Student Loan Fund Chief Description",
        "note": "Student Loan Fund Chief Note",
        "isDeleted": "0",
        "label": "Student Loan Fund Chief"
      },
      {
        "id": "11",
        "jobTitleName": "Teaching Laboratories/Tutoring Specialist",
        "jobDescription": "Teaching Laboratories/Tutoring Specialist Description",
        "note": "Teaching Laboratories/Tutoring Specialist Note",
        "isDeleted": "0",
        "label": "Teaching Laboratories/Tutoring Specialist"
      },
      {
        "id": "74",
        "jobTitleName": "Telecommunications Account Specialist",
        "jobDescription": "Telecommunications Account Specialist Description",
        "note": "Telecommunications Account Specialist Note",
        "isDeleted": "0",
        "label": "Telecommunications Account Specialist"
      },
      {
        "id": "75",
        "jobTitleName": "Trust Officer",
        "jobDescription": "Trust Officer Description",
        "note": "Trust Officer Note",
        "isDeleted": "0",
        "label": "Trust Officer"
      },
      {
        "id": "12",
        "jobTitleName": "Tutor",
        "jobDescription": "Tutor Description",
        "note": "Tutor Note",
        "isDeleted": "0",
        "label": "Tutor"
      },
      {
        "id": "13",
        "jobTitleName": "Tutor - Counselor",
        "jobDescription": "Tutor - Counselor Description",
        "note": "Tutor - Counselor Note",
        "isDeleted": "0",
        "label": "Tutor - Counselor"
      }
    ]
    const vacancies = [
      {
        "vacancyId": "12",
        "vacancyName": "Accountant vacancy",
        "hiringManager": [
          {
            "firstName": "Oscar",
            "middleName": "",
            "lastName": "Gutierrez",
            "empNumber": "59",
            "termination_id": null
          },
          {
            "firstName": "Kimberly",
            "middleName": "",
            "lastName": "Simmons",
            "empNumber": "62",
            "termination_id": null
          }
        ],
        "noOfPositions": "103",
        "definedTime": "2022-01-19 09:36:55",
        "updatedTime": "2022-01-19 09:36:55",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "18",
        "jobTitleCode": "14",
        "statusId": "1",
        "subunitId": "13",
        "id": "12",
        "label": "Accountant vacancy"
      },
      {
        "vacancyId": "13",
        "vacancyName": "Accounting Assistant vacancy",
        "hiringManager": [
          {
            "firstName": "Matt",
            "middleName": "",
            "lastName": "Riley",
            "empNumber": "55",
            "termination_id": null
          }
        ],
        "noOfPositions": "19",
        "definedTime": "2022-01-19 09:36:57",
        "updatedTime": "2022-01-19 09:36:57",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "33",
        "jobTitleCode": "15",
        "statusId": "1",
        "subunitId": "30",
        "id": "13",
        "label": "Accounting Assistant vacancy"
      },
      {
        "vacancyId": "14",
        "vacancyName": "Accounting Clerk vacancy",
        "hiringManager": [
          {
            "firstName": "Jordan",
            "middleName": "",
            "lastName": "Lawrence",
            "empNumber": "33",
            "termination_id": null
          }
        ],
        "noOfPositions": "67",
        "definedTime": "2022-01-19 09:36:59",
        "updatedTime": "2022-01-19 09:36:59",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "12",
        "jobTitleCode": "16",
        "statusId": "1",
        "subunitId": "27",
        "id": "14",
        "label": "Accounting Clerk vacancy"
      },
      {
        "vacancyId": "15",
        "vacancyName": "Accounts Payable Specialist vacancy",
        "hiringManager": [
          {
            "firstName": "Olivia",
            "middleName": "",
            "lastName": "Gomez",
            "empNumber": "36",
            "termination_id": null
          },
          {
            "firstName": "Molly",
            "middleName": "",
            "lastName": "Robinson",
            "empNumber": "37",
            "termination_id": null
          },
          {
            "firstName": "Gene",
            "middleName": "",
            "lastName": "Stevens",
            "empNumber": "93",
            "termination_id": null
          }
        ],
        "noOfPositions": "162",
        "definedTime": "2022-01-19 09:37:01",
        "updatedTime": "2022-01-19 09:37:01",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "4",
        "jobTitleCode": "17",
        "statusId": "1",
        "subunitId": "13",
        "id": "15",
        "label": "Accounts Payable Specialist vacancy"
      },
      {
        "vacancyId": "16",
        "vacancyName": "Accounts Rec/Pay Clerk vacancy",
        "hiringManager": [
          {
            "firstName": "Caroline",
            "middleName": "",
            "lastName": "Sutton",
            "empNumber": "47",
            "termination_id": null
          },
          {
            "firstName": "Rachel",
            "middleName": "",
            "lastName": "Alexander",
            "empNumber": "54",
            "termination_id": null
          }
        ],
        "noOfPositions": "189",
        "definedTime": "2022-01-19 09:37:02",
        "updatedTime": "2022-01-19 09:37:02",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "42",
        "jobTitleCode": "18",
        "statusId": "1",
        "subunitId": "38",
        "id": "16",
        "label": "Accounts Rec/Pay Clerk vacancy"
      },
      {
        "vacancyId": "1",
        "vacancyName": "Art Model vacancy",
        "hiringManager": [
          {
            "firstName": "Andrea",
            "middleName": "",
            "lastName": "Lucas",
            "empNumber": "90",
            "termination_id": null
          }
        ],
        "noOfPositions": "157",
        "definedTime": "2022-01-19 09:36:37",
        "updatedTime": "2022-01-19 09:36:37",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "50",
        "jobTitleCode": "2",
        "statusId": "1",
        "subunitId": "43",
        "id": "1",
        "label": "Art Model vacancy"
      },
      {
        "vacancyId": "17",
        "vacancyName": "Assistant Auditor vacancy",
        "hiringManager": [
          {
            "firstName": "Rene",
            "middleName": "",
            "lastName": "Williams",
            "empNumber": "4",
            "termination_id": null
          },
          {
            "firstName": "Same",
            "middleName": "",
            "lastName": "Lopez",
            "empNumber": "34",
            "termination_id": null
          },
          {
            "firstName": "Larry",
            "middleName": "",
            "lastName": "Stanley",
            "empNumber": "75",
            "termination_id": null
          }
        ],
        "noOfPositions": "13",
        "definedTime": "2022-01-19 09:37:04",
        "updatedTime": "2022-01-19 09:37:04",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "40",
        "jobTitleCode": "19",
        "statusId": "1",
        "subunitId": "43",
        "id": "17",
        "label": "Assistant Auditor vacancy"
      },
      {
        "vacancyId": "18",
        "vacancyName": "Assistant Bursar vacancy",
        "hiringManager": [
          {
            "firstName": "Clinton",
            "middleName": "",
            "lastName": "Ellis",
            "empNumber": "9",
            "termination_id": null
          }
        ],
        "noOfPositions": "32",
        "definedTime": "2022-01-19 09:37:06",
        "updatedTime": "2022-01-19 09:37:06",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "34",
        "jobTitleCode": "20",
        "statusId": "1",
        "subunitId": "35",
        "id": "18",
        "label": "Assistant Bursar vacancy"
      },
      {
        "vacancyId": "19",
        "vacancyName": "Assistant Business Manager vacancy",
        "hiringManager": [
          {
            "firstName": "Eddie",
            "middleName": "",
            "lastName": "Hunter",
            "empNumber": "14",
            "termination_id": null
          },
          {
            "firstName": "Adam",
            "middleName": "",
            "lastName": "Oliver",
            "empNumber": "35",
            "termination_id": null
          },
          {
            "firstName": "Thomas",
            "middleName": "",
            "lastName": "Jensen",
            "empNumber": "73",
            "termination_id": null
          }
        ],
        "noOfPositions": "58",
        "definedTime": "2022-01-19 09:37:08",
        "updatedTime": "2022-01-19 09:37:08",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "19",
        "jobTitleCode": "21",
        "statusId": "1",
        "subunitId": "50",
        "id": "19",
        "label": "Assistant Business Manager vacancy"
      },
      {
        "vacancyId": "2",
        "vacancyName": "Curator vacancy",
        "hiringManager": [
          {
            "firstName": "Phil",
            "middleName": "",
            "lastName": "Morales",
            "empNumber": "39",
            "termination_id": null
          },
          {
            "firstName": "Micheal",
            "middleName": "",
            "lastName": "Mitchell",
            "empNumber": "60",
            "termination_id": null
          },
          {
            "firstName": "Gene",
            "middleName": "",
            "lastName": "Stevens",
            "empNumber": "93",
            "termination_id": null
          }
        ],
        "noOfPositions": "129",
        "definedTime": "2022-01-19 09:36:38",
        "updatedTime": "2022-01-19 09:36:38",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "37",
        "jobTitleCode": "3",
        "statusId": "1",
        "subunitId": "13",
        "id": "2",
        "label": "Curator vacancy"
      },
      {
        "vacancyId": "3",
        "vacancyName": "Demonstration Teacher vacancy",
        "hiringManager": [
          {
            "firstName": "Francisco",
            "middleName": "",
            "lastName": "Rose",
            "empNumber": "28",
            "termination_id": null
          },
          {
            "firstName": "Allie",
            "middleName": "",
            "lastName": "Reyes",
            "empNumber": "50",
            "termination_id": null
          }
        ],
        "noOfPositions": "112",
        "definedTime": "2022-01-19 09:36:40",
        "updatedTime": "2022-01-19 09:36:40",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "2",
        "jobTitleCode": "4",
        "statusId": "1",
        "subunitId": "24",
        "id": "3",
        "label": "Demonstration Teacher vacancy"
      },
      {
        "vacancyId": "4",
        "vacancyName": "Laboratory Preparator vacancy",
        "hiringManager": [
          {
            "firstName": "Angela",
            "middleName": "",
            "lastName": "Fields",
            "empNumber": "13",
            "termination_id": null
          }
        ],
        "noOfPositions": "106",
        "definedTime": "2022-01-19 09:36:43",
        "updatedTime": "2022-01-19 09:36:43",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "18",
        "jobTitleCode": "6",
        "statusId": "1",
        "subunitId": "12",
        "id": "4",
        "label": "Laboratory Preparator vacancy"
      },
      {
        "vacancyId": "5",
        "vacancyName": "Museum Educator vacancy",
        "hiringManager": [
          {
            "firstName": "Gene",
            "middleName": "",
            "lastName": "Stevens",
            "empNumber": "93",
            "termination_id": null
          }
        ],
        "noOfPositions": "171",
        "definedTime": "2022-01-19 09:36:45",
        "updatedTime": "2022-01-19 09:36:45",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "37",
        "jobTitleCode": "7",
        "statusId": "1",
        "subunitId": "57",
        "id": "5",
        "label": "Museum Educator vacancy"
      },
      {
        "vacancyId": "20",
        "vacancyName": "No CV required",
        "hiringManager": [
          {
            "firstName": "Abbie",
            "middleName": "",
            "lastName": "Campbell",
            "empNumber": "30",
            "termination_id": null
          }
        ],
        "noOfPositions": null,
        "definedTime": "2022-01-25 10:59:00",
        "updatedTime": "2022-01-25 10:59:00",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "0",
        "locationId": "15",
        "jobTitleCode": "1",
        "statusId": "1",
        "subunitId": null,
        "id": "20",
        "label": "No CV required"
      },
      {
        "vacancyId": "6",
        "vacancyName": "Non-Credit Lecturer vacancy",
        "hiringManager": [
          {
            "firstName": "Jordan",
            "middleName": "",
            "lastName": "Lawrence",
            "empNumber": "33",
            "termination_id": null
          },
          {
            "firstName": "Keith",
            "middleName": "",
            "lastName": "Banks",
            "empNumber": "51",
            "termination_id": null
          }
        ],
        "noOfPositions": "160",
        "definedTime": "2022-01-19 09:36:46",
        "updatedTime": "2022-01-19 09:36:46",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "20",
        "jobTitleCode": "8",
        "statusId": "1",
        "subunitId": "2",
        "id": "6",
        "label": "Non-Credit Lecturer vacancy"
      },
      {
        "vacancyId": "7",
        "vacancyName": "Senior Teaching Laboratories/Tutoring Specialist vacancy",
        "hiringManager": [
          {
            "firstName": "Roland",
            "middleName": "",
            "lastName": "Sanders",
            "empNumber": "20",
            "termination_id": null
          },
          {
            "firstName": "Alberto",
            "middleName": "",
            "lastName": "Cooper",
            "empNumber": "100",
            "termination_id": null
          }
        ],
        "noOfPositions": "66",
        "definedTime": "2022-01-19 09:36:48",
        "updatedTime": "2022-01-19 09:36:48",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "41",
        "jobTitleCode": "9",
        "statusId": "1",
        "subunitId": "31",
        "id": "7",
        "label": "Senior Teaching Laboratories/Tutoring Specialist vacancy"
      },
      {
        "vacancyId": "8",
        "vacancyName": "Special Instructor vacancy",
        "hiringManager": [
          {
            "firstName": "Angela",
            "middleName": "",
            "lastName": "Fields",
            "empNumber": "13",
            "termination_id": null
          },
          {
            "firstName": "Same",
            "middleName": "",
            "lastName": "Lopez",
            "empNumber": "34",
            "termination_id": null
          }
        ],
        "noOfPositions": "178",
        "definedTime": "2022-01-19 09:36:49",
        "updatedTime": "2022-01-19 09:36:49",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "17",
        "jobTitleCode": "10",
        "statusId": "1",
        "subunitId": "26",
        "id": "8",
        "label": "Special Instructor vacancy"
      },
      {
        "vacancyId": "9",
        "vacancyName": "Teaching Laboratories/Tutoring Specialist vacancy",
        "hiringManager": [
          {
            "firstName": "Jen",
            "middleName": "",
            "lastName": "Walker",
            "empNumber": "10",
            "termination_id": null
          },
          {
            "firstName": "Rachel",
            "middleName": "",
            "lastName": "Freeman",
            "empNumber": "69",
            "termination_id": null
          },
          {
            "firstName": "Sophie",
            "middleName": "",
            "lastName": "Martin",
            "empNumber": "74",
            "termination_id": null
          }
        ],
        "noOfPositions": "7",
        "definedTime": "2022-01-19 09:36:51",
        "updatedTime": "2022-01-19 09:36:51",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "13",
        "jobTitleCode": "11",
        "statusId": "1",
        "subunitId": "59",
        "id": "9",
        "label": "Teaching Laboratories/Tutoring Specialist vacancy"
      },
      {
        "vacancyId": "11",
        "vacancyName": "Tutor - Counselor vacancy",
        "hiringManager": [
          {
            "firstName": "Kathy",
            "middleName": "",
            "lastName": "Owens",
            "empNumber": "52",
            "termination_id": null
          },
          {
            "firstName": "Marshall",
            "middleName": "",
            "lastName": "Carter",
            "empNumber": "79",
            "termination_id": null
          }
        ],
        "noOfPositions": "60",
        "definedTime": "2022-01-19 09:36:54",
        "updatedTime": "2022-01-19 09:36:54",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "8",
        "jobTitleCode": "13",
        "statusId": "1",
        "subunitId": "31",
        "id": "11",
        "label": "Tutor - Counselor vacancy"
      },
      {
        "vacancyId": "10",
        "vacancyName": "Tutor vacancy",
        "hiringManager": [
          {
            "firstName": "Florence",
            "middleName": "",
            "lastName": "Obrien",
            "empNumber": "6",
            "termination_id": null
          },
          {
            "firstName": "Ava",
            "middleName": "",
            "lastName": "Sanders",
            "empNumber": "15",
            "termination_id": null
          },
          {
            "firstName": "Calvin",
            "middleName": "",
            "lastName": "White",
            "empNumber": "81",
            "termination_id": null
          }
        ],
        "noOfPositions": "132",
        "definedTime": "2022-01-19 09:36:52",
        "updatedTime": "2022-01-19 09:36:52",
        "publishedTime": null,
        "description": null,
        "workflowId": "Default Vacancy Workflow",
        "guidelineId": null,
        "isTemplate": null,
        "requestConsent": "0",
        "isResumeRequired": "1",
        "locationId": "32",
        "jobTitleCode": "12",
        "statusId": "1",
        "subunitId": "24",
        "id": "10",
        "label": "Tutor vacancy"
      }
    ]
    const formConfigs = ref({
      columnsPerRow: 2,
      elements: [
        {
          label: 'Search Text',
          type: "input",
          props: {
            placeholder: "Search"
          },
          events: [
            {
              type: "input",
              identifier: "set-search-keyword"
            }
          ],
          rules: ["required"]
        },
        {
          label: 'Candidates',
          type: "autocomplete",
          props: {
            placeholder: 'Type for hints...',
            multiple: true,
            clear: true,
          }
        },
        {
          label: 'Job Title',
          type: "select",
          props: {
            "hide-dropdown-default-label": true,
            options: jobTitles
          }
        },
        {
          label: 'Job Vacancy',
          type: "select",
          props: {
            "hide-dropdown-default-label": true,
            options: vacancies
          }
        },
        {
          label: 'From',
          type: "date",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          label: 'To',
          type: "date",
          props: {
            placeholder: 'dd/mm/yyyy',
          }
        },
        {
          type: "switch",
          props: {
            "option-label": "Show Archived Candidates"
          }
        },
        {
          type: "switch",
          props: {
            "option-label": "Search Inside Resume"
          }
        },
        {
          type: "switch",
          props: {
            "option-label": "Show Active Candidates"
          }
        },
        {
          type: "switch",
          props: {
            "option-label": "Show Archived Candidates"
          }
        },
      ]
    })
    return {
      formConfigs,
    }
  }
});
</script>
