import { Link } from 'react-router';
/**
 * "Start a project" / "Request a quotation" form.
 * Two short steps keep the form approachable: about you, then your project.
 */
import { useEffect, useId, useRef, useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CURRENCY_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  defaultCurrencyFor,
  labelFor,
  projectFormSchema,
  type ProjectFormInput,
  type ProjectFormValues,
  type ServiceValue,
} from '@galaxy/shared';
import { Field, describedBy, TextInput, Textarea, Select, CountryOptions, Honeypot, ErrorSummary } from './fields';
import { Turnstile } from './Turnstile';
import { FormSuccess } from './FormSuccess';
import { useEnquirySubmit, useRevalidateOnChange } from './useEnquirySubmit';
import { Button, ButtonExternal } from '@/components/ui/Button';
import { mailtoLink, whatsappLink } from '@/content/site.config';
import { guessCountryFromTimeZone } from '@/lib/locale';
import { cn } from '@/lib/cn';
import { useMounted } from '@/lib/useMounted';

const STEP_ONE = ['fullName', 'companyName', 'email', 'phone', 'country'] as const;
type FieldName = keyof ProjectFormInput;

const ORDER: FieldName[] = [...STEP_ONE, 'service', 'budgetCurrency', 'budgetAmount', 'timeline', 'description', 'websiteUrl'];

