'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'

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
    jobTitle: '',
    phone: '',
    companySize: '',
    primaryUseCase: '',
    monthlyBidVolume: '',
    biggestChallenge: ''
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
        jobTitle: '',
        phone: '',
        companySize: '',
        primaryUseCase: '',
        monthlyBidVolume: '',
        biggestChallenge: ''
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
        <div className="relative bg-background rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-border">
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
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-semibold text-foreground">Request Demo</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Company *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Company Size *
              </label>
              <select
                name="companySize"
                required
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Primary Use Case *
              </label>
              <select
                name="primaryUseCase"
                required
                value={formData.primaryUseCase}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select use case</option>
                <option value="Government Contracting">Government Contracting</option>
                <option value="Construction Bidding">Construction Bidding</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Engineering">Engineering & Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Monthly Bid Volume *
              </label>
              <select
                name="monthlyBidVolume"
                required
                value={formData.monthlyBidVolume}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select volume</option>
                <option value="1-5">1-5 bids/month</option>
                <option value="6-15">6-15 bids/month</option>
                <option value="16-50">16-50 bids/month</option>
                <option value="50+">50+ bids/month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Biggest Challenge
              </label>
              <textarea
                name="biggestChallenge"
                rows={3}
                value={formData.biggestChallenge}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tell us about your main pain points..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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