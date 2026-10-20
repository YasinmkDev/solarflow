/**
 * SolarFlow design tokens — see DESIGN.md.
 * Clean industry-grade SaaS: warm off-white canvas, white surfaces, hairline
 * borders, near-flat elevation, ONE flat accent. No gradients, no glow, no neon.
 */
export const theme = {
  colors: {
    canvas: '#FAFAF8',
    surface: '#FFFFFF',
    surfaceAlt: '#F4F4F2',
    text: '#16130E',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E8E6E1',
    borderStrong: '#D9D6CF',
    accent: '#D97706',
    accentDark: '#B45309',
    accentTint: '#FEF3C7',
    success: '#15803D',
    successTint: '#F0FDF4',
    warning: '#B45309',
    warningTint: '#FFFBEB',
    danger: '#B91C1C',
    dangerTint: '#FEF2F2',
    info: '#1D4ED8',
    infoTint: '#EFF6FF',
    tabInactive: '#9CA3AF',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 },
  radii: { sm: 8, md: 12, lg: 16, pill: 999 },
  fontSize: { caption: 13, small: 14, body: 15, section: 16, title: 20, display: 28 },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  shadow: {
    shadowColor: '#16130E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
