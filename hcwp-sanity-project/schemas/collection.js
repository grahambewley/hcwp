export default {
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
      {
        title: 'Name',
        name: 'name',
        type: 'string',
      },
      {
        title: 'Description',
        name: 'description',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        title: 'Date',
        name: 'date',
        type: 'date',
        options: {
          dateFormat: 'YYYY-MM-DD',
          calendarTodayLabel: 'Today'
        }
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
            source: 'name'
        }
      }
    ],
  }
  