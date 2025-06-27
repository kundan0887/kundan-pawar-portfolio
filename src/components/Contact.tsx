'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button, Section, Card } from '@/components/ui';
import { contactInfo, socialLinks } from '@/lib/data';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; // Spam protection
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
    // Check honeypot field
    if (data.honeypot) {
      console.log('Spam detected');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Section id='contact'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-center mb-16'
      >
        <h2 className='text-3xl font-bold text-center text-slate-900 dark:text-white mb-8'>
          Get In Touch
        </h2>
        <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
          I'm always open to discussing new opportunities and interesting
          projects. Available for Remote, Hybrid & On-site roles.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        className='grid grid-cols-1 lg:grid-cols-2 gap-12'
      >
        {/* Contact Form */}
        <motion.div variants={itemVariants} className='space-y-6'>
          <Card variant='elevated' className='p-8'>
            <h3 className='text-2xl font-bold text-slate-900 dark:text-white mb-6'>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Name Field */}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'
                >
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type='text'
                  id='name'
                  className='w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                  placeholder='Your name'
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'
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
                  type='email'
                  id='email'
                  className='w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                  placeholder='your.email@example.com'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'
                >
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id='message'
                  rows={5}
                  className='w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-vertical'
                  placeholder='Tell me about your project or opportunity...'
                />
                {errors.message && (
                  <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot Field (Hidden) */}
              <input
                {...register('honeypot')}
                type='text'
                className='hidden'
                tabIndex={-1}
                autoComplete='off'
              />

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isSubmitting}
                loading={isSubmitting}
                fullWidth
                className='flex items-center justify-center gap-2'
              >
                <Send className='w-4 h-4' />
                Send Message
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg'
                >
                  <CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400' />
                  <span className='text-green-800 dark:text-green-200'>
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg'
                >
                  <AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400' />
                  <span className='text-red-800 dark:text-red-200'>
                    Something went wrong. Please try again or contact me
                    directly.
                  </span>
                </motion.div>
              )}
            </form>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants} className='space-y-8'>
          <Card variant='elevated' className='p-8'>
            <h3 className='text-2xl font-bold text-slate-900 dark:text-white mb-6'>
              Contact Information
            </h3>

            {/* Contact Details */}
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                  <Mail className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className='text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                  <MapPin className='w-6 h-6 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>
                    Location
                  </h4>
                  <p className='text-slate-600 dark:text-slate-300'>
                    {contactInfo.location}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
                  <Clock className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>
                    Availability
                  </h4>
                  <p className='text-slate-600 dark:text-slate-300'>
                    {contactInfo.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='mt-8'>
              <h4 className='font-semibold text-slate-900 dark:text-white mb-4'>
                Connect with me
              </h4>
              <div className='flex gap-4'>
                <a
                  href={socialLinks.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors'
                >
                  <Github className='w-6 h-6 text-slate-700 dark:text-slate-300' />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors'
                >
                  <Linkedin className='w-6 h-6 text-slate-700 dark:text-slate-300' />
                </a>
                <a
                  href={socialLinks.email}
                  className='p-3 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors'
                >
                  <Mail className='w-6 h-6 text-slate-700 dark:text-slate-300' />
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
