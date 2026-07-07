import { Phone, Star, Shield, Clock, CheckCircle, MapPin, ArrowRight, Sparkles, Zap } from 'lucide-react'
import config from '../site.config.json'

const primaryColor = config.primaryColor || '#2563eb'
const secondaryColor = (config as any).secondaryColor || '#BAE6FD'
const bgColor = (config as any).bgColor || '#0a0a0a'
const layoutType = (config as any).layout_type || 'bento'
const imageQuery = (config as any).image_query || 'professional-home-service'
const variationId = (config as any).variation_id || '00000000'

// Curated high-fidelity Unsplash images by category keyword
const HERO_IMAGES: Record<string, string> = {
  'plumb': 'photo-1585704032915-c3400ca199e7',
  'pipe': 'photo-1585704032915-c3400ca199e7',
  'hvac': 'photo-1631545806609-3cacb0d4f9af',
  'air': 'photo-1631545806609-3cacb0d4f9af',
  'electric': 'photo-1621905252507-b35492cc74b4',
  'roof': 'photo-1632778149955-e80f8ceca2e8',
  'landscape': 'photo-1558618666-fcd25c85f1d7',
  'paint': 'photo-1562259949-e8e7689d7828',
  'clean': 'photo-1581578731548-c64695cc6952',
  'default': 'photo-1504307651254-35680f356dfd',
}
function getHeroImage(query: string): string {
  const q = query.toLowerCase()
  for (const [key, id] of Object.entries(HERO_IMAGES)) {
    if (q.includes(key)) return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=85`
  }
  return `https://images.unsplash.com/${HERO_IMAGES.default}?auto=format&fit=crop&w=1920&q=85`
}
const heroImageUrl = getHeroImage(imageQuery)
const secondaryImageUrl = `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85`

export default function Home() {
  const services = config.services || []

  if (layoutType === 'split') {
    return <SplitLayout services={services} />
  } else if (layoutType === 'centered') {
    return <CenteredLayout services={services} />
  }
  return <BentoLayout services={services} />
}

/* ═══════════════════════════════════════════════════════════════════════════════
   BENTO LAYOUT - Grid-based modern design
   ═══════════════════════════════════════════════════════════════════════════════ */
function BentoLayout({ services }: { services: string[] }) {
  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: bgColor }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImageUrl})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${bgColor}cc, ${bgColor}99, ${bgColor})` }} />

        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
              <span className="text-xl font-bold tracking-tight">{config.businessName}</span>
            </div>
            <a href={`tel:${config.phone}`} className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white/20 transition-all">
              <Phone className="w-4 h-4" />
              {config.phone}
            </a>
          </div>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {config.city && (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8">
              <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm text-zinc-300">Serving {config.city}{config.state ? `, ${config.state}` : ''}</span>
            </div>
          )}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8 break-words overflow-hidden">
            <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>
              {config.businessName}
            </span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {config.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${config.phone}`} className="group inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all" style={{ backgroundColor: primaryColor }}>
              <Phone className="w-5 h-5" />
              Call Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all">
              View Services
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative py-12 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TrustCard icon={<Star className="w-7 h-7 fill-current" style={{ color: primaryColor }} />} title="4.9 Star Rated" sub="Verified Reviews" />
            <TrustCard icon={<Shield className="w-7 h-7" style={{ color: secondaryColor }} />} title="Licensed & Insured" sub="Full Coverage" />
            <TrustCard icon={<Zap className="w-7 h-7" style={{ color: primaryColor }} />} title="Same Day Service" sub="Fast Response" />
          </div>
        </div>
      </section>

      {/* Services - Bento Grid */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>What We Do</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service: string, i: number) => {
              const isLarge = i === 0 || i === 3
              return (
                <div key={i} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-white/20 transition-all hover:bg-white/[0.08] ${isLarge ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to bottom-left, ${primaryColor}1a, transparent)` }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-5" style={{ borderColor: `${primaryColor}33`, background: `${primaryColor}1a` }}>
                      <CheckCircle className="w-6 h-6" style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service}</h3>
                    <p className="text-zinc-400 leading-relaxed">Premium {service.toLowerCase()} solutions delivered with precision and care. We guarantee satisfaction on every project.</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
      <Footer />
      <MobileBookNow />
    </main>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SPLIT LAYOUT - Left/right hero with asymmetric design
   ═══════════════════════════════════════════════════════════════════════════════ */
function SplitLayout({ services }: { services: string[] }) {
  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: bgColor }}>
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" style={{ color: primaryColor }} />
            <span className="text-xl font-bold tracking-tight">{config.businessName}</span>
          </div>
          <a href={`tel:${config.phone}`} className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white/20 transition-all">
            <Phone className="w-4 h-4" />
            {config.phone}
          </a>
        </div>
      </nav>

      {/* Split Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-24">
          {/* Left - Content */}
          <div>
            {config.city && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-sm text-zinc-300">Serving {config.city}{config.state ? `, ${config.state}` : ''}</span>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6 break-words overflow-hidden">
              <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
                {config.businessName}
              </span>
            </h1>
            <p className="text-base sm:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">{config.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${config.phone}`} className="group inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all" style={{ backgroundColor: primaryColor }}>
                <Phone className="w-5 h-5" />
                Call Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all">
                Our Work
              </a>
            </div>
            {/* Trust indicators inline */}
            <div className="flex flex-wrap gap-6 mt-12">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" style={{ color: primaryColor }} />
                <span className="text-sm text-zinc-300">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: secondaryColor }} />
                <span className="text-sm text-zinc-300">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-sm text-zinc-300">Same Day Service</span>
              </div>
            </div>
          </div>
          {/* Right - Image */}
          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }} />
            </div>
            <div className="absolute -bottom-6 -left-6 backdrop-blur-xl border border-white/10 rounded-2xl p-5" style={{ backgroundColor: `${bgColor}e6` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}33` }}>
                  <Star className="w-6 h-6 fill-current" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="font-bold text-lg">500+</p>
                  <p className="text-sm text-zinc-500">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Horizontal Cards */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Services</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">What We Offer</h2>
          </div>
          <div className="space-y-4">
            {services.map((service: string, i: number) => (
              <div key={i} className="group flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{service}</h3>
                    <p className="text-sm text-zinc-500 mt-1">Professional {service.toLowerCase()} with guaranteed results</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:translate-x-1 transition-transform" style={{ color: primaryColor }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
      <Footer />
      <MobileBookNow />
    </main>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CENTERED LAYOUT - Minimalist, typography-focused
   ═══════════════════════════════════════════════════════════════════════════════ */
function CenteredLayout({ services }: { services: string[] }) {
  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: bgColor }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5" style={{ backgroundColor: `${bgColor}cc` }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
            <span className="text-lg font-bold">{config.businessName}</span>
          </div>
          <a href={`tel:${config.phone}`} className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 transition-all text-white hover:opacity-80" style={{ backgroundColor: primaryColor }}>
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{config.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </nav>

      {/* Centered Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          {config.city && (
            <p className="text-sm text-zinc-500 mb-6 uppercase tracking-widest">{config.city}{config.state ? `, ${config.state}` : ''}</p>
          )}
          <h1 className="text-4xl sm:text-6xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 break-words overflow-hidden">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(180deg, white 0%, ${primaryColor} 100%)` }}>
              {config.businessName}
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-500 max-w-xl mx-auto mb-12">{config.tagline}</p>
          <a href={`tel:${config.phone}`} className="group inline-flex items-center gap-3 text-white font-bold px-10 py-5 rounded-full text-lg hover:scale-105 transition-all" style={{ backgroundColor: primaryColor }}>
            <Phone className="w-5 h-5" />
            Get Started Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        {/* Visual divider */}
        <div className="mt-24 w-16 h-px" style={{ backgroundColor: primaryColor }} />
      </section>

      {/* Full-width image band */}
      <section className="py-4 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-96">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }} />
        </div>
      </section>

      {/* Trust Bar - Centered */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-current" style={{ color: primaryColor }} />
            <span className="text-zinc-300 font-medium">4.9 Star Rating</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: secondaryColor }} />
            <span className="text-zinc-300 font-medium">Licensed & Insured</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: primaryColor }} />
            <span className="text-zinc-300 font-medium">Same Day Service</span>
          </div>
        </div>
      </section>

      {/* Services - Centered minimal cards */}
      <section id="services" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Services</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service: string, i: number) => (
              <div key={i} className="group text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: `${primaryColor}1a` }}>
                  <CheckCircle className="w-7 h-7" style={{ color: primaryColor }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{service}</h3>
                <p className="text-sm text-zinc-500">Expert {service.toLowerCase()} tailored to your needs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTASection />
      <Footer />
      <MobileBookNow />
    </main>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

function TrustCard({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      {icon}
      <div>
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm text-zinc-500">{sub}</p>
      </div>
    </div>
  )
}

function WhyChooseUs() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>Why Choose Us</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Built on Trust,{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>
                Driven by Excellence
              </span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              With years of experience serving {config.city || 'our community'}, we&apos;ve built our reputation one satisfied customer at a time. Our commitment to quality workmanship and honest pricing sets us apart.
            </p>
            <div className="space-y-4">
              {['Transparent Pricing — No Hidden Fees', 'Background-Checked Professionals', '100% Satisfaction Guarantee', 'Available 7 Days a Week'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${primaryColor}33`, border: `1px solid ${primaryColor}4d` }}>
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  </div>
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${secondaryImageUrl})` }} />
            </div>
            <div className="absolute -bottom-6 -left-6 backdrop-blur-xl border border-white/10 rounded-2xl p-5" style={{ backgroundColor: `${bgColor}e6` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}33` }}>
                  <Star className="w-6 h-6 fill-current" style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="font-bold text-lg">500+</p>
                  <p className="text-sm text-zinc-500">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-12 sm:p-16 text-center" style={{ background: `linear-gradient(135deg, ${bgColor}, ${primaryColor}0d)` }}>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-base sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
              Call us today for a free estimate. No obligation, no hassle — just honest work at fair prices.
            </p>
            <a href={`tel:${config.phone}`} className="group inline-flex items-center gap-3 text-white font-bold px-10 py-5 rounded-full text-xl hover:scale-105 transition-all" style={{ backgroundColor: primaryColor }}>
              <Phone className="w-6 h-6" />
              {config.phone}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
          <span className="text-lg font-bold">{config.businessName}</span>
        </div>
        {config.city && (
          <p className="text-zinc-500">{config.city}{config.state ? `, ${config.state}` : ''}</p>
        )}
        <p className="text-zinc-500 mt-1">{config.phone}</p>
        <p className="mt-6 text-sm text-zinc-600">&copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
        <p className="mt-2 text-xs text-zinc-700">Design Variation: {variationId}</p>
      </div>
    </footer>
  )
}

function MobileBookNow() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:hidden">
      <a href={`tel:${config.phone}`} className="flex items-center gap-3 text-white font-bold px-6 py-3.5 rounded-full shadow-2xl shadow-black/50 hover:scale-105 transition-transform" style={{ backgroundColor: primaryColor }}>
        <Phone className="w-5 h-5" />
        <span>Book Now</span>
      </a>
    </div>
  )
}
