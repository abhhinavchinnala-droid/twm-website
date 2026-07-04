import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Member Name', type: 'string', validation: r => r.required()}),
    defineField({name: 'designation', title: 'Designation', type: 'string'}),
    defineField({name: 'quote', title: 'Testimonial', type: 'text', rows: 4}),
    defineField({name: 'photo', title: 'Profile Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'designation', media: 'photo'}},
})
