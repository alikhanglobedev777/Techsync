import React, { useState, useMemo, useCallback, useContext, createContext } from 'react';
import emailjs from '@emailjs/browser';

// Theme colors
const primaryColor = '#0F172A';
const accentColor = '#38BDF8';
const accentSecondary = '#818CF8';
const backgroundColor = '#0F172A';
const cardColor = '#1E293B';
const cardColorLight = '#334155';
const textPrimary = '#F1F5F9';
const textSecondary = '#94A3B8';
const borderColor = '#334155';
const successColor = '#10B981';
const errorColor = '#EF4444';
const warningColor = '#F59E0B';
const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsAutoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const serviceItems = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern web applications',
    detail: 'Responsive websites, dashboards, portals, and full-stack platforms built for performance and scale.',
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'iOS & Android apps',
    detail: 'Native and cross-platform mobile products with polished interfaces and reliable backend integrations.',
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    description: 'Cloud infrastructure',
    detail: 'Cloud architecture, deployments, automation, and infrastructure designed for resilient growth.',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful designs',
    detail: 'User research, product flows, wireframes, and high-fidelity interfaces for clear digital experiences.',
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    description: 'Intelligent solutions',
    detail: 'AI workflows, machine learning features, automation, and data-driven product capabilities.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Secure systems',
    detail: 'Security reviews, hardening, monitoring, and protection practices for modern software systems.',
  },
];

const aboutItems = [
  {
    id: 'case-study',
    title: 'Case Study',
    heading: 'Case Study',
    description: 'See how TechSync plans, builds, and launches practical digital products for growing teams.',
  },
  {
    id: 'life-at-techsync',
    title: 'Life at TechSync',
    heading: 'Life at TechSync',
    description: 'Meet the culture behind our work: collaborative teams, learning habits, and product-focused execution.',
  },
];

const mockStats = [
  { label: 'Projects Delivered', value: '120+' },
  { label: 'Client Retention', value: '94%' },
  { label: 'Avg. Launch Cycle', value: '8 wks' },
];

const serviceHighlights = [
  'Discovery and technical planning',
  'Clean, responsive implementation',
  'Testing, launch, and improvement support',
];

const portfolioProjects = [
  {
    id: 'commerce',
    title: 'NovaCart Commerce',
    category: 'E-Commerce',
    client: 'Retail operations team',
    result: 'Checkout conversion up 28%',
  },
  {
    id: 'health',
    title: 'PulseOps Dashboard',
    category: 'Healthcare Analytics',
    client: 'Regional clinic network',
    result: 'Reporting time cut by 63%',
  },
  {
    id: 'finance',
    title: 'LedgerFlow Mobile',
    category: 'Fintech Mobile',
    client: 'Personal finance startup',
    result: '4.8 app store rating',
  },
  {
    id: 'cloud',
    title: 'SkyBridge Migration',
    category: 'Cloud Infrastructure',
    client: 'Logistics SaaS company',
    result: '99.95% uptime target met',
  },
];

const teamMembers = [
  { id: 'alex', name: 'M Asif', role: 'CEO', focus: 'Product strategy and partnerships' },
  { id: 'priya', name: 'Ali Khan', role: 'CTO', focus: 'Cloud architecture and engineering quality' },
  { id: 'marcus', name: 'Zain', role: 'Automation Engineer', focus: 'Design systems and UX research' },
  { id: 'sana', name: 'Moeez', role: 'AI Engineer', focus: 'Automation, ML workflows, and data products' },
];

const careerOpenings = [
  { id: 'full-stack', title: 'Senior Full-Stack Engineer', location: 'Remote', type: 'Full time', team: 'Product Engineering' },
  { id: 'designer', title: 'Product Designer', location: 'Hybrid', type: 'Full time', team: 'Design' },
  { id: 'ml-engineer', title: 'ML Engineer', location: 'Remote', type: 'Contract', team: 'AI Lab' },
  { id: 'cloud-devops', title: 'Cloud DevOps Engineer', location: 'On site', type: 'Full time', team: 'Infrastructure' },
];

