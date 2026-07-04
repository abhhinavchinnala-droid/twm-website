// Register every schema here. In a fresh Sanity project this file is
// sanity-studio/schemaTypes/index.js (or index.ts). Import it from
// sanity.config.js:  schema: { types: schemaTypes }
import siteSettings from './siteSettings'
import member from './member'
import communityMember from './communityMember'
import event from './event'
import pastSession from './pastSession'
import galleryImage from './galleryImage'
import testimonial from './testimonial'

export const schemaTypes = [
  siteSettings,
  member,
  communityMember,
  event,
  pastSession,
  galleryImage,
  testimonial,
]