export function ProjectEnquiryForm({
  type,
  initialService,
  relatedProject,
}: {
  type: 'project' | 'quote';
  initialService?: ServiceValue;
  relatedProject?: string;
}) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [step, setStep] = useState<1 | 2>(1);
  const [summaryFocus, setSummaryFocus] = useState(0);
  // Snapshot of errors at the last attempt – kept stable so the layout never shifts while typing
  const [summary, setSummary] = useState<{ id: string; message: string }[]>([]);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getFieldState,
    setError,
    getValues,
    formState: { errors },
  } = useForm<ProjectFormInput, unknown, ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: '',
      service: '' as ServiceValue,
      budgetCurrency: 'USD',
      budgetAmount: '',
      timeline: '' as ProjectFormInput['timeline'],
      description: '',
      websiteUrl: '',
    },
  });

  const { state, submit, honeypotRef, onTurnstileToken, turnstileReset } = useEnquirySubmit<ProjectFormInput>({
    type,
    setError,
    relatedProject,
  });
  useRevalidateOnChange({ watch, trigger, getFieldState });

  // Pre-select the country when the visitor's time zone makes it obvious.
  // (Runs once the country list is on the page.)
  const mounted = useMounted();
  useEffect(() => {
    if (!mounted) return;
    const guess = guessCountryFromTimeZone();
    if (guess && !getValues('country')) {
      setValue('country', guess);
      setValue('budgetCurrency', defaultCurrencyFor(guess));
    }
  }, [mounted, getValues, setValue]);

  // Apply the service chosen on the page the visitor came from (?service=…)
  useEffect(() => {
    if (initialService && !getFieldState('service').isDirty) setValue('service', initialService);
  }, [initialService, getFieldState, setValue]);

  // Follow the selected country with a matching currency, until the visitor picks one themselves.
  const country = watch('country');
  useEffect(() => {
    if (country && !getFieldState('budgetCurrency').isDirty) setValue('budgetCurrency', defaultCurrencyFor(country));
  }, [country, getFieldState, setValue]);

  const showSummary = (errs: Partial<Record<string, { message?: string } | undefined>>, fields: readonly FieldName[] = ORDER) => {
    setSummary(fields.filter((k) => errs[k]).map((k) => ({ id: fid(k), message: errs[k]?.message ?? 'Check this field' })));
    setSummaryFocus((n) => n + 1);
  };

  const goToStep = (n: 1 | 2) => {
    setSummary([]);
    setStep(n);
    requestAnimationFrame(() => stepHeading.current?.focus());
  };

  const next = async () => {
    const ok = await trigger([...STEP_ONE]);
    if (ok) goToStep(2);
    else showSummary(Object.fromEntries(STEP_ONE.map((k) => [k, getFieldState(k).error])), STEP_ONE);
  };

  const onInvalid = (errs: FieldErrors<ProjectFormInput>) => {
    const onStepOne = STEP_ONE.some((k) => errs[k]);
    if (onStepOne) setStep(1);
    showSummary(errs, onStepOne ? STEP_ONE : ORDER);
  };

  const onValid = async (data: ProjectFormValues) => {
    const res = await submit(data as unknown as ProjectFormInput, { service: data.service });
    if (!res.ok) {
      const fe = Object.fromEntries(Object.entries(res.fieldErrors ?? {}).map(([k, v]) => [k, { message: v }]));
      if (STEP_ONE.some((k) => fe[k])) setStep(1);
      showSummary(fe);
    }
  };

  const values = watch();

  if (state.status === 'success') {
    return (
      <FormSuccess
        title={type === 'quote' ? 'Quotation request received' : 'Thank you – your enquiry is in'}
        reference={state.reference}
        whatsappMessage={`Hi Galaxy Designers, I've just sent ${type === 'quote' ? 'a quotation request' : 'a project enquiry'} on your website (ref ${state.reference}). Service: ${labelFor(SERVICE_OPTIONS, values.service)}. – ${values.fullName}`}
      >
        <h3 className="type-h4 mt-8 text-ink">What happens next</h3>
        <ol className="mt-3 grid gap-2 text-slate">
          <li>1. We review your brief and may reply with a few questions.</li>
          <li>2. We arrange a short call at a time that suits your time zone.</li>
          <li>3. You receive a proposal with scope, timeline and cost.</li>
        </ol>
      </FormSuccess>
    );
  }

  const submitting = state.status === 'submitting';

  const err = (k: FieldName) => errors[k]?.message;
  const a11y = (k: FieldName, hint = false) => ({ id: fid(k), ...describedBy(fid(k), { hint, error: err(k) }) });

  const fallbackMessage = `Hi Galaxy Designers, I tried to send a project enquiry on your website.\nName: ${values.fullName}\nEmail: ${values.email}\nService: ${labelFor(SERVICE_OPTIONS, values.service)}\nProject: ${values.description}`;

  return (
    <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="relative" aria-describedby={`${uid}-required`}>
      {/* Progress */}
      <div className="flex items-center gap-3" aria-hidden>
        {[1, 2].map((n) => (
          <span key={n} className={cn('h-1.5 flex-1 rounded-full transition-colors', n <= step ? 'bg-violet-strong' : 'bg-line')} />
        ))}
      </div>
      <h2 ref={stepHeading} tabIndex={-1} className="type-h3 mt-6 text-ink outline-none">
        <span className="type-meta block text-muted">Step {step} of 2</span>
        {step === 1 ? 'About you' : type === 'quote' ? 'What would you like quoted?' : 'About your project'}
      </h2>
      <p id={`${uid}-required`} className="type-small mt-2 text-muted">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      <div className="mt-6">
        <ErrorSummary errors={summary} message={state.status === 'error' ? state.message : undefined} focusKey={summaryFocus} />
      </div>

      {state.status === 'error' && !Object.keys(errors).length && (
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonExternal href={whatsappLink(fallbackMessage)} variant="outline-light">
            Send on WhatsApp instead
          </ButtonExternal>
          <ButtonExternal href={mailtoLink('Project enquiry')} variant="outline-light">
            Email us instead
          </ButtonExternal>
        </div>
      )}

      <Honeypot ref={honeypotRef} name="company_website" />

      {/* Step 1 */}
      <fieldset hidden={step !== 1} className="mt-6 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">About you</legend>
        <Field id={fid('fullName')} label="Full name" required error={err('fullName')}>
          <TextInput {...a11y('fullName')} autoComplete="name" invalid={!!err('fullName')} {...register('fullName')} />
        </Field>
        <Field id={fid('companyName')} label="Company name" error={err('companyName')}>
          <TextInput {...a11y('companyName')} autoComplete="organization" invalid={!!err('companyName')} {...register('companyName')} />
        </Field>
        <Field id={fid('email')} label="Work email" required error={err('email')}>
          <TextInput {...a11y('email')} type="email" inputMode="email" autoComplete="email" invalid={!!err('email')} {...register('email')} />
        </Field>
        <Field id={fid('phone')} label="Phone / WhatsApp number" required hint="Include your country code." error={err('phone')}>
          <TextInput
            {...a11y('phone', true)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            invalid={!!err('phone')}
            {...register('phone')}
          />
        </Field>
        <Field id={fid('country')} label="Country" required error={err('country')} className="sm:col-span-2">
          <Select {...a11y('country')} autoComplete="country" placeholder="Select your country" invalid={!!err('country')} {...register('country')}>
            <CountryOptions />
          </Select>
        </Field>
      </fieldset>

      {/* Step 2 */}
      <fieldset hidden={step !== 2} className="mt-6 grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your project</legend>
        <Field id={fid('service')} label="Service required" required error={err('service')} className="sm:col-span-2">
          <Select {...a11y('service')} placeholder="Select a service" invalid={!!err('service')} {...register('service')}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-6 sm:col-span-2 sm:grid-cols-[minmax(0,14rem)_1fr]">
          <Field id={fid('budgetCurrency')} label="Budget currency" required error={err('budgetCurrency')}>
            <Select {...a11y('budgetCurrency')} invalid={!!err('budgetCurrency')} {...register('budgetCurrency')}>
              {CURRENCY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            id={fid('budgetAmount')}
            label="Approximate budget"
            hint="A rough figure or range helps us suggest the right approach. Leave blank if you're not sure yet."
            error={err('budgetAmount')}
          >
            <TextInput {...a11y('budgetAmount', true)} placeholder="e.g. 5,00,000 or 8,000 – 12,000" invalid={!!err('budgetAmount')} {...register('budgetAmount')} />
          </Field>
        </div>

        <Field id={fid('timeline')} label="Project timeline" required error={err('timeline')} className="sm:col-span-2">
          <Select {...a11y('timeline')} placeholder="When would you like to start?" invalid={!!err('timeline')} {...register('timeline')}>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          id={fid('description')}
          label="Project description"
          required
          hint="What do you want to achieve, who is it for, and is there anything already in place?"
          error={err('description')}
          className="sm:col-span-2"
        >
          <Textarea {...a11y('description', true)} rows={6} invalid={!!err('description')} {...register('description')} />
        </Field>

        <Field id={fid('websiteUrl')} label="Current website" error={err('websiteUrl')} className="sm:col-span-2">
          <TextInput {...a11y('websiteUrl')} type="text" inputMode="url" autoComplete="url" placeholder="yourcompany.com" invalid={!!err('websiteUrl')} {...register('websiteUrl')} />
        </Field>

        <div className="sm:col-span-2">
          <Turnstile onToken={onTurnstileToken} resetKey={turnstileReset} />
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step === 1 ? (
          <Button size="lg" onClick={next}>
            Continue
          </Button>
        ) : (
          <>
            <Button size="lg" variant="outline-light" onClick={() => goToStep(1)} disabled={submitting}>
              Back
            </Button>
            <Button size="lg" type="submit" disabled={submitting} aria-disabled={submitting}>
              {submitting ? (
                <>
                  <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending…
                </>
              ) : type === 'quote' ? (
                'Request quotation'
              ) : (
                'Send enquiry'
              )}
            </Button>
          </>
        )}
      </div>
      <p className="type-small mt-5 max-w-[60ch] text-muted">
        We use your details only to reply to this enquiry. See our{' '}
        <Link to="/privacy" className="underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
