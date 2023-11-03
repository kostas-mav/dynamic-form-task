import { Form } from 'src/app/shared/components/form/form.component';

export const OTHER_FORM_SAMPLE: Form = {
  title: 'Other',
  inline: 8,
  groups: [
    {
      title: 'Information',
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
          defaultValue: 'Marios',
        },
        {
          title: 'Last name',
          name: 'lastname',
          type: 'text',
          required: true,
          order: 2,
          span: 3,
          defaultValue: 'Zafeiriou',
        },
      ],
    },
    {
      title: 'Your Issue',
      inline: 12,
      span: 12,
      controls: [
        {
          title: 'Description',
          name: 'description',
          type: 'textarea',
          required: true,
          order: 1,
          span: 12,
        },
      ],
    },
  ],
};
