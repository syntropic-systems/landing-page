export interface NavbarContent {
  logo: string;
  navLinks: {
    label: string;
    href: string;
    dropdown?: boolean | { label: string; href: string }[];
  }[];
  actions?: {
    login?: {
      label: string;
      href: string;
    };
    cta?: {
      label: string;
      variant?: string;
      size?: string;
      href?: string;
      icon?: string;
    };
  };
  cta?: {
    label: string;
    href?: string;
    variant?: string;
    size?: string;
    icon?: string;
  };
}

export interface HeroContent {
  title:
    | {
        highlightedText: string;
        grayText: string;
      }
    | string;
  subtitle: string;
  buttons: {
    label: string;
    variant: string;
    size?: string;
    href?: string;
    icon?: string;
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
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  headline: {
    main: string;
    prefix: string;
    tagline: string;
  };
  comparisons: {
    id: string;
    category: string;
    icon: string;
    without: {
      value: string;
      description: string;
      pain: boolean;
    };
    withUs: {
      value: string;
      description: string;
      highlight: string;
      improvement: string;
    };
  }[];
  visualStyle: {
    layout: string;
    withoutSide: {
      color: string;
      icon: string;
      label: string;
    };
    withSide: {
      color: string;
      icon: string;
      label: string;
    };
  };
  presentation: {
    style: string;
    layout: string;
    animations: boolean;
    animationType: string;
    staggerDelay: number;
    showArrows: boolean;
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
  testimonials?: {
    quote: string;
    author: string;
    title?: string;
    company?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title?: string;
    company?: string;
  };
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

export interface TechnologyContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  introduction: string;
  points: {
    title: string;
    problem: string;
    solution: string;
  }[];
}

export interface SolutionsContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  roles: {
    role: string;
    benefit: string;
  }[];
}

export interface WorkflowContent {
  title: string;
  visual: {
    description: string;
  };
  steps: {
    title: string;
    description: string;
  }[];
}

export interface FAQContent {
  sectionHeader: {
    title: string;
    subtitle: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ContactContent {
  sectionHeader?: {
    title: string;
    subtitle?: string;
  };
  form?: {
    fields?: {
      name: string;
      label: string;
      type: string;
      placeholder?: string;
      required?: boolean;
    }[];
    submit?: {
      label: string;
      variant?: string;
      size?: string;
    };
  };
}
