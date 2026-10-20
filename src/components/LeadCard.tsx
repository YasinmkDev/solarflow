import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin } from 'lucide-react-native';

import type { Lead, LeadStage } from '../data/seed';
import { rsCompact } from '../lib/format';
import { theme } from '../theme/theme';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { Chip, type ChipTone } from './Chip';

export const STAGE_META: Record<LeadStage, { label: string; tone: ChipTone }> = {
  new: { label: 'New', tone: 'info' },
  survey: { label: 'Survey booked', tone: 'warning' },
  quoted: { label: 'Quote sent', tone: 'accent' },
  won: { label: 'Won', tone: 'success' },
};

interface LeadCardProps {
  lead: Lead;
  onPress: () => void;
}

export function LeadCard({ lead, onPress }: LeadCardProps) {
  const stage = STAGE_META[lead.stage];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${lead.name}, ${lead.systemKw} kilowatt, ${stage.label}`}
      style={({ pressed }) => pressed && styles.pressed}>
      <Card style={styles.card}>
        <View style={styles.topRow}>
          <Avatar name={lead.name} />
          <View style={styles.main}>
            <Text style={styles.name} numberOfLines={1}>
              {lead.name}
            </Text>
            <View style={styles.metaRow}>
              <MapPin size={13} color={theme.colors.textTertiary} />
              <Text style={styles.meta}>
                {lead.area} · {lead.source}
                {lead.daysAgo > 0 ? ` · ${lead.daysAgo}d ago` : ' · today'}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.amount}>{rsCompact(lead.estimate)}</Text>
            <Text style={styles.kw}>{lead.systemKw} kW</Text>
          </View>
        </View>
        <Text style={styles.note} numberOfLines={2}>
          {lead.note}
        </Text>
        <View style={styles.bottomRow}>
          <Chip label={stage.label} tone={stage.tone} />
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.85 },
  card: { marginBottom: theme.spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  main: { flex: 1 },
  name: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  meta: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
  right: { alignItems: 'flex-end' },
  amount: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  kw: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  note: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginTop: theme.spacing.md,
  },
  bottomRow: { marginTop: theme.spacing.md },
});
