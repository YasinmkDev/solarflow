import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
  AlertCircle,
  Bell,
  CalendarClock,
  ChevronRight,
  Sparkles,
  UserPlus,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIn } from '../../components/AnimatedIn';
import { AnimatedNumber } from '../../components/AnimatedNumber';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { JobCard } from '../../components/JobCard';
import { RevenueChart } from '../../components/RevenueChart';
import { Ring } from '../../components/Ring';
import { SectionTitle } from '../../components/Section';
import { BUSINESS, JOBS, PAYMENTS } from '../../data/seed';
import { rs, rsCompact } from '../../lib/format';
import { theme } from '../../theme/theme';

export default function HomeScreen() {
  const targetPct = BUSINESS.monthCollected / BUSINESS.monthTarget;
  const todayJob = JOBS.find((j) => j.scheduled.startsWith('Today'));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AnimatedIn index={0}>
          <View style={styles.header}>
            <View style={styles.headerMain}>
              <Text style={styles.greeting}>Assalam-o-Alaikum, {BUSINESS.owner}</Text>
              <Text style={styles.business}>{BUSINESS.name}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/paywall')}
              accessibilityRole="button"
              accessibilityLabel="Notifications and Pro"
              style={styles.bell}
              hitSlop={8}
            >
              <Bell size={21} color={theme.colors.text} />
              <View style={styles.dot} />
            </Pressable>
          </View>
        </AnimatedIn>

        <AnimatedIn index={1}>
          <Card style={styles.collectedCard}>
            <View style={styles.collectedMain}>
              <Text style={styles.label}>Collected this month</Text>
              <AnimatedNumber
                value={BUSINESS.monthCollected}
                format={rs}
                style={styles.bigNumber}
              />
              <Text style={styles.sub}>
                of {rs(BUSINESS.monthTarget)} target · {Math.round(targetPct * 100)}%
              </Text>
              <View style={styles.statRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{rsCompact(BUSINESS.outstanding)}</Text>
                  <Text style={styles.statLabel}>Outstanding</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <Text style={[styles.statValue, styles.statDanger]}>
                    {BUSINESS.overdueCount} customers
                  </Text>
                  <Text style={styles.statLabel}>Overdue</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{JOBS.length}</Text>
                  <Text style={styles.statLabel}>Active jobs</Text>
                </View>
              </View>
            </View>
            <Ring value={targetPct} size={86}>
              <Text style={styles.ringText}>{Math.round(targetPct * 100)}%</Text>
            </Ring>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={2}>
          <SectionTitle title="Needs your attention" />
          <Card padded={false} style={styles.attentionCard}>
            <AttentionRow
              icon={<AlertCircle size={19} color={theme.colors.danger} />}
              tint={theme.colors.dangerTint}
              title="Rs 8,75,000 balance — Dr Fazal Rahman"
              sub="Installment 2 was due 14 Oct. Send a reminder."
              onPress={() => router.push('/customer/c3')}
            />
            <AttentionRow
              icon={<UserPlus size={19} color={theme.colors.info} />}
              tint={theme.colors.infoTint}
              title="New lead — Hotel Swat Regency, 25 kW"
              sub="Asked for a site visit this week."
              onPress={() => router.push('/(tabs)/leads')}
              divider
            />
            <AttentionRow
              icon={<CalendarClock size={19} color={theme.colors.warning} />}
              tint={theme.colors.warningTint}
              title="Service visit on Saturday"
              sub="Bakht Rokhan, Charbagh — 6-month free service."
              onPress={() => router.push('/(tabs)/jobs')}
              divider
            />
          </Card>
        </AnimatedIn>

        <AnimatedIn index={3}>
          <SectionTitle title="Collections" />
          <Card>
            <Text style={styles.chartTitle}>Last 12 weeks</Text>
            <RevenueChart data={BUSINESS.revenueSeries} labels={BUSINESS.revenueLabels} />
          </Card>
        </AnimatedIn>

        {todayJob && (
          <AnimatedIn index={4}>
            <SectionTitle
              title="Today's job"
              actionLabel="All jobs"
              onAction={() => router.push('/(tabs)/jobs')}
            />
            <JobCard job={todayJob} />
          </AnimatedIn>
        )}

        <AnimatedIn index={5}>
          <SectionTitle
            title="Recent payments"
            actionLabel="Payments"
            onAction={() => router.push('/(tabs)/payments')}
          />
          <Card padded={false} style={styles.paymentsCard}>
            {PAYMENTS.map((payment, i) => (
              <Pressable
                key={payment.id}
                onPress={() => router.push(`/customer/${payment.customerId}`)}
                accessibilityRole="button"
                accessibilityLabel={`${payment.name} paid ${rs(payment.amount)}`}
                style={[styles.paymentRow, i > 0 && styles.paymentDivider]}
              >
                <Avatar name={payment.name} size={38} />
                <View style={styles.paymentMain}>
                  <Text style={styles.paymentName} numberOfLines={1}>
                    {payment.name}
                  </Text>
                  <Text style={styles.paymentMeta}>
                    {payment.method} · {payment.when}
                  </Text>
                </View>
                <Text style={styles.paymentAmount}>+{rsCompact(payment.amount)}</Text>
              </Pressable>
            ))}
          </Card>
        </AnimatedIn>

        <AnimatedIn index={6}>
          <Pressable
            onPress={() => router.push('/paywall')}
            accessibilityRole="button"
            accessibilityLabel="Upgrade to SolarFlow Pro"
            style={({ pressed }) => [styles.proBanner, pressed && styles.pressed]}
          >
            <Sparkles size={19} color={theme.colors.accentDark} />
            <View style={styles.proMain}>
              <Text style={styles.proTitle}>You are on the Free plan — 5 of 5 jobs used</Text>
              <Text style={styles.proSub}>Pro removes the limit. Rs 2,999/month.</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.accentDark} />
          </Pressable>
        </AnimatedIn>
      </ScrollView>
    </SafeAreaView>
  );
}

