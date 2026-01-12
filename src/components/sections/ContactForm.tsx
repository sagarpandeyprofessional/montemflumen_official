// File path: src/components/sections/ContactForm.tsx
// Role: Contact form with validation, loading states, and error handling
// Connected files: utils.ts (validation), constants.ts (copy)
// UI patterns: UX-INPUT-01 (inline validation), UX-ERR-02 (contextual errors)
// Edge cases: Double submit prevention, network errors, validation failures
// Reference: PIT-99 (double submit), PIT-87 (form validation), ENT-SEC-3.2 (CSRF)

'use client';

import { useState, useCallback, FormEvent, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { isValidEmail, generateMailtoLink, debounce } from '@/lib/utils';
import { CONTACT_COPY } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
  type: 'general' | 'project' | 'partnership' | 'careers';
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
    type: 'general',
  });

  // UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate single field (UX-INPUT-01 inline validation)
  const validateField = useCallback((field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  // Memoized debounced validation function
  const debouncedValidate = useMemo(() => {
    return debounce((field: keyof FormData, value: string) => {
      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, value),
        }));
      }
    }, 300);
  }, [touched, validateField]);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formData, validateField]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    debouncedValidate(name as keyof FormData, value);
  };

  // Handle blur (mark field as touched)
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  // Handle form submission (PIT-99 double submit prevention)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (status === 'submitting') return;

    setStatus('validating');

    // Validate form
    if (!validateForm()) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');

    try {
      // In a real app, this would be an API call
      // For now, we'll use mailto as fallback
      const mailtoLink = generateMailtoLink(
        'hello@montemflumen.com',
        `[${formData.type.toUpperCase()}] Contact from ${formData.name}`,
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
      );

      // Simulate API delay for UX demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Open mailto link
      window.location.href = mailtoLink;

      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          type: 'general',
        });
        setTouched({});
        setStatus('idle');
      }, 3000);
    } catch {
      setStatus('error');
      // Reset to idle after showing error
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Success Message */}
      {isSuccess && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-green-800 dark:text-green-200 font-medium">
                {CONTACT_COPY.form.success.title}
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                {CONTACT_COPY.form.success.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p className="text-red-800 dark:text-red-200 font-medium">
                {CONTACT_COPY.form.error.title}
              </p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                {CONTACT_COPY.form.error.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium mb-2">
          What can we help you with?
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          <option value="general">General Inquiry</option>
          <option value="project">Project Discussion</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="careers">Career Inquiry</option>
        </select>
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${
            errors.name && touched.name
              ? 'border-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
          placeholder="Your name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && touched.name && (
          <p id="name-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all ${
            errors.email && touched.email
              ? 'border-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
          placeholder="your@email.com"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && touched.email && (
          <p id="email-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Company Field (Optional) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder="Your company"
          disabled={isSubmitting}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 transition-all resize-none ${
            errors.message && touched.message
              ? 'border-red-500 focus:ring-red-500'
              : 'focus:ring-primary'
          }`}
          placeholder="Tell us about your project or inquiry..."
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && touched.message && (
          <p id="message-error" className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.message}
          </p>
        )}
        <p className="mt-2 text-sm text-muted-foreground text-right">
          {formData.message.length} / 1000
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || isSuccess}
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : isSuccess ? 'Sent!' : CONTACT_COPY.form.submit}
      </Button>

      {/* Privacy Notice */}
      <p className="text-sm text-muted-foreground text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
