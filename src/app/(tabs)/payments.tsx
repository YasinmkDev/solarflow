import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIn } from '../../components/AnimatedIn';
import { AnimatedNumber } from '../../components/AnimatedNumber';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { PaymentRow } from '../../components/PaymentRow';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionTitle } from '../../components/Section';
import { BUSINESS, CUSTOMERS, PAYMENTS } from '../../data/seed';
import { rs, rsCompact } from '../../lib/format';
import { theme } from '../../theme/theme';

export default function PaymentsScreen() {
  const targetPct = BUSINESS.monthCollected / BUSINESS.monthTarget;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Payments</Text>
          <Text style={styles.subtitle}>Khata — who paid, who still owes</Text>
        </View>

        <AnimatedIn index={0}>
          <Card>
            <Text style={styles.label}>Collected in October</Text>
            <AnimatedNumber value={BUSINESS.monthCollected} format={rs} style={styles.bigNumber} />
            <View style={styles.progressWrap}>
              <ProgressBar value={targetPct} />
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                Target {rs(BUSINESS.monthTarget)} · {Math.round(targetPct * 100)}%
              </Text>
              <Chip label={`${rsCompact(BUSINESS.outstanding)} outstanding`} tone="warning" />
            </View>
            <View style={styles.overdueRow}>
              <Text style={styles.overdueText}>
                {BUSINESS.overdueCount} customers are overdue. Reminders go out on WhatsApp from
                each customer page.
              </Text>
            </View>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={1}>
          <SectionTitle title="Customer khata" />
          <Card padded={false} style={styles.khataCard}>
            {CUSTOMERS.map((customer) => (
              <PaymentRow
                key={customer.id}
                customer={customer}
                onPress={() => router.push(`/customer/${customer.id}`)}
              />
            ))}
          </Card>
        </AnimatedIn>

        <AnimatedIn index={2}>
          <SectionTitle title="Recent payments" />
          <Card padded={false} style={styles.recentCard}>
            {PAYMENTS.map((payment, i) => (
              <View key={payment.id} style={[styles.recentRow, i > 0 && styles.recentDivider]}>
                <View style={styles.recentMain}>
                  <Text style={styles.recentName} numberOfLines={1}>
                    {payment.name}
                  </Text>
                  <Text style={styles.recentMeta}>
                    {payment.method} · {payment.when}
                  </Text>
                </View>
                <Text style={styles.recentAmount}>+{rs(payment.amount)}</Text>
              </View>
            ))}
          </Card>
        </AnimatedIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  content: { padding: theme.spacing.xl, paddingBottom: theme.spacing.xxxl },
  header: { marginBottom: theme.spacing.xl },
  title: {
    fontSize: theme.fontSize.display,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  bigNumber: {
    fontSize: 30,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.xs,
  },
  progressWrap: { marginTop: theme.spacing.lg },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  summaryText: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
  overdueRow: {
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  overdueText: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  khataCard: { paddingHorizontal: theme.spacing.xl },
  recentCard: { paddingHorizontal: theme.spacing.xl },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  recentDivider: { borderTopWidth: 1, borderTopColor: theme.colors.border },
  recentMain: { flex: 1 },
  recentName: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  recentMeta: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  recentAmount: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
  },
});
