import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "rgba(255,255,255,0.85)" }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="text-white text-sm font-semibold mb-4">Product</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/product/today" className="hover:text-white transition-colors">Today</Link></li>
              <li><Link to="/product/operations" className="hover:text-white transition-colors">Operations</Link></li>
              <li><Link to="/product/knowledge" className="hover:text-white transition-colors">Knowledge & Ask</Link></li>
              <li><Link to="/product/compliance" className="hover:text-white transition-colors">Compliance & QSPP</Link></li>
              <li><Link to="/product/pbs-intelligence" className="hover:text-white transition-colors">PBS intelligence</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white text-sm font-semibold mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/getting-started" className="hover:text-white transition-colors">Getting started</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/book-walkthrough" className="hover:text-white transition-colors">Book a walkthrough</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white text-sm font-semibold mb-4">Trust</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white text-sm font-semibold mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${siteConfig.brand.contactEmail}`} className="hover:text-white transition-colors">
                  {siteConfig.brand.contactEmail}
                </a>
              </li>
              <li>{siteConfig.brand.location}</li>
              <li>{siteConfig.brand.abn}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/60 max-w-3xl">
          {siteConfig.disclaimers.qspp}
        </div>
        <div className="mt-4 text-xs text-white/50">
          © {new Date().getFullYear()} Chemist Care Tools. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
