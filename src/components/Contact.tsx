'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { contactInfo, socialLinks } from '@/lib/data';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id='contact' className='py-24 bg-slate-50 dark:bg-slate-900'>
      <div className='container mx-auto px-8 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-14'
        >
          <p className='text-sm font-mono text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide'>
            05 — Contact
          </p>
          <h2 className='text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3'>
            Let&apos;s work together
          </h2>
          <p className='text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed'>
            I&apos;m open to new opportunities — remote, hybrid, or on-site.
            Drop me a message and I&apos;ll get back to you promptly.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-5 gap-10'>
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-3'
          >
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <div className='grid sm:grid-cols-2 gap-5'>
                <div>
                  <label
                    htmlFor='contact-name'
                    className='block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2'
                  >
                    Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    id='contact-name'
                    type='text'
                    className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors'
                    placeholder='Your name'
                  />
                  {errors.name && (
                    <p className='mt-1.5 text-xs text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor='contact-email'
                    className='block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2'
                  >
                    Email *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    id='contact-email'
                    type='email'
                    className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors'
                    placeholder='your@email.com'
                  />
                  {errors.email && (
                    <p className='mt-1.5 text-xs text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='contact-message'
                  className='block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2'
                >
                  Message *
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                  })}
                  id='contact-message'
                  rows={6}
                  className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none transition-colors'
                  placeholder='Tell me about your project or opportunity...'
                />
                {errors.message && (
                  <p className='mt-1.5 text-xs text-red-500'>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot */}
              <input
                {...register('honeypot')}
                type='text'
                className='hidden'
                tabIndex={-1}
                autoComplete='off'
              />

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm'
              >
                <Send className='w-4 h-4' />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex items-center gap-2.5 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg'
                >
                  <CheckCircle className='w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0' />
                  <span className='text-sm text-emerald-800 dark:text-emerald-200'>
                    Message sent! I&apos;ll be in touch soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex items-center gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg'
                >
                  <AlertCircle className='w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0' />
                  <span className='text-sm text-red-800 dark:text-red-200'>
                    Something went wrong. Try again or email me directly.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Info — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='lg:col-span-2 space-y-6'
          >
            {/* Contact details */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3.5'>
                <div className='w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0'>
                  <Mail className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                </div>
                <div>
                  <p className='text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mb-0.5'>
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className='text-sm text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className='flex items-center gap-3.5'>
                <div className='w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
                </div>
                <div>
                  <p className='text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mb-0.5'>
                    Location
                  </p>
                  <p className='text-sm text-slate-700 dark:text-slate-300'>
                    {contactInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className='text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mb-3'>
                Connect
              </p>
              <div className='space-y-2'>
                <a
                  href={socialLinks.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group'
                >
                  <Github className='w-4 h-4 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors' />
                  <span className='text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'>
                    {socialLinks.github.replace('https://', '')}
                  </span>
                </a>
                <a
                  href={socialLinks.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group'
                >
                  <Linkedin className='w-4 h-4 text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors' />
                  <span className='text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors'>
                    {socialLinks.linkedin.replace('https://', '')}
                  </span>
                </a>
              </div>
            </div>

            {/* Availability card */}
            <div className='p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0' />
                <span className='text-sm font-semibold text-slate-900 dark:text-white'>
                  Currently Available
                </span>
              </div>
              <p className='text-sm text-slate-500 dark:text-slate-400'>
                {contactInfo.availability}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

