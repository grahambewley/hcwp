export default {
  name: 'asset',
  title: 'Asset',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
        metadata: [
          'exif',
        ],
      },
    },
    {
      title: 'Collection',
      name: 'collection',
      type: 'reference',
      to: [{type: 'collection'}]
    },
  ],
}
