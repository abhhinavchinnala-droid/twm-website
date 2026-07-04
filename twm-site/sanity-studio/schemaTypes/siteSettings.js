import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Website Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Website Title', type: 'string'}),
    defineField({name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero Title', type: 'string'}),
    defineField({name: 'heroSub', title: 'Hero Subtitle', type: 'text', rows: 2}),
    defineField({name: 'aboutText', title: 'About TWM', type: 'text', rows: 4}),
    defineField({name: 'mission', title: 'Mission', type: 'text', rows: 3}),
    defineField({name: 'vision', title: 'Vision', type: 'text', rows: 3}),
    defineField({name: 'email', title: 'Contact Email', type: 'string'}),
    defineField({name: 'phone', title: 'Contact Phone', type: 'string'}),
    defineField({
      name: 'socials', title: 'Social Media Links', type: 'array',
      of: [{type: 'object', fields: [
        {name: 'platform', title: 'Platform', type: 'string'},
        {name: 'url', title: 'URL', type: 'url'},
      ]}],
    }),
  ],
  preview: {prepare: () => ({title: 'Website Settings'})},
})
