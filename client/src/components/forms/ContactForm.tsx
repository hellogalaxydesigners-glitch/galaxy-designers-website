import { Link } from 'react-router';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput, type ContactFormValues } from '@galaxy/shared';
import { Field, describedBy, TextInput, Textarea, Select, CountryOptions, Honeypot, ErrorSummary } from './fields';
import { Turnstile } from './Turnstile';
import { FormSuccess } from './FormSuccess';
import { useEnquirySubmit, useRevalidateOnChange } from './useEnquirySubmit';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { mailtoLink, whatsappLink } from '@/content/site.config';
import { guessCountryFromTimeZone } from '@/lib/locale';
import { useMounted } from '@/lib/useMounted';

type FieldName = keyof ContactFormInput;
const ORDER: FieldName[] = ['fullName', 'companyName', 'email', 'phone', 'country', 'message'];

export function ContactForm() {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [summaryFocus, setSummaryFocus] = useState(0);
  const [summary, setSummary] = useState<{ id: string; message: string }[]>([]);
  const showSummary = (errs: Partial<Record<string, { message?: string } | undefined>>) => {
    setSummary(ORDER.filter((k) => errs[k]).map((k) => ({ id: fid(k), message: errs[k]?.message ?? 'Check this field' })));
    setSummaryFocus((n) => n + 1);
  };
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    setValue,
    getValues,
    getFieldState,
    watch,
    formState: { errors },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', companyName: '', email: '', phone: '', country: '', message: '' },
  });
  const { state, submit, honeypotRef, onTurnstileToken, turnstileReset } = useEnquirySubmit<ContactFormInput>({ type: 'contact', setError });
  useRevalidateOnChange({ watch, trigger, getFieldState });

  const mounted = useMounted();
  useEffect(() => {
    if (!mounted) return; // wait until the country list is on the page
    const guess = guessCountryFromTimeZone();
    if (guess && !getValues('country')) setValue('country', guess);
  }, [mounted, getValues, setValue]);

  const values = watch();
  if (state.status === 'success') {
    return (
      <FormSuccess
        title="Message sent"
        reference={state.reference}
        whatsappMessage={`Hi Galaxy Designers, I've just sent you a message on your website (ref ${state.reference}). – ${values.fullName}`}
      />
    );
  }

  const err = (k: FieldName) => errors[k]?.message;
  const a11y = (k: FieldName, hint = false) => ({ id: fid(k), ...describedBy(fid(k), { hint, error: err(k) }) });
  const submitting = state.status === 'submitting';

  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        async (data) => {
          setSummary([]);
          const res = await submit(data as unknown as ContactFormInput);
          if (!res.ok) showSummary(Object.fromEntries(Object.entries(res.fieldErrors ?? {}).map(([k, v]) => [k, { message: v }])));
        },
        (errs) => showSummary(errs),
      )}
      className="relative grid gap-6 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <ErrorSummary errors={summary} message={state.status === 'error' ? state.message : undefined} focusKey={summaryFocus} />
        {state.status === 'error' && !Object.keys(errors).length && (
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonExternal href={whatsappLink(`Hi Galaxy Designers, ${values.message}\n– ${values.fullName} (${values.email})`)} variant="outline-light">
              Send on WhatsApp instead
            </ButtonExternal>
            <ButtonExternal href={mailtoLink('Website enquiry')} variant="outline-light">
              Email us instead
            </ButtonExternal>
          </div>
        )}
      </div>
      <Honeypot ref={honeypotRef} name="company_website" />

      <Field id={fid('fullName')} label="Full name" required error={err('fullName')}>
        <TextInput {...a11y('fullName')} autoComplete="name" invalid={!!err('fullName')} {...register('fullName')} />
      </Field>
      <Field id={fid('companyName')} label="Company name" error={err('companyName')}>
        <TextInput {...a11y('companyName')} autoComplete="organization" {...register('companyName')} />
      </Field>
      <Field id={fid('email')} label="Email" required error={err('email')}>
        <TextInput {...a11y('email')} type="email" inputMode="email" autoComplete="email" invalid={!!err('email')} {...register('email')} />
      </Field>
      <Field id={fid('phone')} label="Phone / WhatsApp" error={err('phone')}>
        <TextInput {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 20 7946 0000" invalid={!!err('phone')} {...register('phone')} />
      </Field>
      <Field id={fid('country')} label="Country" error={err('country')} className="sm:col-span-2">
        <Select {...a11y('country')} autoComplete="country" invalid={!!err('country')} {...register('country')}>
          <option value="">Select your country</option>
          <CountryOptions />
        </Select>
      </Field>
      <Field id={fid('message')} label="Message" required error={err('message')} className="sm:col-span-2">
        <Textarea {...a11y('message')} rows={6} invalid={!!err('message')} {...register('message')} />
      </Field>
      <div className="sm:col-span-2">
        <Turnstile onToken={onTurnstileToken} resetKey={turnstileReset} />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button size="lg" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>
        <p className="type-small text-muted">
          We use your details only to reply. See our{' '}
          <Link to="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
