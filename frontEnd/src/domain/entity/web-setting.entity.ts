export class WebSettingEntity {
  id?: string;
  webName!: string;
  logoUrl?: string; // For the actual image file URL
  headerIcon?: string; // The Lucide icon name (e.g., 'BookOpen')
  contactEmail?: string;
  footerText?: string;
  isActive: boolean = true;
  updatedAt?: Date;
  _id?: string; // For compatibility with MongoDB documents
}
