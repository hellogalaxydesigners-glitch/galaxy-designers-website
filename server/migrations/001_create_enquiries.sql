-- Galaxy Designers – enquiries table
-- Works on any PostgreSQL 13+ database, including Supabase.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS enquiries (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference        text NOT NULL UNIQUE,                 -- shown to the visitor, e.g. GD-261119-K7QM
  type             text NOT NULL CHECK (type IN ('project', 'quote', 'contact', 'consultation')),
  status           text NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'spam_suspected', 'archived')),

  -- Contact
  full_name        text NOT NULL,
  company_name     text,
  email            text NOT NULL,
  phone            text,
  country          text,                                 -- ISO 3166-1 alpha-2

  -- Project
  service          text,
  budget_currency  text,
  budget_amount    text,                                 -- free text typed by the visitor
  timeline         text,
  message          text,                                 -- project description or contact message
  website_url      text,
  details          jsonb NOT NULL DEFAULT '{}'::jsonb,   -- type-specific data (e.g. consultation slots)

  -- Attribution
  source_page      text,
  landing_page     text,
  referrer         text,
  related_project  text,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  utm_term         text,
  utm_content      text,

  -- Technical
  ip_hash          text,                                 -- salted hash, never the raw IP
  user_agent       text,
  notifications    jsonb NOT NULL DEFAULT '{}'::jsonb,   -- delivery result of email / webhook

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx     ON enquiries (status);
CREATE INDEX IF NOT EXISTS enquiries_type_idx       ON enquiries (type);
CREATE INDEX IF NOT EXISTS enquiries_email_idx      ON enquiries (lower(email));

-- Supabase exposes tables through its public API. Enabling row level security
-- with no policies means only the server (direct database connection) can read
-- or write enquiries – never the browser.
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
