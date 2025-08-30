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
        <div className="relative bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-border">
          <div className="flex items-center justify-between p-8 border-b border-border">
            <h2 className="text-2xl font-semibold text-foreground">Request Demo</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-8">
            <DemoFormCore onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </>
  )
}