const contactInfo = {
  email: 'hello@techsync.dev',
  phone: '+1 (555) 318-2048',
  address: 'Market Street, San Francisco, CA',
  responseTime: 'Typical response within 1 business day',
};

// Theme Context
const ThemeContext = createContext({
  theme: {
    colors: {
      primary: primaryColor,
      accent: accentColor,
      accentSecondary: accentSecondary,
      background: backgroundColor,
      card: cardColor,
      cardLight: cardColorLight,
      textPrimary: textPrimary,
      textSecondary: textSecondary,
      border: borderColor,
      success: successColor,
      error: errorColor,
      warning: warningColor,
    }
  }
});

const ThemeProvider = ({ children }) => {
  const lightColors = useMemo(() => ({
    primary: primaryColor,
    accent: accentColor,
    accentSecondary: accentSecondary,
    background: backgroundColor,
    card: cardColor,
    cardLight: cardColorLight,
    textPrimary: textPrimary,
    textSecondary: textSecondary,
    border: borderColor,
    success: successColor,
    error: errorColor,
    warning: warningColor,
  }), []);
  
  const theme = useMemo(() => ({ colors: lightColors }), [lightColors]);
  const value = useMemo(() => ({ theme }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Navigation Component with Responsive Design
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  
  React.useEffect(() => {
    // Force check on mount
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    // Check immediately on mount
    checkMobile();
    
    // Create media query
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleMediaChange = (e) => {
      setIsMobile(e.matches);
    };
    
    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }
    
    // Also add resize listener as fallback
    const handleResize = () => {
      checkMobile();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const navItems = ['Home', 'Services', 'Portfolio', 'Team', 'About', 'Careers', 'Contact'];

  const handleNavClick = (item) => {
    setCurrentPage(item);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setAboutMenuOpen(false);
  };

  const handleServiceClick = (service) => {
    setCurrentPage(`Service:${service.id}`);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setAboutMenuOpen(false);
  };

  const handleAboutClick = (aboutItem) => {
    setCurrentPage(`About:${aboutItem.id}`);
    setMobileMenuOpen(false);
    setServicesMenuOpen(false);
    setAboutMenuOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: cardColor,
      borderBottom: `1px solid ${borderColor}`,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        width: '100%'
      }}>
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleNavClick('Home')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}>
            <span style={{
              color: primaryColor,
              fontSize: '18px',
              fontWeight: '900'
            }}>T</span>
          </div>
          <span style={{
            color: textPrimary,
            fontSize: '22px',
            fontWeight: '800',
            letterSpacing: '1px'
          }}>TECHSYNC</span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '24px',
            alignItems: 'center'
          }}>
            {navItems.map(item => {
              const isServicesActive = item === 'Services' && currentPage.startsWith('Service:');
              const isAboutActive = item === 'About' && currentPage.startsWith('About:');
              const isActive = currentPage === item || isServicesActive || isAboutActive;

              return (
              <li
                key={item}
                style={{ position: 'relative' }}
                onMouseEnter={() => {
                  if (item === 'Services') {
                    setServicesMenuOpen(true);
                  }
                  if (item === 'About') {
                    setAboutMenuOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item === 'Services') {
                    setServicesMenuOpen(false);
                  }
                  if (item === 'About') {
                    setAboutMenuOpen(false);
                  }
                }}
              >
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: isActive ? accentColor : textSecondary,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: isActive ? '700' : '400',
                    padding: '8px 0',
                    borderBottom: isActive ? `2px solid ${accentColor}` : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.color = accentColor;
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.color = textSecondary;
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {item}
                </button>
                {item === 'Services' && servicesMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '240px',
                      padding: '10px',
                      backgroundColor: 'rgba(30, 41, 59, 0.96)',
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      boxShadow: '0 18px 36px rgba(0, 0, 0, 0.34)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      zIndex: 1200,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: 0,
                        right: 0,
                        height: '12px',
                      }}
                    />
                    {serviceItems.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service)}
                        style={{
                          width: '100%',
                          padding: '11px 12px',
                          border: 'none',
                          borderRadius: '6px',
                          backgroundColor: currentPage === `Service:${service.id}` ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
                          color: currentPage === `Service:${service.id}` ? accentColor : textPrimary,
                          cursor: 'pointer',
                          display: 'block',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          if (currentPage !== `Service:${service.id}`) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = textPrimary;
                          }
                        }}
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
                {item === 'About' && aboutMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '220px',
                      padding: '10px',
                      backgroundColor: 'rgba(30, 41, 59, 0.96)',
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      boxShadow: '0 18px 36px rgba(0, 0, 0, 0.34)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      zIndex: 1200,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: 0,
                        right: 0,
                        height: '12px',
                      }}
                    />
                    {aboutItems.map((aboutItem) => (
                      <button
                        key={aboutItem.id}
                        onClick={() => handleAboutClick(aboutItem)}
                        style={{
                          width: '100%',
                          padding: '11px 12px',
                          border: 'none',
                          borderRadius: '6px',
                          backgroundColor: currentPage === `About:${aboutItem.id}` ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
                          color: currentPage === `About:${aboutItem.id}` ? accentColor : textPrimary,
                          cursor: 'pointer',
                          display: 'block',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: 700,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          if (currentPage !== `About:${aboutItem.id}`) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = textPrimary;
                          }
                        }}
                      >
                        {aboutItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </li>
              );
            })}
          </ul>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              fontSize: '24px',
              color: textPrimary,
              transition: 'all 0.3s ease',
              transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={(e) => {
              e.target.style.color = accentColor;
              e.target.style.transform = mobileMenuOpen ? 'rotate(90deg) scale(1.2)' : 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = textPrimary;
              e.target.style.transform = mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
            }}
          >
            {mobileMenuOpen ? '\u00d7' : '\u2630'}
          </button>
        )}
      </div>

      {/* Mobile Menu - Outside flex container */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: '61px',
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: 'rgba(30, 41, 59, 0.72)',
          borderTop: `1px solid rgba(51, 65, 85, 0.75)`,
          borderBottom: `1px solid rgba(51, 65, 85, 0.75)`,
          padding: mobileMenuOpen ? '24px 20px' : '0 20px',
          boxShadow: mobileMenuOpen ? `0 18px 36px rgba(0, 0, 0, 0.32)` : 'none',
          width: '100%',
          maxHeight: mobileMenuOpen ? '440px' : '0',
          opacity: mobileMenuOpen ? 1 : 0,
          overflow: 'hidden',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-14px)',
          transition: 'max-height 0.35s ease, opacity 0.25s ease, transform 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)'
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '320px'
          }}>
            {navItems.map((item, index) => (
              <li key={item} style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
                transition: `opacity 0.25s ease ${index * 0.04}s, transform 0.3s ease ${index * 0.04}s`,
                width: '100%'
              }}>
                <button
                  style={{
                    backgroundColor: currentPage === item ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                    border: currentPage === item ? `1px solid rgba(56, 189, 248, 0.45)` : '1px solid transparent',
                    borderRadius: '8px',
                    color: currentPage === item ? accentColor : textSecondary,
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: currentPage === item ? '700' : '400',
                    padding: '12px 16px',
                    width: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.2px'
                  }}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={(e) => {
                    if (currentPage !== item) {
                      e.target.style.color = accentColor;
                      e.target.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
                      e.target.style.borderColor = 'rgba(56, 189, 248, 0.28)';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item) {
                      e.target.style.color = textSecondary;
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

// Home Screen Component
const HomeScreen = ({ setCurrentPage }) => {
  return (
    <div className="home-screen" style={{ padding: 0 }}>
      <section className="hero-section" style={{
        position: 'relative',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: '#0B1324',
      }}>
        <div className="hero-content-wrap" style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 24px 44px',
        }}>
          <div className="hero-content" style={{ maxWidth: '620px' }}>
            <p className="hero-kicker" style={{
              color: accentColor,
              fontSize: '13px',
              fontWeight: 800,
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px'
            }}>
              <span style={{
                width: '31px',
                height: '3px',
                borderRadius: '999px',
                backgroundColor: accentColor,
                display: 'inline-block',
                flexShrink: 0
              }} />
              Innovate &bull; Build &bull; Scale
            </p>
            <h1 className="hero-title" style={{
              color: textPrimary,
              fontSize: '56px',
              lineHeight: 1.12,
              marginBottom: '18px',
              maxWidth: '620px',
              fontWeight: 900
            }}>
              We Build<br />Digital Futures
            </h1>
            <p className="hero-copy" style={{
              color: '#CBD5E1',
              fontSize: '17px',
              lineHeight: '27px',
              marginBottom: '38px',
              maxWidth: '560px'
            }}>
              Techsync is a full-service technology company delivering cutting-edge web, mobile, cloud, and AI solutions that transform businesses worldwide.
            </p>
            <div className="hero-actions" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <button
                onClick={() => setCurrentPage('Services')}
                className="hero-primary-button"
                style={{
                  backgroundColor: accentColor,
                  color: primaryColor,
                  border: 'none',
                  padding: '15px 25px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 10px 24px rgba(56, 189, 248, 0.34)`,
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = `0 14px 30px rgba(56, 189, 248, 0.46)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = `0 10px 24px rgba(56, 189, 248, 0.34)`;
                }}
              >
                Our Services
              </button>
              <button
                onClick={() => setCurrentPage('Contact')}
                className="hero-secondary-button"
                style={{
                  backgroundColor: 'transparent',
                  color: textPrimary,
                  border: `1px solid rgba(148, 163, 184, 0.36)`,
                  padding: '15px 25px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.color = accentColor;
                  e.target.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(241, 245, 249, 0.28)';
                  e.target.style.color = textPrimary;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="hero-image-band" style={{
          width: '100%',
          minHeight: '300px',
          backgroundImage: 'linear-gradient(to bottom, rgba(11, 19, 36, 0), rgba(11, 19, 36, 0.52)), url("https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 46%',
          opacity: 0.72
        }}>
        </div>
      </section>
    </div>
  );
};

// Services Screen Component
const ServicesScreen = ({ setCurrentPage }) => {
  return (
    <div style={{ padding: '40px 24px' }}>
      <h2 style={{ color: textPrimary, fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>
        Our Services
      </h2>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {serviceItems.map(service => (
          <div
            key={service.id}
            onClick={() => setCurrentPage(`Service:${service.id}`)}
            style={{
              backgroundColor: cardColor,
              padding: '24px',
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = cardColorLight;
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 12px 24px ${accentColor}40`;
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = cardColor;
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = borderColor;
            }}
          >
            <h3 style={{ color: textPrimary, fontSize: '20px', marginBottom: '12px' }}>
              {service.title}
            </h3>
            <p style={{ color: textSecondary, fontSize: '14px' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Service Detail Screen Component
const ServiceDetailScreen = ({ service, setCurrentPage }) => {
  if (!service) {
    return <ServicesScreen setCurrentPage={setCurrentPage} />;
  }

  return (
    <div style={{ padding: '48px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <button
          onClick={() => setCurrentPage('Services')}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${borderColor}`,
            color: textSecondary,
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer',
            marginBottom: '28px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = accentColor;
            e.currentTarget.style.borderColor = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = textSecondary;
            e.currentTarget.style.borderColor = borderColor;
          }}
        >
          Back to Services
        </button>

        <div style={{
          backgroundColor: cardColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '36px',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.18)'
        }}>
          <p style={{
            color: accentColor,
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            TechSync Service
          </p>
          <h2 style={{
            color: textPrimary,
            fontSize: '40px',
            marginBottom: '16px'
          }}>
            {service.title}
          </h2>
          <p style={{
            color: textSecondary,
            fontSize: '17px',
            lineHeight: '28px',
            maxWidth: '760px',
            marginBottom: '28px'
          }}>
            {service.detail}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {serviceHighlights.map((highlight) => (
              <div
                key={highlight}
                style={{
                  backgroundColor: cardColorLight,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  padding: '18px'
                }}
              >
                <p style={{
                  color: textPrimary,
                  fontSize: '15px',
                  lineHeight: '24px'
                }}>
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Portfolio Screen Component
const PortfolioScreen = () => {
  return (
    <div style={{ padding: '40px 24px' }}>
      <h2 style={{ color: textPrimary, fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>
        Portfolio
      </h2>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {portfolioProjects.map(project => (
          <div
            key={project.id}
            style={{
              backgroundColor: cardColor,
              padding: '24px',
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 12px 28px ${accentColor}50`;
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = borderColor;
            }}
          >
            <h3 style={{ color: textPrimary, fontSize: '20px', marginBottom: '8px' }}>
              {project.title}
            </h3>
            <p style={{ color: accentColor, fontSize: '14px', marginBottom: '10px' }}>{project.category}</p>
            <p style={{ color: textSecondary, fontSize: '14px', marginBottom: '10px' }}>{project.client}</p>
            <p style={{ color: successColor, fontSize: '13px', fontWeight: 700 }}>{project.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Team Screen Component
const TeamScreen = () => {
  return (
    <div style={{ padding: '40px 24px' }}>
      <h2 style={{ color: textPrimary, fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>
        Our Team
      </h2>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        {teamMembers.map(member => (
          <div
            key={member.id}
            style={{
              backgroundColor: cardColor,
              padding: '24px',
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 12px 28px ${accentSecondary}50`;
              e.currentTarget.style.borderColor = accentSecondary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = borderColor;
            }}
          >
            <h3 style={{ color: textPrimary, fontSize: '18px', marginBottom: '8px' }}>
              {member.name}
            </h3>
            <p style={{ color: accentColor, fontSize: '14px', marginBottom: '10px' }}>{member.role}</p>
            <p style={{ color: textSecondary, fontSize: '14px', lineHeight: '22px' }}>{member.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// About Screen Component
const AboutScreen = () => {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: textPrimary, fontSize: '36px', marginBottom: '24px' }}>
          About TechSync
        </h2>
        <p style={{ color: textSecondary, fontSize: '16px', lineHeight: '28px', marginBottom: '20px' }}>
          TechSync is a leading digital solutions company dedicated to empowering businesses through innovative technology.
        </p>
        <p style={{ color: textSecondary, fontSize: '16px', lineHeight: '28px', marginBottom: '20px' }}>
          We specialize in web development, mobile apps, cloud solutions, UI/UX design, AI/ML, and cybersecurity.
        </p>
        <p style={{ color: textSecondary, fontSize: '16px', lineHeight: '28px' }}>
          Our team of experts is committed to delivering excellence in every project we undertake.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '32px'
        }}>
          {mockStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: cardColor,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                padding: '18px'
              }}
            >
              <strong style={{ color: accentColor, fontSize: '28px', display: 'block', marginBottom: '6px' }}>
                {stat.value}
              </strong>
              <span style={{ color: textSecondary, fontSize: '14px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Detail Screen Component
const AboutDetailScreen = ({ item, setCurrentPage }) => {
  if (!item) {
    return <AboutScreen />;
  }

  return (
    <div style={{ padding: '48px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button
          onClick={() => setCurrentPage('About')}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${borderColor}`,
            color: textSecondary,
            borderRadius: '8px',
            padding: '10px 14px',
            cursor: 'pointer',
            marginBottom: '28px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = accentColor;
            e.currentTarget.style.borderColor = accentColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = textSecondary;
            e.currentTarget.style.borderColor = borderColor;
          }}
        >
          Back to About
        </button>

        <div style={{
          backgroundColor: cardColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '36px',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.18)'
        }}>
          <p style={{
            color: accentColor,
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            About TechSync
          </p>
          <h2 style={{
            color: textPrimary,
            fontSize: '40px',
            marginBottom: '16px'
          }}>
            {item.heading}
          </h2>
          <p style={{
            color: textSecondary,
            fontSize: '17px',
            lineHeight: '28px',
            maxWidth: '720px'
          }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Careers Screen Component
const CareersScreen = () => {
  return (
    <div style={{ padding: '40px 24px' }}>
      <h2 style={{ color: textPrimary, fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>
        Join Our Team
      </h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {careerOpenings.map(job => (
          <div
            key={job.id}
            style={{
              backgroundColor: cardColor,
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '16px',
              border: `1px solid ${borderColor}`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(8px)';
              e.currentTarget.style.backgroundColor = cardColorLight;
              e.currentTarget.style.borderColor = accentColor;
              e.currentTarget.style.boxShadow = `0 6px 16px ${accentColor}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.backgroundColor = cardColor;
              e.currentTarget.style.borderColor = borderColor;
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
          >
            <h3 style={{ color: textPrimary, fontSize: '18px', marginBottom: '8px' }}>
              {job.title}
            </h3>
            <p style={{ color: accentColor, fontSize: '14px' }}>📍 {job.location}</p>
            <p style={{ color: textSecondary, fontSize: '14px', marginTop: '8px' }}>
              {job.team} • {job.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Screen Component
const ContactScreen = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsAutoReplyTemplateId || !emailJsPublicKey) {
      setFormStatus({
        type: 'error',
        message: 'EmailJS is missing VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID, or VITE_EMAILJS_PUBLIC_KEY.',
      });
      return;
    }

    setIsSending(true);
    setFormStatus({ type: 'idle', message: '' });

    try {
      const selectedService = serviceItems.find((service) => service.id === formData.projectType);
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        user_email: formData.email,
        email: formData.email,
        reply_to: formData.email,
        project_type: selectedService ? selectedService.title : formData.projectType,
        message: formData.message,
        to_email: contactInfo.email,
      };

      try {
        await emailjs.send(
          emailJsServiceId,
          emailJsTemplateId,
          emailParams,
          {
            publicKey: emailJsPublicKey,
          }
        );
      } catch (error) {
        console.error('EmailJS admin template failed:', error);
        throw new Error('Admin email failed. Check VITE_EMAILJS_TEMPLATE_ID and its To Email field.');
      }

      try {
        await emailjs.send(
          emailJsServiceId,
          emailJsAutoReplyTemplateId,
          emailParams,
          {
            publicKey: emailJsPublicKey,
          }
        );
      } catch (error) {
        console.error('EmailJS auto-reply template failed:', error);
        throw new Error('Auto-reply failed. Set the auto-reply template To Email to {{from_email}}, {{user_email}}, or {{email}}.');
      }

      setFormData({ name: '', email: '', projectType: '', message: '' });
      setFormStatus({
        type: 'success',
        message: 'Message sent. We also sent an auto-reply confirmation.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Message could not be sent. Please check your EmailJS setup and try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: cardColorLight,
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    color: textPrimary,
    padding: '12px 14px',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div className="contact-screen" style={{ padding: '40px 24px' }}>
      <div className="contact-panel" style={{
        maxWidth: '980px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: '24px',
        alignItems: 'stretch'
      }}>
        <div style={{
          backgroundColor: cardColor,
          padding: '34px',
          borderRadius: '12px',
          border: `1px solid ${borderColor}`
        }}>
          <p style={{
            color: accentColor,
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            Contact
          </p>
          <h2 style={{ color: textPrimary, fontSize: '36px', marginBottom: '18px' }}>
            Get in Touch
          </h2>
          <p style={{ color: textSecondary, fontSize: '16px', lineHeight: '26px', marginBottom: '28px' }}>
            Tell us what you are building, and the TechSync team will help map the next practical step.
          </p>
          <p style={{ color: textSecondary, fontSize: '15px', marginBottom: '16px' }}>
            Email: {contactInfo.email}
          </p>
          <p style={{ color: textSecondary, fontSize: '15px', marginBottom: '16px' }}>
            Phone: {contactInfo.phone}
          </p>
          <p style={{ color: textSecondary, fontSize: '15px', marginBottom: '16px' }}>
            Address: {contactInfo.address}
          </p>
          <p style={{ color: accentColor, fontSize: '14px', fontWeight: 700 }}>
            {contactInfo.responseTime}
          </p>
        </div>

        <form
          style={{
            backgroundColor: cardColor,
            padding: '34px',
            borderRadius: '12px',
            border: `1px solid ${borderColor}`,
            position: 'relative'
          }}
          onSubmit={handleContactSubmit}
        >
          <button
            type="button"
            className="contact-modal-close"
            onClick={() => setCurrentPage('Home')}
            aria-label="Close contact form"
          >
            {'\u00d7'}
          </button>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <label style={{ color: textSecondary, fontSize: '13px', fontWeight: 700 }}>
              Name
              <input
                style={{ ...inputStyle, marginTop: '8px' }}
                placeholder="Ayesha Khan"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label style={{ color: textSecondary, fontSize: '13px', fontWeight: 700 }}>
              Email
              <input
                style={{ ...inputStyle, marginTop: '8px' }}
                placeholder="ayesha@company.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <label style={{ color: textSecondary, fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '16px' }}>
            Project Type
            <select
              style={{ ...inputStyle, marginTop: '8px' }}
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a service</option>
              {serviceItems.map((service) => (
                <option key={service.id} value={service.id}>{service.title}</option>
              ))}
            </select>
          </label>
          <label style={{ color: textSecondary, fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '20px' }}>
            Message
            <textarea
              style={{ ...inputStyle, marginTop: '8px', minHeight: '130px', resize: 'vertical' }}
              placeholder="Tell us about your goals, timeline, and what you need help with."
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </label>
          {formStatus.message && (
            <p style={{
              color: formStatus.type === 'success' ? successColor : errorColor,
              fontSize: '14px',
              lineHeight: '22px',
              marginBottom: '16px',
              fontWeight: 700
            }}>
              {formStatus.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSending}
            style={{
              width: '100%',
              backgroundColor: isSending ? cardColorLight : accentColor,
              color: primaryColor,
              border: 'none',
              borderRadius: '8px',
              padding: '14px 18px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: isSending ? 'not-allowed' : 'pointer',
              opacity: isSending ? 0.78 : 1,
              boxShadow: '0 10px 24px rgba(56, 189, 248, 0.28)'
            }}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    if (currentPage.startsWith('Service:')) {
      const serviceId = currentPage.replace('Service:', '');
      const service = serviceItems.find((item) => item.id === serviceId);
      return <ServiceDetailScreen service={service} setCurrentPage={setCurrentPage} />;
    }

    if (currentPage.startsWith('About:')) {
      const aboutId = currentPage.replace('About:', '');
      const aboutItem = aboutItems.find((item) => item.id === aboutId);
      return <AboutDetailScreen item={aboutItem} setCurrentPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'Services':
        return <ServicesScreen setCurrentPage={setCurrentPage} />;
      case 'Portfolio':
        return <PortfolioScreen />;
      case 'Team':
        return <TeamScreen />;
      case 'About':
        return <AboutScreen />;
      case 'Careers':
        return <CareersScreen />;
      case 'Contact':
        return <ContactScreen setCurrentPage={setCurrentPage} />;
      default:
        return <HomeScreen setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{
      backgroundColor: backgroundColor,
      color: textPrimary,
      minHeight: '100vh'
    }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ width: '100%' }}>
        {renderPage()}
      </main>
      <footer style={{
        backgroundColor: cardColor,
        borderTop: `1px solid ${borderColor}`,
        padding: '40px 24px',
        marginTop: '80px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: textSecondary, fontSize: '14px' }}>
            © 2024 TechSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
