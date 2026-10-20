import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Wrench } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIn } from '../../components/AnimatedIn';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { JobCard } from '../../components/JobCard';
import { SectionTitle } from '../../components/Section';
import { JOBS, SERVICE_VISITS } from '../../data/seed';
import { theme } from '../../theme/theme';

export default function JobsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Installations</Text>
          <Text style={styles.subtitle}>
            {JOBS.length} jobs · {SERVICE_VISITS.length} service visits coming up
          </Text>
        </View>

        {JOBS.map((job, i) => (
          <AnimatedIn key={job.id} index={i}>
            <JobCard job={job} />
          </AnimatedIn>
        ))}

        <SectionTitle title="Service visits" />
        {SERVICE_VISITS.map((visit, i) => (
          <AnimatedIn key={visit.id} index={i + 2}>
            <Card style={styles.visitCard}>
              <View style={styles.visitIcon}>
                <Wrench size={18} color={theme.colors.accentDark} />
              </View>
              <View style={styles.visitMain}>
                <Text style={styles.visitName}>
                  {visit.name} <Text style={styles.visitArea}>· {visit.area}</Text>
                </Text>
                <Text style={styles.visitTask}>{visit.task}</Text>
              </View>
              <Chip label={visit.when} tone="accent" />
            </Card>
          </AnimatedIn>
        ))}
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
  visitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  visitIcon: {
    width: 38,
    height: 38,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.accentTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitMain: { flex: 1 },
  visitName: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  visitArea: { color: theme.colors.textSecondary, fontWeight: theme.fontWeight.regular },
  visitTask: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
});
