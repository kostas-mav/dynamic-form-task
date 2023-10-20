import { Form } from 'src/app/dashboard/form/form.component';

export const SAMPLE: Form = {
  title: 'My Form 2',
  inline: 12,
  groups: [
    {
      title: 'Passport request',
      inline: 3,
      span: 12,
      controls: [
        {
          title: 'Type',
          name: 'requestType',
          type: 'text',
          required: true,
          readonly: true,
          span: 3,
          defaultValue: 'Passport renewal',
        },
      ],
    },
    {
      title: 'Passport',
      inline: 12,
      span: 12,
      controls: [
        {
          title: 'First name',
          name: 'name',
          type: 'text',
          required: true,
          order: 1,
          span: 3,
          defaultValue: 'John',
        },
        {
          title: 'Middle name',
          name: 'middleName',
          type: 'text',
          required: false,
          order: 2,
          span: 3,
          defaultValue: '',
        },
        {
          title: 'Last name',
          name: 'lastname',
          type: 'text',
          order: 3,
          span: 3,
          defaultValue: 'Doe',
        },
        {
          title: 'No.',
          name: 'no',
          type: 'text',
          required: true,
          order: 0,
          span: 3,
          defaultValue: 'GR 32412',
        },
      ],
    },
    {
      title: 'Location',
      inline: 8,
      span: 8,
      controls: [
        {
          title: 'Country',
          name: 'country',
          type: 'combobox',
          required: true,
          span: 4,
          defaultValue: 'Greece',
          data: ['Greece', 'Italy', 'Spain', 'Bulgaria', 'Turkey'],
        },
        {
          title: 'City',
          name: 'city',
          type: 'combobox',
          span: 4,
          defaultValue: 'Larissa',
          data: [
            'Athens',
            'Thessaloniki',
            'Istanbul',
            'Madrid',
            'Rome',
            'Florence',
          ],
        },
      ],
    },
    {
      title: 'Birth Day',
      inline: 4,
      span: 4,
      controls: [
        {
          title: 'Date',
          name: 'birth',
          type: 'date',
          required: true,
          span: 4,
        },
      ],
    },
  ],
};
