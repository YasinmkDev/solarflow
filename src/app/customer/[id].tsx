import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, MessageCircle, Phone, PiggyBank } from 'lucide-react-native';

import { AnimatedIn } from '../../components/AnimatedIn';
import { Avatar } from '../../components/Avatar';
import { GhostButton, PrimaryButton } from '../../components/Buttons';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionTitle } from '../../components/Section';
import { STAGE_META } from '../../components/LeadCard';
import { CUSTOMERS, LEADS } from '../../data/seed';
import { rs } from '../../lib/format';
import { theme } from '../../theme/theme';

export default function CustomerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reminderSent, setReminderSent] = useState(false);

  const customer = CUSTOMERS.find((c) => c.id === id);
  const lead = LEADS.find((l) => l.customerId === id);

  if (!customer && !lead) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Customer not found</Text>
        <Text style={styles.emptyText}>This record may have been removed.</Text>
        <GhostButton label="Go back" onPress={() => router.back()} />
      </View>
    );
  }

  // Lead who is not a customer yet — the job here is to move them to a quote.
  if (!customer && lead) {
    const stage = STAGE_META[lead.stage];
    return (
      <ScrollView style={styles.safe} contentContainerStyle={styles.content}>
        <AnimatedIn index={0}>
          <View style={styles.identity}>
            <Avatar name={lead.name} size={56} />
            <View style={styles.identityMain}>
              <Text style={styles.name}>{lead.name}</Text>
              <Text style={styles.meta}>{lead.area}</Text>
            </View>
            <Chip label={stage.label} tone={stage.tone} />
          </View>
        </AnimatedIn>
        <AnimatedIn index={1}>
          <SectionTitle title="Enquiry" />
          <Card>
            <SpecRow label="System asked for" value={`${lead.systemKw} kW`} />
            <SpecRow label="Estimate" value={rs(lead.estimate)} />
            <SpecRow label="Source" value={lead.source} />
            <SpecRow label="Note" value={lead.note} last />
          </Card>
        </AnimatedIn>
        <AnimatedIn index={2}>
          <View style={styles.cta}>
            <PrimaryButton
              label="Build quotation"
              onPress={() => router.push('/(tabs)/quote')}
            />
          </View>
        </AnimatedIn>
      </ScrollView>
    );
  }

  // Installed customer.
  const c = customer!;
  const due = c.totalPrice - c.paid;
  const pct = c.paid / c.totalPrice;

  return (
    <ScrollView style={styles.safe} contentContainerStyle={styles.content}>
      <AnimatedIn index={0}>
        <View style={styles.identity}>
          <Avatar name={c.name} size={56} />
          <View style={styles.identityMain}>
            <Text style={styles.name}>{c.name}</Text>
            <Text style={styles.meta}>
              {c.area} · {c.phone}
            </Text>
          </View>
          {due <= 0 ? <Chip label="Paid in full" tone="success" /> : <Chip label="Balance due" tone="danger" />}
        </View>
      </AnimatedIn>

      <AnimatedIn index={1}>
        <Card style={styles.savingsCard}>
          <View style={styles.savingsIcon}>
            <PiggyBank size={19} color={theme.colors.success} />
          </View>
          <View style={styles.savingsMain}>
            <Text style={styles.savingsValue}>{rs(c.monthlySaving)} saved every month</Text>
            <Text style={styles.savingsSub}>
              Estimated from the {c.systemKw} kW system installed {c.installedOn}.
            </Text>
          </View>
        </Card>
      </AnimatedIn>

      <AnimatedIn index={2}>
        <SectionTitle title="System" />
        <Card>
          <SpecRow label="Size" value={`${c.systemKw} kW`} />
          <SpecRow label="Panels" value={c.panels} />
          <SpecRow label="Inverter" value={c.inverter} />
          <SpecRow label="Battery" value={c.battery} />
          <SpecRow label="Installed" value={c.installedOn} last />
        </Card>
      </AnimatedIn>

      <AnimatedIn index={3}>
        <SectionTitle title="Payments" />
        <Card>
          <View style={styles.payTotals}>
            <View>
              <Text style={styles.payLabel}>Paid</Text>
              <Text style={styles.payValue}>{rs(c.paid)}</Text>
            </View>
            <View style={styles.payRight}>
              <Text style={styles.payLabel}>Still due</Text>
              <Text style={[styles.payValue, due > 0 && styles.payDue]}>{rs(Math.max(due, 0))}</Text>
            </View>
          </View>
          <View style={styles.progressWrap}>
            <ProgressBar value={pct} color={due <= 0 ? theme.colors.success : theme.colors.accent} />
          </View>
          <Text style={styles.paySub}>
            Total contract {rs(c.totalPrice)} · {Math.round(pct * 100)}% collected
          </Text>
          {due > 0 &&
            (reminderSent ? (
              <View style={styles.sentRow}>
                <View style={styles.sentIcon}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                </View>
                <Text style={styles.sentText}>Reminder sent on WhatsApp</Text>
              </View>
            ) : (
              <View style={styles.reminderBtn}>
                <PrimaryButton
                  label="Send WhatsApp reminder"
                  onPress={() => setReminderSent(true)}
                />
              </View>
            ))}
        </Card>
      </AnimatedIn>

      <AnimatedIn index={4}>
        <View style={styles.callBtn}>
          <GhostButton label={`Call ${c.name.split(' ')[0]}`} onPress={() => {}} />
          <View style={styles.callHint}>
            <Phone size={13} color={theme.colors.textTertiary} />
            <Text style={styles.callHintText}>{c.phone}</Text>
            <MessageCircle size={13} color={theme.colors.textTertiary} />
          </View>
        </View>
      </AnimatedIn>
    </ScrollView>
  );
}

function SpecRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.specRow, !last && styles.specDivider]}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  content: { padding: theme.spacing.xl, paddingBottom: theme.spacing.xxxl },
  emptyWrap: {
    flex: 1,
    backgroundColor: theme.colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  emptyTitle: { fontSize: theme.fontSize.title, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  emptyText: { fontSize: theme.fontSize.small, color: theme.colors.textSecondary, marginBottom: theme.spacing.lg },
  identity: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  identityMain: { flex: 1 },
  name: { fontSize: theme.fontSize.title, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  meta: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  savingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.successTint,
    borderColor: theme.colors.successTint,
  },
  savingsIcon: {
    width: 38,
    height: 38,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingsMain: { flex: 1 },
  savingsValue: { fontSize: theme.fontSize.small, fontWeight: theme.fontWeight.bold, color: theme.colors.success },
  savingsSub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2, lineHeight: 17 },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  specDivider: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  specLabel: { fontSize: theme.fontSize.small, color: theme.colors.textSecondary },
  specValue: {
    flex: 1,
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    textAlign: 'right',
  },
  payTotals: { flexDirection: 'row', justifyContent: 'space-between' },
  payRight: { alignItems: 'flex-end' },
  payLabel: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
  payValue: { fontSize: theme.fontSize.section, fontWeight: theme.fontWeight.bold, color: theme.colors.text, marginTop: 2 },
  payDue: { color: theme.colors.danger },
  progressWrap: { marginTop: theme.spacing.lg },
  paySub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: theme.spacing.md },
  reminderBtn: { marginTop: theme.spacing.lg },
  sentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.successTint,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    minHeight: 48,
  },
  sentIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentText: { fontSize: theme.fontSize.small, fontWeight: theme.fontWeight.semibold, color: theme.colors.success },
  callBtn: { marginTop: theme.spacing.xxl },
  callHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: theme.spacing.md,
  },
  callHintText: { fontSize: theme.fontSize.caption, color: theme.colors.textTertiary },
  cta: { marginTop: theme.spacing.xxl },
});
