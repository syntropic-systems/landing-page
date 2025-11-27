import { ContactForm } from '@/components/contact-form';
import { Mail, Phone } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { Section } from '@/components/section';

export default function ContactPage() {
    return (
        <div>
            <PageHeader
                title="Get in touch"
                description="Fill out the form and we'll be in touch as soon as possible. We usually respond within one business day."
                className="!pb-0"
            />
            <Section className="!pt-12 md:!pt-16 lg:!pt-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 ">
                    {/* Left Column - Contact Info */}
                    <div>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Email</p>
                                    <a
                                        href="mailto:info@cloudglance.labs"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        info@cloudglance.labs
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium mb-1">Phone</p>
                                    <a
                                        href="tel:+919876543210"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        +91 9876 543 210
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </Section>
        </div>
    );
}
