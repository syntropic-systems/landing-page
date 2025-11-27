'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                                First Name
                            </label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                                Last Name
                            </label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                            Company Name
                        </label>
                        <Input
                            id="companyName"
                            name="companyName"
                            type="text"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-muted px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            required
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
