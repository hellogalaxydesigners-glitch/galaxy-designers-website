/**
 * Shared submit logic for every enquiry form:
 * collects tracking + spam signals, posts to the API, maps server field errors
 * back onto the form and reports the lead to analytics.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FieldValues, Path, UseFormReturn, UseFormSetError } from 'react-hook-form';
import type { EnquiryType } from '@galaxy/shared';
import { submitEnquiry } from '@/lib/api';
import { getTracking } from '@/lib/tracking';
import { trackLead } from '@/lib/analytics';

export type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference: string }
  | { status: 'error'; message: string };

export function useEnquirySubmit<T extends FieldValues>({
  type,
  setError,
  relatedProject,
}: {
  type: EnquiryType;
  setError: UseFormSetError<T>;
  relatedProject?: string;
}) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const turnstileToken = useRef('');
  const [turnstileReset, setTurnstileReset] = useState(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = useCallback(
    async (data: T, extra: { service?: string } = {}) => {
      setState({ status: 'submitting' });
      const res = await submitEnquiry({
        type,
        data: data as never,
        tracking: getTracking({ relatedProject }),
        spam: {
          hp: honeypot.current?.value ?? '',
          startedAt: startedAt.current || undefined,
          turnstileToken: turnstileToken.current,
        },
      });
      setTurnstileReset((n) => n + 1);

      if (res.ok) {
        trackLead(type, extra.service);
        setState({ status: 'success', reference: res.reference });
        return res;
      }
      if (res.fieldErrors) {
        for (const [name, message] of Object.entries(res.fieldErrors)) {
          setError(name as Path<T>, { type: 'server', message });
        }
      }
      setState({ status: 'error', message: res.error });
      return res;
    },
    [type, setError, relatedProject],
  );

  return {
    state,
    setState,
    submit,
    honeypotRef: honeypot,
    onTurnstileToken: (t: string) => {
      turnstileToken.current = t;
    },
    turnstileReset,
  };
}

/**
 * Once a field shows an error, re-check it on every keystroke so the message
 * disappears as soon as it is fixed – not on blur, which would shift the layout
 * just as the visitor clicks the button below.
 */
export function useRevalidateOnChange<T extends FieldValues>(form: Pick<UseFormReturn<T>, 'watch' | 'trigger' | 'getFieldState'>) {
  const { watch, trigger, getFieldState } = form;
  useEffect(() => {
    const sub = watch((_values, { name, type }) => {
      if (name && type === 'change' && getFieldState(name as Path<T>).error) void trigger(name as Path<T>);
    });
    return () => sub.unsubscribe();
  }, [watch, trigger, getFieldState]);
}
