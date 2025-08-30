'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { DemoFormCore } from '@/components/demo-form-core'

export function ContactSection() {

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your bidding process? Get in touch with our team and discover how CloudGlance can help you win more bids with less effort.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information - Left Half */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                We're here to help you streamline your bidding process and win more contracts. Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">ceo@cloudglancelab.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="text-lg font-semibold text-foreground mb-4">Why Choose CloudGlance?</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>AI-powered bid analysis and optimization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Streamlined proposal generation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Real-time collaboration tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Comprehensive analytics and reporting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Demo Request Form - Right Half */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Request a Demo</h3>
              <p className="text-muted-foreground">
                See CloudGlance in action. Fill out the form below and we'll schedule a personalized demo for you.
              </p>
            </div>
            <DemoFormCore />
          </div>
        </div>
      </div>
    </section>
  )
}