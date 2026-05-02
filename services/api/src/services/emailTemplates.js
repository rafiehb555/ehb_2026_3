/**
 * EHB — Email Notification Template Library
 *
 * 8 transactional email templates rendered as inline-CSS HTML strings.
 * Used by NotificationService.sendEmail() — passes the rendered HTML to
 * the SMTP/SES adapter for delivery.
 *
 * Templates use safe inline CSS (no external stylesheets, no <link>) for
 * compatibility with Gmail / Outlook / Yahoo / Apple Mail / mobile clients.
 *
 * All templates support EHB brand colors and include:
 *   - Header with logo
 *   - Body content
 *   - CTA button
 *   - Footer with legal disclaimer + unsubscribe link
 *   - Inline-styled (no external CSS)
 *   - Responsive max-width 600px
 */

const COLORS = {
  bg: '#04060e',
  card: '#13162A',
  primary: '#7B6EF6',
  teal: '#2BBFA0',
  amber: '#F0A030',
  red: '#F05858',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.6)',
  border: 'rgba(255,255,255,0.1)',
};

/** Wrapper providing header + footer for all templates */
function wrap({ title, body, ctaLabel, ctaHref, accentColor = COLORS.primary }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:${COLORS.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${COLORS.card};border-radius:16px;overflow:hidden;border:1px solid ${COLORS.border};">

          <!-- HEADER -->
          <tr>
            <td style="padding:24px 32px;background:linear-gradient(135deg,${accentColor}33 0%,transparent 100%);border-bottom:1px solid ${COLORS.border};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;background:linear-gradient(135deg,${COLORS.primary},${COLORS.teal});padding:6px 14px;border-radius:8px;font-size:14px;font-weight:700;color:white;letter-spacing:0.5px;">EHB</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:${COLORS.textMuted};">EHB Affiliate Program</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px;">
              ${body}
              ${ctaLabel && ctaHref ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td align="center">
                    <a href="${ctaHref}" style="display:inline-block;background:linear-gradient(135deg,${accentColor},${accentColor}cc);color:white;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;text-decoration:none;box-shadow:0 4px 16px ${accentColor}55;">
                      ${ctaLabel}
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px 32px;background:rgba(255,255,255,0.02);border-top:1px solid ${COLORS.border};">
              <p style="margin:0 0 8px;font-size:11px;color:${COLORS.textMuted};line-height:1.6;">
                <strong style="color:${COLORS.amber};">⚖️ EHB is NOT MLM.</strong> Income comes only from real product/service sales. No income from joining fees or pure recruitment. <a href="https://ehb.com/affiliate#compliance" style="color:${COLORS.primary};text-decoration:none;">View Income Disclosure</a>.
              </p>
              <p style="margin:0;font-size:10px;color:${COLORS.textMuted};line-height:1.5;">
                EHB Technologies (Pvt.) Ltd. · Pakistan SECP-aligned · This is a transactional email related to your affiliate account.<br/>
                <a href="{{unsubscribe_url}}" style="color:${COLORS.textMuted};text-decoration:underline;">Unsubscribe</a> ·
                <a href="https://ehb.com/affiliate/help" style="color:${COLORS.textMuted};text-decoration:underline;">Help &amp; Legal</a> ·
                <a href="mailto:support@ehb.com" style="color:${COLORS.textMuted};text-decoration:underline;">Contact Support</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** 1. Welcome email — sent after affiliate program join */
export function renderWelcomeEmail({ name, referralCode, dashboardUrl }) {
  return {
    subject: '🎉 Welcome to the EHB Affiliate Program!',
    html: wrap({
      title: 'Welcome to EHB Affiliate',
      accentColor: COLORS.primary,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:${COLORS.text};">Welcome, ${name}! 👋</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          You're now an EHB Affiliate. Your unique referral code is ready, and you can start earning from real product sales right away — no joining fees, no purchase required.
        </p>
        <div style="margin:20px 0;padding:16px;background:rgba(123,110,246,0.1);border:1px solid ${COLORS.primary}55;border-radius:10px;text-align:center;">
          <div style="font-size:11px;color:${COLORS.textMuted};letter-spacing:1px;text-transform:uppercase;">Your Referral Code</div>
          <div style="margin-top:8px;font-size:24px;font-weight:700;color:${COLORS.teal};font-family:Menlo,Monaco,Consolas,monospace;">${referralCode}</div>
        </div>
        <p style="margin:0 0 8px;font-size:13px;color:${COLORS.textMuted};">What's next:</p>
        <ul style="margin:0;padding-left:20px;font-size:13px;line-height:1.8;color:${COLORS.textMuted};">
          <li>Open your dashboard to grab your unique referral link</li>
          <li>Use the Sharing Tools to post on WhatsApp/Facebook/LinkedIn</li>
          <li>Browse the Marketplace to find high-commission products</li>
          <li>Earn 10% direct + 5% network pool on every sale</li>
        </ul>
      `,
      ctaLabel: 'Open Your Dashboard →',
      ctaHref: dashboardUrl,
    }),
  };
}

/** 2. Commission earned email */
export function renderCommissionEarnedEmail({ name, amountUsd, type, sourceUserName, walletUrl }) {
  return {
    subject: `💰 You earned $${amountUsd.toFixed(2)} on EHB`,
    html: wrap({
      title: 'Commission Earned',
      accentColor: COLORS.teal,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          Great news — you just earned a commission. It's already credited to your Affiliate Wallet (80% USDT + 20% EHBGC by default).
        </p>
        <div style="margin:20px 0;padding:24px;background:rgba(43,191,160,0.1);border:1px solid ${COLORS.teal}55;border-radius:10px;text-align:center;">
          <div style="font-size:11px;color:${COLORS.textMuted};letter-spacing:1px;text-transform:uppercase;">${type}</div>
          <div style="margin-top:8px;font-size:36px;font-weight:700;color:${COLORS.teal};">+$${amountUsd.toFixed(2)}</div>
          ${sourceUserName ? `<div style="margin-top:8px;font-size:12px;color:${COLORS.textMuted};">from ${sourceUserName}</div>` : ''}
        </div>
        <p style="margin:0;font-size:12px;color:${COLORS.textMuted};">
          Funds are subject to a 14-day pending clearance window before becoming available to withdraw. After clearance, you can transfer to Main Wallet (instant, FREE) or withdraw via JazzCash, HBL, or USDT TRC20.
        </p>
      `,
      ctaLabel: 'View Wallet →',
      ctaHref: walletUrl,
    }),
  };
}

/** 3. Withdrawal approved */
export function renderWithdrawalApprovedEmail({ name, amountUsd, asset, expectedSettlementHours, txnId }) {
  return {
    subject: `✅ Withdrawal approved — $${amountUsd.toFixed(2)}`,
    html: wrap({
      title: 'Withdrawal Approved',
      accentColor: COLORS.teal,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          Your withdrawal request has been approved by the DMO multi-sig review and is now being processed.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:rgba(255,255,255,0.03);border-radius:10px;">
          <tr><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:12px;color:${COLORS.textMuted};">Amount</td><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:14px;font-weight:600;color:${COLORS.teal};text-align:right;">$${amountUsd.toFixed(2)}</td></tr>
          <tr><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:12px;color:${COLORS.textMuted};">Asset / Rail</td><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:14px;text-align:right;">${asset}</td></tr>
          <tr><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:12px;color:${COLORS.textMuted};">Expected settlement</td><td style="padding:12px 16px;border-bottom:1px solid ${COLORS.border};font-size:14px;text-align:right;">${expectedSettlementHours}h</td></tr>
          <tr><td style="padding:12px 16px;font-size:12px;color:${COLORS.textMuted};">Transaction ID</td><td style="padding:12px 16px;font-size:12px;text-align:right;font-family:Menlo,monospace;color:${COLORS.primary};">${txnId}</td></tr>
        </table>
      `,
      ctaLabel: 'Track Withdrawal →',
      ctaHref: `https://ehb.com/wallet/withdrawals/${txnId}`,
    }),
  };
}

/** 4. Withdrawal rejected */
export function renderWithdrawalRejectedEmail({ name, amountUsd, reason, supportUrl }) {
  return {
    subject: `❌ Withdrawal could not be processed`,
    html: wrap({
      title: 'Withdrawal Rejected',
      accentColor: COLORS.red,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          Your withdrawal request for <strong style="color:${COLORS.text};">$${amountUsd.toFixed(2)}</strong> could not be processed at this time.
        </p>
        <div style="margin:20px 0;padding:16px;background:rgba(240,88,88,0.1);border:1px solid ${COLORS.red}55;border-radius:10px;">
          <div style="font-size:11px;color:${COLORS.textMuted};letter-spacing:1px;text-transform:uppercase;">Reason</div>
          <div style="margin-top:8px;font-size:14px;color:${COLORS.text};line-height:1.6;">${reason}</div>
        </div>
        <p style="margin:0;font-size:12px;color:${COLORS.textMuted};">
          The funds remain in your Affiliate Wallet — you can submit a new request after addressing the issue, or contact support if you believe this was in error.
        </p>
      `,
      ctaLabel: 'Contact Support →',
      ctaHref: supportUrl,
    }),
  };
}

/** 5. KYC required */
export function renderKycRequiredEmail({ name, currentTier, requiredTier, kycUrl }) {
  return {
    subject: `🆔 KYC Tier ${requiredTier} required to continue earning`,
    html: wrap({
      title: 'KYC Required',
      accentColor: COLORS.amber,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          To continue receiving commissions and unlock higher withdrawal limits, please complete KYC Tier ${requiredTier}.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
          <tr>
            <td style="padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;text-align:center;">
              <div style="font-size:10px;color:${COLORS.textMuted};text-transform:uppercase;">Current</div>
              <div style="margin-top:4px;font-size:18px;font-weight:700;">Tier ${currentTier}</div>
            </td>
            <td style="width:40px;text-align:center;font-size:18px;color:${COLORS.amber};">→</td>
            <td style="padding:12px;background:rgba(240,160,48,0.1);border:1px solid ${COLORS.amber}55;border-radius:8px;text-align:center;">
              <div style="font-size:10px;color:${COLORS.amber};text-transform:uppercase;">Required</div>
              <div style="margin-top:4px;font-size:18px;font-weight:700;color:${COLORS.amber};">Tier ${requiredTier}</div>
            </td>
          </tr>
        </table>
        <p style="margin:0;font-size:12px;color:${COLORS.textMuted};">
          Tier 1 takes ~5 minutes (just an ID document). Tier 2 adds selfie + address proof. Higher tiers unlock larger monthly limits.
        </p>
      `,
      ctaLabel: 'Complete KYC Now →',
      ctaHref: kycUrl,
    }),
  };
}

/** 6. Rank promotion */
export function renderRankPromotionEmail({ name, fromRank, toRank, bonusUsd, dashboardUrl }) {
  const rankNames = { R1: 'Starter', R2: 'Beginner', R3: 'Builder', R4: 'Leader', R5: 'Manager', R6: 'Director', R7: 'Sr Director', R8: 'Executive', R9: 'Regional Head', R10: 'Global Leader' };
  return {
    subject: `🏆 Promoted to ${toRank} ${rankNames[toRank] || ''}!`,
    html: wrap({
      title: 'Rank Promotion',
      accentColor: COLORS.amber,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">🎉 Congrats, ${name}!</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          You've been promoted from <strong>${fromRank}</strong> to <strong style="color:${COLORS.amber};">${toRank} ${rankNames[toRank] || ''}</strong>! Your hard work paid off.
        </p>
        <div style="margin:20px 0;padding:24px;background:linear-gradient(135deg,rgba(240,160,48,0.15),rgba(123,110,246,0.05));border:1px solid ${COLORS.amber}55;border-radius:10px;text-align:center;">
          <div style="font-size:11px;color:${COLORS.textMuted};letter-spacing:1px;text-transform:uppercase;">Rank Achievement Bonus</div>
          <div style="margin-top:8px;font-size:36px;font-weight:700;color:${COLORS.amber};">+$${bonusUsd.toFixed(2)}</div>
          <div style="margin-top:8px;font-size:12px;color:${COLORS.textMuted};">Already credited to your Affiliate Wallet</div>
        </div>
        <p style="margin:0;font-size:13px;color:${COLORS.textMuted};line-height:1.6;">
          New unlocks at ${toRank}: higher daily caps · more Track B levels · expanded industry verticals · access to higher-tier bonuses.
        </p>
      `,
      ctaLabel: 'View New Rank →',
      ctaHref: dashboardUrl,
    }),
  };
}

/** 7. Refund / commission reversal */
export function renderRefundReversalEmail({ name, amountUsd, originalCommissionDate, reason, supportUrl }) {
  return {
    subject: `↩️ Commission reversal — $${amountUsd.toFixed(2)}`,
    html: wrap({
      title: 'Commission Reversed',
      accentColor: COLORS.amber,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          A previously credited commission has been reversed because the underlying purchase was refunded. This is part of our 30-day cooling-off policy.
        </p>
        <div style="margin:20px 0;padding:16px;background:rgba(240,160,48,0.1);border:1px solid ${COLORS.amber}55;border-radius:10px;">
          <div style="font-size:24px;font-weight:700;color:${COLORS.amber};">−$${amountUsd.toFixed(2)}</div>
          <div style="margin-top:4px;font-size:12px;color:${COLORS.textMuted};">Original commission date: ${originalCommissionDate}</div>
          <div style="margin-top:4px;font-size:12px;color:${COLORS.textMuted};">Reason: ${reason}</div>
        </div>
        <p style="margin:0;font-size:12px;color:${COLORS.textMuted};">
          No clawback is applied beyond the original commission. If you have questions, our compliance team is here to help.
        </p>
      `,
      ctaLabel: 'Contact Compliance →',
      ctaHref: supportUrl,
    }),
  };
}

/** 8. Compliance flag (high-risk activity detected) */
export function renderComplianceFlagEmail({ name, reason, riskScore, dmoUrl }) {
  return {
    subject: `⚠️ Compliance review on your account`,
    html: wrap({
      title: 'Compliance Review',
      accentColor: COLORS.red,
      body: `
        <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;">Hi ${name},</h1>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${COLORS.textMuted};">
          Our automated risk system has flagged activity on your account for manual review by our DMO compliance team.
        </p>
        <div style="margin:20px 0;padding:16px;background:rgba(240,88,88,0.1);border:1px solid ${COLORS.red}55;border-radius:10px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
            <span style="font-size:11px;color:${COLORS.textMuted};text-transform:uppercase;">Risk Score</span>
            <span style="font-size:20px;font-weight:700;color:${COLORS.red};">${riskScore}/100</span>
          </div>
          <div style="font-size:13px;color:${COLORS.text};line-height:1.6;">${reason}</div>
        </div>
        <p style="margin:0;font-size:12px;color:${COLORS.textMuted};line-height:1.7;">
          During the review (typically 24-48 hours), withdrawals are temporarily on hold. Earned commissions remain intact. If you believe this was triggered in error, please respond with details.
        </p>
      `,
      ctaLabel: 'View Review Status →',
      ctaHref: dmoUrl,
    }),
  };
}

/** Index — all templates exported as a single object for NotificationService */
export const EMAIL_TEMPLATES = {
  welcome: renderWelcomeEmail,
  commissionEarned: renderCommissionEarnedEmail,
  withdrawalApproved: renderWithdrawalApprovedEmail,
  withdrawalRejected: renderWithdrawalRejectedEmail,
  kycRequired: renderKycRequiredEmail,
  rankPromotion: renderRankPromotionEmail,
  refundReversal: renderRefundReversalEmail,
  complianceFlag: renderComplianceFlagEmail,
};

export default EMAIL_TEMPLATES;
