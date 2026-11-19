/**
 * ISO 3166-1 alpha-2 country codes. Display names are produced at runtime with
 * Intl.DisplayNames so the list stays short and correctly spelled.
 * Priority markets are listed first in the dropdown.
 */
export const PRIORITY_COUNTRIES = ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG'] as const;

export const COUNTRY_CODES = [
  'AF','AL','DZ','AD','AO','AG','AR','AM','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BT','BO','BA','BW','BR','BN','BG','BF','BI',
  'CV','KH','CM','CA','CF','TD','CL','CN','CO','KM','CG','CD','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE',
  'SZ','ET','FJ','FI','FR','GA','GM','GE','DE','GH','GR','GD','GT','GN','GW','GY','HT','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IL','IT',
  'JM','JP','JO','KZ','KE','KI','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH','MR','MU','MX',
  'FM','MD','MC','MN','ME','MA','MZ','MM','NA','NR','NP','NL','NZ','NI','NE','NG','KP','MK','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH',
  'PL','PT','PR','QA','RO','RU','RW','KN','LC','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','KR','SS','ES','LK',
  'SD','SR','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TO','TT','TN','TR','TM','TV','UG','UA','AE','GB','US','UY','UZ','VU','VA','VE','VN',
  'YE','ZM','ZW',
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

const EURO_COUNTRIES = new Set(['AT','BE','HR','CY','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MT','NL','PT','SK','SI','ES']);

/** Suggested currency for a country. The visitor can always change it. */
export function defaultCurrencyFor(code: string | undefined | null): 'INR' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'AED' | 'SGD' {
  switch (code) {
    case 'IN': return 'INR';
    case 'GB': return 'GBP';
    case 'CA': return 'CAD';
    case 'AU': return 'AUD';
    case 'AE': return 'AED';
    case 'SG': return 'SGD';
    default:
      return code && EURO_COUNTRIES.has(code) ? 'EUR' : 'USD';
  }
}

let displayNames: Intl.DisplayNames | null = null;
export function countryName(code: string): string {
  try {
    displayNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function isCountryCode(value: string): value is CountryCode {
  return (COUNTRY_CODES as readonly string[]).includes(value);
}
