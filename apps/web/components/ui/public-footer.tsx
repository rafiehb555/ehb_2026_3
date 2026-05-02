import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="border-t border-glass bg-nested/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-card bg-gradient-to-br from-[#7B6EF6] to-[#2BBFA0] text-center text-sm font-bold leading-8 text-white">
                E
              </div>
              <div className="font-bold">EHB Technologies</div>
            </div>
            <p className="mt-3 text-xs text-white/50">
              Global super-app unifying 38 industries with AI + Polkadot blockchain trust.
            </p>
            <div className="mt-3 text-[10px] text-white/40">
              © 2026 EHB Technologies (Pvt.) Ltd.
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Learn</div>
            <ul className="mt-3 space-y-1.5 text-xs">
              <li>
                <Link href="/how-it-works" className="text-white/70 hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="text-white/70 hover:text-white">
                  Concepts & glossary
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-white/70 hover:text-white">
                  38 Industries
                </Link>
              </li>
              <li>
                <Link href="/dmo/stl" className="text-white/70 hover:text-white">
                  STL ladder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Use</div>
            <ul className="mt-3 space-y-1.5 text-xs">
              <li>
                <Link href="/gosellr" className="text-white/70 hover:text-white">
                  GoSellr Marketplace
                </Link>
              </li>
              <li>
                <Link href="/ai-marketplace" className="text-white/70 hover:text-white">
                  AI Services
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="text-white/70 hover:text-white">
                  Franchise Program
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-white/70 hover:text-white">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/rider" className="text-white/70 hover:text-white">
                  Become a Rider
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">Company</div>
            <ul className="mt-3 space-y-1.5 text-xs text-white/70">
              <li>Founder: Muhammad Rafi</li>
              <li>HQ: Islamabad, Pakistan</li>
              <li>
                <a href="mailto:ehb.rafi@gmail.com" className="hover:text-white">
                  ehb.rafi@gmail.com
                </a>
              </li>
              <li>+92 346 4385 703</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-glass pt-4 text-center text-[10px] text-white/40">
          One Platform. 38 Industries. 700+ Services. Infinite Trust.
        </div>
      </div>
    </footer>
  );
}
