import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: r => r.required()}),
    defineField({
      name: 'identities', title: 'Roles / Identities', type: 'array', of: [{type: 'string'}],
      description: 'e.g. Startup Founder, Working Professional. The first one shows as the gold label.',
      options: {
        list: ['Startup Founder','Working Professional','Business Owner','Freelancer / Solopreneur',
               'Mentor / Advisor','Investor / Supporter','Content Creator','Student','Job Seeker','Other']
      }
    }),
    defineField({name: 'bio', title: 'Bio / What they are building', type: 'text', rows: 4}),
    defineField({name: 'website', title: 'Website', type: 'string', description: 'Domain only, e.g. example.com (no https://)'}),
    defineField({name: 'linkedin', title: 'LinkedIn / Social URL', type: 'url'}),
    defineField({name: 'photo', title: 'Profile Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers appear first. The home page shows the first 6.'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'identities.0', media: 'photo'}},
})
