import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'API', href: '#api' },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    resources: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Tutorials', href: '#tutorials' },
      { label: 'Status', href: '#status' },
      { label: 'Support', href: '#support' },
    ],
    legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Security', href: '#security' },
      { label: 'Compliance', href: '#compliance' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Product</h4>
            {footerLinks.product.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Company</h4>
            {footerLinks.company.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Resources</h4>
            {footerLinks.resources.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Legal</h4>
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2024 Cloud Glance. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            <a href="#twitter" className={styles.socialLink} aria-label="Twitter">
              𝕏
            </a>
            <a href="#linkedin" className={styles.socialLink} aria-label="LinkedIn">
              in
            </a>
            <a href="#github" className={styles.socialLink} aria-label="GitHub">
              gh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};