import { redirect } from 'next/navigation';

/**
 * /portal/affiliate → /affiliate (canonical)
 * Avoids duplicate routes; sidebar nav links go directly to canonical.
 */
export default function PortalAffiliateRedirect() {
  redirect('/affiliate');
}
