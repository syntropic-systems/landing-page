'use client'

import { X } from 'lucide-react'
import { DemoFormCore } from '@/components/demo-form-core'

interface DemoRequestFormProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoRequestForm({ isOpen, onClose }: DemoRequestFormProps) {
  const handleSuccess = () => {
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose()
    }, 2000)
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
        <div className="relative bg-background rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-border">
          <div className="relative p-8 border-b border-border">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="pr-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2 text-left">Request Demo</h2>
              <p className="text-muted-foreground text-left">
                See CloudGlance in action. Fill out the form below and we'll schedule a personalized demo for you.
              </p>
            </div>
          </div>

          <div className="p-8">
            <DemoFormCore onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </>
  )
}