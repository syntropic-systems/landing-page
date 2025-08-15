import React from 'react';
import { useContent } from '../../../hooks/useContent';
import type { FooterContent } from '../../../types/content';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const content = useContent<FooterContent>('footer.json');

  if (!content) {
    return <footer className={styles.footer}>Loading...</footer>;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Product</h4>
            {content.footerLinks.product.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Company</h4>
            {content.footerLinks.company.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Resources</h4>
            {content.footerLinks.resources.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.footerTitle}>Legal</h4>
            {content.footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            {content.footerBottom.copyright}
          </p>
          <div className={styles.socialLinks}>
            {content.footerBottom.socialLinks.map((social) => (
              <a key={social.platform} href={social.href} className={styles.socialLink} aria-label={social.ariaLabel}>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};