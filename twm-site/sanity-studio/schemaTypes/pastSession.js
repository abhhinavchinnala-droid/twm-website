import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pastSession',
  title: 'Previous Session / Past Event',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Session Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'date', title: 'Date', type: 'datetime'}),
    defineField({name: 'time', title: 'Time', type: 'string', description: 'e.g. 5:00 PM'}),
    defineField({name: 'venue', title: 'Venue', type: 'string'}),
    defineField({name: 'speaker', title: 'Speaker(s)', type: 'string'}),
    defineField({name: 'summary', title: 'Session Summary', type: 'text', rows: 5}),
    defineField({name: 'images', title: 'Event Photos', type: 'array', of: [{type: 'image', options: {hotspot: true}}],
      description: 'The first image is used as the card banner.'}),
    defineField({
      name: 'resources', title: 'Resources / Slides', type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'url', title: 'URL', type: 'url'},
      ]}],
    }),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Date (newest)', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'venue', media: 'images.0'}},
})
