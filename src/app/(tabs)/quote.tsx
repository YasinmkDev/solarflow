import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Check, Minus, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIn } from '../../components/AnimatedIn';
import { PrimaryButton } from '../../components/Buttons';
import { Card } from '../../components/Card';
import { SectionTitle } from '../../components/Section';
import { QUOTE_CATALOG, type QuoteOption } from '../../data/seed';
import { rs } from '../../lib/format';
import { theme } from '../../theme/theme';

const SIZE_PRESETS = [3, 5, 8, 10, 15];

export default function QuoteScreen() {
  const [kw, setKw] = useState(5);
  const [inverterId, setInverterId] = useState('inv5');
  const [batteryId, setBatteryId] = useState('bat5');
  const [netMetering, setNetMetering] = useState(false);
  const [saved, setSaved] = useState(false);

  const inverter =
    QUOTE_CATALOG.inverters.find((o) => o.id === inverterId) ?? QUOTE_CATALOG.inverters[0];
  const battery =
    QUOTE_CATALOG.batteries.find((o) => o.id === batteryId) ?? QUOTE_CATALOG.batteries[0];

  const lines = useMemo(() => {
    const items = [
      {
        label: `${QUOTE_CATALOG.panelsPerKw.label} — ${kw} kW`,
        detail: QUOTE_CATALOG.panelsPerKw.detail,
        amount: QUOTE_CATALOG.panelsPerKw.perKw * kw,
      },
      { label: inverter.label, detail: inverter.detail, amount: inverter.price },
      { label: battery.label, detail: battery.detail, amount: battery.price },
      {
        label: QUOTE_CATALOG.extrasPerKw.label,
        detail: QUOTE_CATALOG.extrasPerKw.detail,
        amount: QUOTE_CATALOG.extrasPerKw.perKw * kw,
      },
    ];
    if (netMetering) {
      items.push({
        label: QUOTE_CATALOG.netMetering.label,
        detail: QUOTE_CATALOG.netMetering.detail,
        amount: QUOTE_CATALOG.netMetering.price,
      });
    }
    return items;
  }, [kw, inverter, battery, netMetering]);

  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  const changeKw = (next: number) => {
    const clamped = Math.max(1, Math.min(30, next));
    setKw(clamped);
    setSaved(false);
    void Haptics.selectionAsync();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>New quotation</Text>
          <Text style={styles.subtitle}>
            Build a quote in under two minutes. Prices from your catalog.
          </Text>
        </View>

        <AnimatedIn index={0}>
          <Card>
            <Text style={styles.label}>System size</Text>
            <View style={styles.stepperRow}>
              <Pressable
                onPress={() => changeKw(kw - 1)}
                accessibilityRole="button"
                accessibilityLabel="Decrease system size"
                style={styles.stepperBtn}
              >
                <Minus size={18} color={theme.colors.text} />
              </Pressable>
              <Text style={styles.kwValue}>{kw} kW</Text>
              <Pressable
                onPress={() => changeKw(kw + 1)}
                accessibilityRole="button"
                accessibilityLabel="Increase system size"
                style={styles.stepperBtn}
              >
                <Plus size={18} color={theme.colors.text} />
              </Pressable>
            </View>
            <View style={styles.presetRow}>
              {SIZE_PRESETS.map((preset) => (
                <Pressable
                  key={preset}
                  onPress={() => changeKw(preset)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: kw === preset }}
                  style={[styles.preset, kw === preset && styles.presetActive]}
                >
                  <Text style={[styles.presetLabel, kw === preset && styles.presetLabelActive]}>
                    {preset} kW
                  </Text>
                </Pressable>
              ))}
            </View>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={1}>
          <SectionTitle title="Inverter" />
          {QUOTE_CATALOG.inverters.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              selected={inverterId === option.id}
              onSelect={() => {
                setInverterId(option.id);
                setSaved(false);
              }}
            />
          ))}
        </AnimatedIn>

        <AnimatedIn index={2}>
          <SectionTitle title="Battery" />
          {QUOTE_CATALOG.batteries.map((option) => (
            <OptionRow
              key={option.id}
              option={option}
              selected={batteryId === option.id}
              onSelect={() => {
                setBatteryId(option.id);
                setSaved(false);
              }}
            />
          ))}
        </AnimatedIn>

        <AnimatedIn index={3}>
          <Card style={styles.toggleCard}>
            <View style={styles.toggleMain}>
              <Text style={styles.toggleTitle}>{QUOTE_CATALOG.netMetering.label}</Text>
              <Text style={styles.toggleSub}>
                {QUOTE_CATALOG.netMetering.detail} · {rs(QUOTE_CATALOG.netMetering.price)}
              </Text>
            </View>
            <Switch
              value={netMetering}
              onValueChange={(v) => {
                setNetMetering(v);
                setSaved(false);
              }}
              trackColor={{ false: theme.colors.borderStrong, true: theme.colors.accent }}
              accessibilityLabel="Include net metering"
            />
          </Card>
        </AnimatedIn>

        <AnimatedIn index={4}>
          <SectionTitle title="Summary" />
          <Card>
            {lines.map((line, i) => (
              <View key={line.label} style={[styles.line, i > 0 && styles.lineDivider]}>
                <View style={styles.lineMain}>
                  <Text style={styles.lineLabel}>{line.label}</Text>
                  <Text style={styles.lineDetail}>{line.detail}</Text>
                </View>
                <Text style={styles.lineAmount}>{line.amount === 0 ? '—' : rs(line.amount)}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{rs(total)}</Text>
            </View>
            <Text style={styles.perKw}>That is {rs(total / kw)} per kW, all-in.</Text>
          </Card>
        </AnimatedIn>

        <AnimatedIn index={5}>
          <View style={styles.cta}>
            {saved ? (
              <View style={styles.savedRow}>
                <View style={styles.savedIcon}>
                  <Check size={17} color="#FFFFFF" strokeWidth={3} />
                </View>
                <Text style={styles.savedText}>
                  Quote saved. Share it from the customer page on WhatsApp.
                </Text>
              </View>
            ) : (
              <PrimaryButton label={`Save quote — ${rs(total)}`} onPress={() => setSaved(true)} />
            )}
          </View>
        </AnimatedIn>
      </ScrollView>
    </SafeAreaView>
  );
}

function OptionRow({
  option,
  selected,
  onSelect,
}: {
  option: QuoteOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${option.label}, ${option.price === 0 ? 'free' : rs(option.price)}`}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card style={[styles.optionCard, selected && styles.optionCardSelected]}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioDot} />}
        </View>
        <View style={styles.optionMain}>
          <Text style={styles.optionLabel}>{option.label}</Text>
          <Text style={styles.optionDetail}>{option.detail}</Text>
        </View>
        <Text style={styles.optionPrice}>{option.price === 0 ? 'Included' : rs(option.price)}</Text>
      </Card>
    </Pressable>
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
    lineHeight: 20,
  },
  label: {
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  stepperBtn: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  kwValue: { fontSize: 30, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  presetRow: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.lg },
  preset: {
    flex: 1,
    minHeight: 38,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  presetActive: { backgroundColor: theme.colors.text, borderColor: theme.colors.text },
  presetLabel: {
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
  },
  presetLabelActive: { color: '#FFFFFF' },
  pressed: { opacity: 0.8 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  optionCardSelected: { borderColor: theme.colors.accent, borderWidth: 1.5 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: theme.colors.accent },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.accent },
  optionMain: { flex: 1 },
  optionLabel: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  optionDetail: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  optionPrice: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  toggleMain: { flex: 1 },
  toggleTitle: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  toggleSub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  lineDivider: { borderTopWidth: 1, borderTopColor: theme.colors.border },
  lineMain: { flex: 1 },
  lineLabel: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  lineDetail: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary, marginTop: 2 },
  lineAmount: {
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderStrong,
    paddingTop: theme.spacing.lg,
    marginTop: theme.spacing.xs,
  },
  totalLabel: {
    fontSize: theme.fontSize.section,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  perKw: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textAlign: 'right',
  },
  cta: { marginTop: theme.spacing.xxl },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.successTint,
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    minHeight: 50,
  },
  savedIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedText: {
    flex: 1,
    fontSize: theme.fontSize.small,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.success,
  },
});
