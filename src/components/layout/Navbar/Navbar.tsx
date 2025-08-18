import React, { useState, useEffect } from 'react';
import { Button } from '../../common/Button';
import { useContent } from '../../../hooks/useContent';
import type { NavbarContent } from '../../../types/content';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const content = useContent<NavbarContent>('navbar.json');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) {
    return <nav className={styles.navbar}>Loading...</nav>;
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>{content.logo}</span>
          </div>

          <div className={styles.navMenu}>
            {content.navLinks.map((link) => (
              <div key={link.label} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                  {link.dropdown && <span className={styles.chevron}>▾</span>}
                </a>
                {link.dropdown && (
                  <div className={styles.dropdown}>
                    {link.dropdown.map((item) => (
                      <a key={item.label} href={item.href} className={styles.dropdownLink}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.navActions}>
            <Button 
              variant={content.actions.cta.variant as any} 
              size={content.actions.cta.size as any}
              href={content.actions.cta.href}
            >
              {content.actions.cta.label}
            </Button>
            <a href={content.actions.login.href} className={styles.navLink}>
              {content.actions.login.label}
            </a>
          </div>

          <button
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          {content.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className={styles.mobileActions}>
            <a href={content.actions.login.href} className={styles.mobileNavLink}>
              {content.actions.login.label}
            </a>
            <Button variant={content.actions.cta.variant as any} size="medium" fullWidth>
              {content.actions.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};