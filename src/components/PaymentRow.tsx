import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import type { Customer } from '../data/seed';
import { rs, rsCompact } from '../lib/format';
import { theme } from '../theme/theme';
import { Avatar } from './Avatar';
import { ProgressBar } from './ProgressBar';

interface PaymentRowProps {
  customer: Customer;
  onPress: () => void;
}

/** One customer's khata position: paid amount, progress, and what is still due. */
export function PaymentRow({ customer, onPress }: PaymentRowProps) {
  const due = customer.totalPrice - customer.paid;
  const pct = customer.paid / customer.totalPrice;
  const fullyPaid = due <= 0;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${customer.name}, paid ${rs(customer.paid)} of ${rs(customer.totalPrice)}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Avatar name={customer.name} size={40} />
      <View style={styles.main}>
        <View style={styles.topLine}>
          <Text style={styles.name} numberOfLines={1}>
            {customer.name}
          </Text>
          <Text style={[styles.due, fullyPaid ? styles.duePaid : styles.dueOwed]}>
            {fullyPaid ? 'Paid in full' : `${rsCompact(due)} due`}
          </Text>
        </View>
        <ProgressBar
          value={pct}
          color={fullyPaid ? theme.colors.success : theme.colors.accent}
          height={5}
        />
        <Text style={styles.sub}>
          {rs(customer.paid)} of {rs(customer.totalPrice)} · {customer.systemKw} kW
        </Text>
      </View>
      <ChevronRight size={18} color={theme.colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  pressed: { opacity: 0.7 },
  main: { flex: 1, gap: theme.spacing.sm },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  due: { fontSize: theme.fontSize.caption, fontWeight: theme.fontWeight.semibold },
  duePaid: { color: theme.colors.success },
  dueOwed: { color: theme.colors.danger },
  sub: { fontSize: theme.fontSize.caption, color: theme.colors.textSecondary },
});
