import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Shield, Heart } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/radityaanwar" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/radityaanwar" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/radityaanwar" },
  { name: "Email", icon: Mail, href: "mailto:contact@radityaanwar.com" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Projects", path: "/projects" },
      { name: "Certificates", path: "/certificates" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "Experience", path: "/experience" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background/50">
      {/* Gradient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">
                <span className="text-primary">Raditya</span>
                <span className="text-foreground">Anwar</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Cybersecurity enthusiast specializing in SOC operations, SIEM implementation, 
              and incident response. Building secure solutions and sharing knowledge with the community.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Muhammad Raditya Anwar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive" /> for cybersecurity
          </p>
        </div>
      </div>
    </footer>
  );
}
