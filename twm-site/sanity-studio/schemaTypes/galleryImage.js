import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: r => r.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'eventDate', title: 'Event Date', type: 'date'}),
    defineField({name: 'category', title: 'Category', type: 'string',
      description: 'Used for the filter chips on the Gallery page, e.g. Workshop, Meetup.'}),
    defineField({name: 'featured', title: 'Featured on Home Page', type: 'boolean', initialValue: false,
      description: 'Featured images show in the Gallery Highlights section on the home page.'}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'caption', subtitle: 'category', media: 'image'}},
})
