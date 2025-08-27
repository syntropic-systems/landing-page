export interface NavbarContent {
  logo: string;
  navLinks: {
    label: string;
    href: string;
    dropdown?: { label: string; href: string }[];
  }[];
  actions: {
    login: {
      label: string;
      href: string;
    };
    cta: {
      label: string;
      variant: string;
      size: string;
      href?: string;
    };
  };
}

export interface HeroContent {
  title: {
    gradientText: string;
    grayText: string;
  };
  subtitle: string;
  buttons: {
    label: string;
    variant: string;
    size: string;
    href?: string;
  }[];
  metrics: {
    icon: string;
    value: string;
    label: string;
  }[];
}

export interface TrustBarContent {
  trustText: {
    text: string;
    highlight: string;
    suffix: string;
  };
  clients: string[];
}

export interface ComparisonContent {
  title: string;
  withoutUs: {
    heading: string;
    items: string[];
  };
  withUs: {
    heading: string;
    items: string[];
  };
}

export interface ServicesContent {
  sectionHeader: {
    title: string;
    subtitle: string;
    button: {
      label: string;
      variant: string;
      size: string;
    };
  };
  services: {
    title: string;
    description: string;
    features: string[];
  }[];
  scrollImages: string[];
}

export interface FeaturesContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  videoDemo: {
    src: string;
    title: string;
  };
  benefits: {
    left: {
      title: string;
      description: string;
    };
    right: {
      title: string;
      description: string;
    };
  };
  overviewImage: {
    src: string;
    alt: string;
    labels: {
      text: string;
      position: Record<string, string>;
    }[];
  };
  additionalBenefits: {
    title: string;
    description: string;
  }[];
}

export interface DemoContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  demoImages: {
    src: string;
    title: string;
    description: string;
  }[];
}

export interface TestimonialsContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    quote: string;
    author: string;
    title: string;
    company: string;
  }[];
}

export interface FooterContent {
  footerLinks: {
    product: { label: string; href: string }[];
    company: { label: string; href: string }[];
    resources: { label: string; href: string }[];
    legal: { label: string; href: string }[];
  };
  footerBottom: {
    copyright: string;
    socialLinks: {
      platform: string;
      href: string;
      label: string;
      ariaLabel: string;
    }[];
  };
}