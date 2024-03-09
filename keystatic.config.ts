import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'slug',
      path: 'src/content/posts/*',
      format: { contentField: 'content', data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        pubDate: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true }
        }),
        description: fields.text({ label: 'Description' }),
        author: fields.text({ label: 'Author' }),
        image: fields.object({
          url: fields.text({ label: 'URL' }),
          alt: fields.text({ label: 'Alt' }),
        }, { label: 'OG Image' }),
        slug: fields.text({
          label: 'Slug',
          validation: { isRequired: true }
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (x) => x.value }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
