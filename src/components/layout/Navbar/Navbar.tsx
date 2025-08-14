import React, { useState, useEffect } from 'react';
import { Button } from '../../common/Button';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      label: 'Products', 
      href: '#products',
      dropdown: [
        { label: 'Cloud Monitoring', href: '#monitoring' },
        { label: 'Predictive Analytics', href: '#analytics' },
        { label: 'Auto-Optimization', href: '#optimization' },
      ]
    },
    { 
      label: 'Solutions', 
      href: '#solutions',
      dropdown: [
        { label: 'Enterprise', href: '#enterprise' },
        { label: 'Government', href: '#government' },
        { label: 'Startups', href: '#startups' },
      ]
    },
    { label: 'Customers', href: '#customers' },
    { label: 'Pricing', href: '#pricing' },
    { 
      label: 'Resources', 
      href: '#resources',
      dropdown: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Blog', href: '#blog' },
        { label: 'Support', href: '#support' },
      ]
    },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Cloud Glance</span>
          </div>

          <div className={styles.navMenu}>
            {navLinks.map((link) => (
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
            <a href="#login" className={styles.navLink}>
              Log In
            </a>
            <Button variant="primary" size="small">
              Book a Demo
            </Button>
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
          {navLinks.map((link) => (
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
            <a href="#login" className={styles.mobileNavLink}>
              Log In
            </a>
            <Button variant="primary" size="medium" fullWidth>
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};