function AttentionRow({
  icon,
  tint,
  title,
  sub,
  onPress,
  divider = false,
}: {
  icon: React.ReactNode;
  tint: string;
  title: string;
  sub: string;
  onPress: () => void;
  divider?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.attentionRow, divider && styles.attentionDivider]}
    >
      <View style={[styles.attentionIcon, { backgroundColor: tint }]}>{icon}</View>
      <View style={styles.attentionMain}>
        <Text style={styles.attentionTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.attentionSub} numberOfLines={1}>
          {sub}
        </Text>
      </View>
      <ChevronRight size={17} color={theme.colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  content: { padding: theme.spacing.xl, paddingBottom: theme.spacing.xxxl },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.xl },
  headerMain: { flex: 1 },
  greeting: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
  business: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginTop: 2,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.danger,
  },
  collectedCard: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.lg },
  collectedMain: { flex: 1 },
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
  sub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  ringText: {
    fontSize: theme.fontSize.section,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  stat: { flex: 1 },
  statValue: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  statDanger: { color: theme.colors.danger },
  statLabel: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  attentionCard: { overflow: 'hidden' },
  attentionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    minHeight: 64,
  },
  attentionDivider: { borderTopWidth: 1, borderTopColor: theme.colors.border },
  attentionIcon: {
    width: 38,
    height: 38,
    borderRadius: theme.radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attentionMain: { flex: 1 },
  attentionTitle: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    lineHeight: 19,
  },
  attentionSub: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  chartTitle: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  paymentsCard: { overflow: 'hidden', paddingHorizontal: theme.spacing.lg },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 60,
  },
  paymentDivider: { borderTopWidth: 1, borderTopColor: theme.colors.border },
  paymentMain: { flex: 1 },
  paymentName: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  paymentMeta: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
  },
  proBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.accentTint,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
  },
  pressed: { opacity: 0.8 },
  proMain: { flex: 1 },
  proTitle: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  proSub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
});
