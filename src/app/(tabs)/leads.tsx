import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SearchX } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIn } from '../../components/AnimatedIn';
import { LeadCard } from '../../components/LeadCard';
import { LEADS, type LeadStage } from '../../data/seed';
import { rsCompact } from '../../lib/format';
import { theme } from '../../theme/theme';

type Filter = LeadStage | 'all';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'survey', label: 'Survey' },
  { id: 'quoted', label: 'Quoted' },
  { id: 'won', label: 'Won' },
];

export default function LeadsScreen() {
  const [filter, setFilter] = useState<Filter>('all');

  const leads = useMemo(
    () => (filter === 'all' ? LEADS : LEADS.filter((l) => l.stage === filter)),
    [filter],
  );
  const pipelineValue = useMemo(
    () => LEADS.filter((l) => l.stage !== 'won').reduce((sum, l) => sum + l.estimate, 0),
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Leads</Text>
        <Text style={styles.subtitle}>
          {LEADS.length} leads · {rsCompact(pipelineValue)} in open pipeline
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipRow}
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const count =
            f.id === 'all' ? LEADS.length : LEADS.filter((l) => l.stage === f.id).length;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${f.label}, ${count} leads`}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                {f.label} · {count}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <AnimatedIn index={index}>
            <LeadCard lead={item} onPress={() => router.push(`/customer/${item.customerId}`)} />
          </AnimatedIn>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <SearchX size={28} color={theme.colors.textTertiary} />
            <Text style={styles.emptyTitle}>No leads at this stage</Text>
            <Text style={styles.emptyText}>New enquiries will appear here.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.canvas },
  header: { paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing.sm },
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
  chipScroll: { flexGrow: 0, marginTop: theme.spacing.lg },
  chipRow: { paddingHorizontal: theme.spacing.xl, gap: theme.spacing.sm },
  chip: {
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: theme.colors.text, borderColor: theme.colors.text },
  chipLabel: {
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  chipLabelActive: { color: '#FFFFFF' },
  list: { padding: theme.spacing.xl, paddingTop: theme.spacing.lg },
  empty: { alignItems: 'center', paddingTop: theme.spacing.xxxl * 2, gap: theme.spacing.sm },
  emptyTitle: {
    fontSize: theme.fontSize.section,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  emptyText: { fontSize: theme.fontSize.small, color: theme.colors.textSecondary },
});
