const headers = [
  {
    name: 'Personal',
    children: [
      {
        name: 'Employee Id',
        prop: 'employeeId',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Employee Last Name',
        prop: 'employeeLastname',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Employee First Name',
        prop: 'employeeFirstname',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Employee Middle Name',
        prop: 'employeeMiddlename',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Date of Birth',
        prop: 'empBirthday',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Nationality',
        prop: 'employeeNationality',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Gender',
        prop: 'empGender',
        size: 80,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Marital Status',
        prop: 'maritalStatus',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Driver License Number',
        prop: 'driversLicenseNumber',
        size: 240,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'License Expiry Date',
        prop: 'licenseExpiryDate',
        size: 135,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Other Id',
        prop: 'otherId',
        size: 100,
        pin: null,
        cellProperties: null,
      },
    ],
  },
  {
    name: 'Contact Details',
    children: [
      {
        name: 'Address',
        prop: 'address',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Home Telephone',
        prop: 'homeTelephone',
        size: 130,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Mobile',
        prop: 'mobile',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Work Telephone',
        prop: 'workTelephone',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Work Email',
        prop: 'workEmail',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Other Email',
        prop: 'otherEmail',
        size: 200,
        pin: null,
        cellProperties: null,
      },
    ],
  },
  {
    name: 'Emergency Contacts',
    children: [
      {
        name: 'Name',
        prop: 'ecname',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Home Telephone',
        prop: 'ecHomeTelephone',
        size: 130,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Work Telephone',
        prop: 'ecWorkTelephone',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Relationship',
        prop: 'ecRelationship',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Mobile',
        prop: 'ecMobile',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Name',
    prop: 'dependentName',
    size: 200,
    pin: null,
    cellProperties: {
      type: 'list',
    },
  },
  {
    name: 'Relationship',
    prop: 'dependentRelationship',
    size: 200,
    pin: null,
    cellProperties: {
      type: 'list',
    },
  },
  {
    name: 'Date of Birth',
    prop: 'dependentDateofBirth',
    size: 100,
    pin: null,
    cellProperties: {
      type: 'list',
    },
  },
  {
    name: 'Memberships',
    children: [
      {
        name: 'Membership',
        prop: 'membershipName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Subscription Paid By',
        prop: 'subscriptionPaidBy',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Subscription Amount',
        prop: 'subscriptionAmount',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Currency',
        prop: 'membershipCurrency',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Subscription Commence Date',
        prop: 'subscriptionCommenceDate',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Subscription Renewal Date',
        prop: 'subscriptionRenewalDate',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Work Experience',
    children: [
      {
        name: 'Company',
        prop: 'expCompany',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Job Title',
        prop: 'expJobTitle',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'From',
        prop: 'expFrom',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'To',
        prop: 'expTo',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Comment',
        prop: 'expComment',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Education',
    children: [
      {
        name: 'Level',
        prop: 'eduProgram',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Year',
        prop: 'eduYear',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Score',
        prop: 'eduGPAOrScore',
        size: 80,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Skills',
    children: [
      {
        name: 'Skill',
        prop: 'skill',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Years of Experience',
        prop: 'skillYearsOfExperience',
        size: 135,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Comments',
        prop: 'skillComments',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Languages',
    children: [
      {
        name: 'Language',
        prop: 'langName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Competency',
        prop: 'langCompetency',
        size: 130,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Comments',
        prop: 'langComments',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Fluency',
        prop: 'langFluency',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'License',
    children: [
      {
        name: 'License Type',
        prop: 'empLicenseType',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Issued Date',
        prop: 'empLicenseIssuedDate',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Expiry Date',
        prop: 'empLicenseExpiryDate',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Supervisors',
    children: [
      {
        name: 'First Name',
        prop: 'supervisorFirstName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Last Name',
        prop: 'supervisorLastName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Reporting Method',
        prop: 'supReportingMethod',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Subordinates',
    children: [
      {
        name: 'First Name',
        prop: 'subordinateFirstName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Last Name',
        prop: 'subordinateLastName',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Reporting Method',
        prop: 'subReportingMethod',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Salary',
    children: [
      {
        name: 'Pay Grade',
        prop: 'salPayGrade',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Salary Component',
        prop: 'salSalaryComponent',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Amount',
        prop: 'salAmount',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Comments',
        prop: 'salComments',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Pay Frequency',
        prop: 'salPayFrequency',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Currency',
        prop: 'salCurrency',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Direct Deposit Account Number',
        prop: 'ddAccountNumber',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Direct Deposit Account Type',
        prop: 'ddAccountType',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Direct Deposit Routing Number',
        prop: 'ddRoutingNumber',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Direct Deposit Amount',
        prop: 'ddAmount',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
  {
    name: 'Job',
    children: [
      {
        name: 'Contract Start Date',
        prop: 'empContStartDate',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Contract End Date',
        prop: 'empContEndDate',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Job Title',
        prop: 'empJobTitle',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Employment Status',
        prop: 'empEmploymentStatus',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Job Category',
        prop: 'empJobCategory',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Joined Date',
        prop: 'empJoinedDate',
        size: 100,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Sub Unit',
        prop: 'empSubUnit',
        size: 200,
        pin: null,
        cellProperties: null,
      },
      {
        name: 'Location',
        prop: 'empLocation',
        size: 200,
        pin: null,
        cellProperties: null,
      },
    ],
  },
  {
    name: 'Immigration',
    children: [
      {
        name: 'Number',
        prop: 'empPassportNo',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Issued Date',
        prop: 'empPassportIssuedDate',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Expiry Date',
        prop: 'empPassportExpiryDate',
        size: 100,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Eligibility Status',
        prop: 'empPassportEligibleStatus',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Issued By',
        prop: 'empPassportIssuedBy',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Eligibility Review Date',
        prop: 'empPassportEligibleReviewDate',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Comments',
        prop: 'empPassportComments',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
      {
        name: 'Document Type',
        prop: 'documentType',
        size: 200,
        pin: null,
        cellProperties: {
          type: 'list',
        },
      },
    ],
  },
];

const data = [
  {
    employeeId: '001',
    employeeLastname: 'Admin',
    employeeFirstname: 'OrangeHRM',
    employeeMiddlename: '',
    employeeNationality: null,
    maritalStatus: null,
    driversLicenseNumber: '',
    homeTelephone: null,
    mobile: null,
    workTelephone: null,
    workEmail: null,
    otherEmail: null,
    empJobTitle: null,
    empEmploymentStatus: null,
    empJobCategory: null,
    empSubUnit: null,
    empLocation: null,
    otherId: '',
    empBirthday: null,
    empGender: null,
    licenseExpiryDate: null,
    address: '',
    empContStartDate: null,
    empContEndDate: null,
    empJoinedDate: null,
    ecname: [],
    ecHomeTelephone: [
      '0112525051',
      '0112525051',
      '0112525051',
      '0112525051',
      '0112525051',
    ],
    ecWorkTelephone: [],
    ecRelationship: [],
    ecMobile: [],
    dependentName: ['Jason', 'Mathew'],
    dependentRelationship: ['Child', 'Child'],
    dependentDateofBirth: [],
    membershipName: [],
    subscriptionPaidBy: [],
    subscriptionAmount: [],
    membershipCurrency: [],
    subscriptionCommenceDate: [],
    subscriptionRenewalDate: [],
    expCompany: [],
    expJobTitle: [],
    expFrom: [],
    expTo: [],
    expComment: [],
    eduProgram: [],
    eduYear: [],
    eduGPAOrScore: [],
    skill: [],
    skillYearsOfExperience: [],
    skillComments: [],
    langName: [],
    langCompetency: [],
    langComments: [],
    langFluency: [],
    empLicenseType: [],
    empLicenseIssuedDate: [],
    empLicenseExpiryDate: [],
    supervisorFirstName: ['Ryan', 'Ben'],
    supervisorLastName: ['Raynolds', 'Stiller'],
    supReportingMethod: ['Direct', 'Indirect'],
    subordinateFirstName: [],
    subordinateLastName: [],
    subReportingMethod: [],
    salPayGrade: [],
    salSalaryComponent: [],
    salAmount: [],
    salComments: [],
    salPayFrequency: [],
    salCurrency: [],
    ddAccountNumber: [],
    ddAccountType: [],
    ddRoutingNumber: [],
    ddAmount: [],
    empPassportNo: [],
    empPassportIssuedDate: [],
    empPassportExpiryDate: [],
    empPassportEligibleStatus: [],
    empPassportIssuedBy: [],
    empPassportEligibleReviewDate: [],
    empPassportComments: [],
    documentType: [],
  },
];

export {headers, data};
