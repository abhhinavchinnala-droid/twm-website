import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'communityMember',
  title: 'Community Member',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: r => r.required()}),
    defineField({name: 'profession', title: 'Profession', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'photo', title: 'Profile Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'profession', media: 'photo'}},
})
