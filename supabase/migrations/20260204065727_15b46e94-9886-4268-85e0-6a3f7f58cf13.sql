-- Create app_role enum for admin
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT DEFAULT 'Blue Team',
    date DATE DEFAULT CURRENT_DATE,
    repo_url TEXT,
    demo_url TEXT,
    cover_image TEXT,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
ON public.projects FOR SELECT USING (true);

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create certificates table
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    platform TEXT,
    date DATE DEFAULT CURRENT_DATE,
    year INTEGER,
    category TEXT,
    credential_url TEXT,
    image_url TEXT,
    description TEXT,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certificates are viewable by everyone"
ON public.certificates FOR SELECT USING (true);

CREATE POLICY "Admins can manage certificates"
ON public.certificates FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create education table
CREATE TABLE public.education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    major TEXT,
    degree TEXT,
    start_year INTEGER,
    end_year INTEGER,
    description TEXT,
    logo_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Education is viewable by everyone"
ON public.education FOR SELECT USING (true);

CREATE POLICY "Admins can manage education"
ON public.education FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create experience table
CREATE TABLE public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    organization TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    logo_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experience is viewable by everyone"
ON public.experience FOR SELECT USING (true);

CREATE POLICY "Admins can manage experience"
ON public.experience FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create blog posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT,
    cover_image TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
ON public.blog_posts FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage posts"
ON public.blog_posts FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create site settings table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are viewable by everyone"
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings"
ON public.site_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create contact messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.education
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON public.experience
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('site_name', 'Muhammad Raditya Anwar'),
('site_tagline', 'Cyber Security | SOC / SIEM | Blue Team | Incident Response'),
('email', 'contact@radityaanwar.com'),
('github_url', 'https://github.com/radityaanwar'),
('linkedin_url', 'https://linkedin.com/in/radityaanwar'),
('twitter_url', 'https://twitter.com/radityaanwar'),
('cv_url', '#');

-- Insert sample projects
INSERT INTO public.projects (title, summary, content, tags, category, date, repo_url, is_featured, sort_order) VALUES
('SIEM Implementation with Wazuh', 'Built a comprehensive Security Information and Event Management system using Wazuh for real-time threat detection and incident response.', 'Implemented a full SIEM solution using Wazuh integrated with Elastic Stack for log aggregation, analysis, and visualization. The system monitors over 50+ endpoints and provides real-time alerting for security incidents.', ARRAY['Wazuh', 'SIEM', 'ELK Stack', 'Linux'], 'Blue Team', '2024-01-15', 'https://github.com/radityaanwar/wazuh-siem', true, 1),
('Automated Threat Intelligence Platform', 'Developed an automated threat intelligence gathering and analysis platform for proactive security monitoring.', 'Created a Python-based threat intelligence platform that aggregates IOCs from multiple feeds, correlates them with internal logs, and generates actionable intelligence reports.', ARRAY['Python', 'Threat Intel', 'Automation', 'API'], 'Automation', '2024-02-20', 'https://github.com/radityaanwar/threat-intel', true, 2),
('Network Security Monitoring Lab', 'Set up a comprehensive network security monitoring lab environment for learning and testing security tools.', 'Built a virtual lab environment using GNS3 and VirtualBox featuring firewalls, IDS/IPS systems, and various network security tools for hands-on learning and testing.', ARRAY['Networking', 'IDS/IPS', 'Firewall', 'Lab'], 'Networking', '2024-03-10', 'https://github.com/radityaanwar/network-lab', true, 3);

-- Insert sample certificates
INSERT INTO public.certificates (title, issuer, platform, date, year, category, credential_url, is_featured, sort_order) VALUES
('Google Cybersecurity Professional Certificate', 'Google', 'Coursera', '2024-01-20', 2024, 'Cybersecurity', 'https://coursera.org/verify/professional-cert/google-cyber', true, 1),
('CompTIA Security+ (SY0-701)', 'CompTIA', 'CompTIA', '2024-02-15', 2024, 'Cybersecurity', 'https://www.credly.com/badges/security-plus', true, 2),
('Cisco CCNA: Introduction to Networks', 'Cisco', 'Cisco Networking Academy', '2023-11-10', 2023, 'Networking', 'https://cisco.com/verify/ccna', true, 3),
('Splunk Core Certified User', 'Splunk', 'Splunk', '2024-03-01', 2024, 'SIEM', 'https://splunk.com/verify', true, 4),
('AWS Cloud Practitioner', 'Amazon Web Services', 'AWS', '2023-09-15', 2023, 'Cloud', 'https://aws.amazon.com/verify', true, 5),
('Certified Ethical Hacker (CEH)', 'EC-Council', 'EC-Council', '2024-04-10', 2024, 'Offensive Security', 'https://aspen.eccouncil.org/verify', true, 6);

-- Insert sample education
INSERT INTO public.education (institution, major, degree, start_year, end_year, description, sort_order) VALUES
('Universitas Indonesia', 'Sistem Informasi', 'Sarjana Komputer', 2020, 2024, 'Fokus pada Cybersecurity dan Network Security. Aktif dalam komunitas keamanan siber kampus dan berbagai kompetisi CTF.', 1);

-- Insert sample experience
INSERT INTO public.experience (role, organization, start_date, is_current, description, achievements, sort_order) VALUES
('SOC Analyst Intern', 'PT. Telkom Indonesia', '2024-01-01', true, 'Monitoring security events, analyzing threats, and responding to security incidents in the Security Operations Center.', ARRAY['Monitored 1000+ daily security events', 'Reduced false positive alerts by 30%', 'Developed automated response playbooks'], 1);