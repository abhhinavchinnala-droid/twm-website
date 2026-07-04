import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Event Title', type: 'string', validation: r => r.required()}),
    defineField({name: 'banner', title: 'Event Banner', type: 'image', options: {hotspot: true}}),
    defineField({name: 'date', title: 'Date', type: 'datetime'}),
    defineField({name: 'time', title: 'Time', type: 'string', description: 'e.g. 5:00 PM'}),
    defineField({name: 'venue', title: 'Venue', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'registrationLink', title: 'Registration Link', type: 'url'}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Date', name: 'date', by: [{field: 'date', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'venue', media: 'banner'}},
})
