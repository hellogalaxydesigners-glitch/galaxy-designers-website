import type { EnquiryType } from '@galaxy/shared';

/** A normalised enquiry, ready to store – the same shape for every form. */
export interface EnquiryRecord {
  reference: string;
  type: EnquiryType;
  status: 'new' | 'spam_suspected';
  fullName: string;
  companyName: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  service: string | null;
  budgetCurrency: string | null;
  budgetAmount: string | null;
  timeline: string | null;
  message: string | null;
  websiteUrl: string | null;
  details: Record<string, unknown>;
  sourcePage: string | null;
  landingPage: string | null;
  referrer: string | null;
  relatedProject: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  ipHash: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface StoredEnquiry extends EnquiryRecord {
  id: string;
}

export interface EnquiryStore {
  readonly name: string;
  /** Throws if storage is unreachable */
  ping(): Promise<void>;
  insert(record: EnquiryRecord): Promise<StoredEnquiry>;
  recordNotifications(id: string, result: Record<string, unknown>): Promise<void>;
  list(options: { limit: number; offset: number; type?: string }): Promise<StoredEnquiry[]>;
}
