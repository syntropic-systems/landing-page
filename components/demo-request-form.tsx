'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface DemoRequestFormProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoRequestForm({ isOpen, onClose }: DemoRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    // Default values for fields not shown in form but needed for email template
    jobTitle: 'Not specified',
    companySize: 'Not specified',
    primaryUseCase: 'General Inquiry',
    monthlyBidVolume: 'Not specified',
    biggestChallenge: 'Not specified'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        'service_viny1ap',
        'template_khm1fhv',
        {
          ...formData,
          to_email: 'ceo@cloudglancelab.com'
        },
        'lY-EskTLt6cH9eKH2'
      )
      
      // Show success message
      setShowSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        // Reset to default values for hidden fields
        jobTitle: 'Not specified',
        companySize: 'Not specified',
        primaryUseCase: 'General Inquiry',
        monthlyBidVolume: 'Not specified',
        biggestChallenge: 'Not specified'
      })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      // Silently handle error - you may want to show an inline error message instead
      console.error('Failed to send email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal Container - Using inset-0 and flex for centering */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Content */}
        <div className="relative bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-border">
          {showSuccess ? (
            // Success Message
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground">We've received your demo request and will contact you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-8 border-b border-border">
                <h2 className="text-2xl font-semibold text-foreground">Request Demo</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone
              </label>
              <div className="phone-input-wrapper">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value || '' })}
                  defaultCountry="IN"
                  international
                  withCountryCallingCode
                  countryCallingCodeEditable={false}
                  className="w-full"
                />
              </div>
              <style jsx>{`
                .phone-input-wrapper :global(.PhoneInput) {
                  --PhoneInput-color--focus: hsl(var(--primary));
                  --PhoneInputCountryFlag-aspectRatio: 1.33;
                  --PhoneInputCountryFlag-height: 1.2em;
                  --PhoneInputCountrySelectArrow-color: hsl(var(--muted-foreground));
                  --PhoneInputCountrySelectArrow-opacity: 1;
                }
                
                .phone-input-wrapper :global(.PhoneInputInput) {
                  background: hsl(var(--background));
                  color: hsl(var(--foreground));
                  border: 1px solid hsl(var(--border));
                  border-radius: 6px;
                  padding: 12px 16px;
                  font-size: 16px;
                  width: 100%;
                  outline: none;
                  transition: border-color 0.2s, box-shadow 0.2s;
                }
                
                .phone-input-wrapper :global(.PhoneInputInput:focus) {
                  border-color: hsl(var(--primary));
                  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
                }
                
                .phone-input-wrapper :global(.PhoneInputCountry) {
                  background: hsl(var(--background));
                  border: 1px solid hsl(var(--border));
                  border-right: none;
                  border-radius: 6px 0 0 6px;
                  padding: 12px 8px;
                }
                
                .phone-input-wrapper :global(.PhoneInputInput) {
                  border-left: none;
                  border-radius: 0 6px 6px 0;
                  padding-left: 12px;
                }
              `}</style>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg font-medium"
            >
              {isSubmitting ? 'Sending...' : 'Request Demo'}
            </Button>
          </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}