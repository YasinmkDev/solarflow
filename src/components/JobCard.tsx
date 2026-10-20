import { StyleSheet, Text, View } from 'react-native';
import { CalendarDays, Check, Users } from 'lucide-react-native';

import { MILESTONES, type Job } from '../data/seed';
import { theme } from '../theme/theme';
import { Card } from './Card';

interface JobCardProps {
  job: Job;
}

/** Installation job with a milestone stepper — done steps tick, current step is named. */
export function JobCard({ job }: JobCardProps) {
  const done = job.milestoneIndex;
  const pct = Math.round((done / (MILESTONES.length - 1)) * 100);
  return (
    <Card style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.main}>
          <Text style={styles.name} numberOfLines={1}>
            {job.name}
          </Text>
          <Text style={styles.meta}>
            {job.area} · {job.systemKw} kW
          </Text>
        </View>
        <Text style={styles.pct}>{pct}%</Text>
      </View>

      <View style={styles.stepper}>
        {MILESTONES.map((step, i) => {
          const isDone = i < done;
          const isCurrent = i === done;
          return (
            <View key={step} style={styles.stepWrap}>
              <View style={styles.stepRow}>
                {i > 0 && (
                  <View
                    style={[styles.connector, (isDone || isCurrent) && styles.connectorDone]}
                  />
                )}
                <View
                  style={[
                    styles.dot,
                    isDone && styles.dotDone,
                    isCurrent && styles.dotCurrent,
                  ]}>
                  {isDone && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                </View>
                {i < MILESTONES.length - 1 && (
                  <View style={[styles.connector, isDone && styles.connectorDone]} />
                )}
              </View>
              <Text
                style={[styles.stepLabel, isCurrent && styles.stepLabelCurrent]}
                numberOfLines={1}>
                {isCurrent || isDone ? step : ''}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.currentStep}>
        Current step: <Text style={styles.currentStepStrong}>{MILESTONES[done]}</Text>
      </Text>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <CalendarDays size={14} color={theme.colors.textTertiary} />
          <Text style={styles.footerText}>{job.scheduled}</Text>
        </View>
        <View style={styles.footerItem}>
          <Users size={14} color={theme.colors.textTertiary} />
          <Text style={styles.footerText}>{job.crew}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: theme.spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  main: { flex: 1 },
  name: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  meta: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  pct: { fontSize: theme.fontSize.body, fontWeight: theme.fontWeight.bold, color: theme.colors.accent },
  stepper: { flexDirection: 'row', marginTop: theme.spacing.xl, marginBottom: theme.spacing.xs },
  stepWrap: { flex: 1, alignItems: 'center' },
  stepRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  connector: { flex: 1, height: 2, backgroundColor: theme.colors.border },
  connectorDone: { backgroundColor: theme.colors.success },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: theme.colors.success, borderColor: theme.colors.success },
  dotCurrent: { borderColor: theme.colors.accent, borderWidth: 3 },
  stepLabel: {
    fontSize: 10,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  stepLabelCurrent: { color: theme.colors.accent, fontWeight: theme.fontWeight.semibold },
  currentStep: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  currentStepStrong: { color: theme.colors.text, fontWeight: theme.fontWeight.semibold },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
});
