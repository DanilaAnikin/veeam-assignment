export const defaultConfig: string = `{
  "title": "My Form",
  "fields": [
    {
      "name": "age",
      "label": "Age",
      "type": "numeric",
      "value": 30
    },
    {
      "name": "firstName",
      "label": "First Name",
      "type": "string",
      "value": "John"
    },
    {
      "name": "bio",
      "label": "Biography",
      "type": "multi-line",
      "value": "Enter your biography here..."
    },
    {
      "name": "subscribe",
      "label": "Subscribe",
      "type": "boolean",
      "value": true
    },
    {
      "name": "birthdate",
      "label": "Birthdate",
      "type": "date",
      "value": "2000-01-01"
    },
    {
      "name": "gender",
      "label": "Gender",
      "type": "enum",
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" }
      ],
      "value": "male"
    }
  ],
  "buttons": [
    { "text": "OK", "action": "ok" },
    { "text": "Cancel", "action": "cancel" },
    { "text": "Apply", "action": "apply" }
  ]
}`