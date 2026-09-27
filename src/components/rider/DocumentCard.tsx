import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing } from '../../constants/spacing';
import { FileText, CheckCircle, AlertCircle, Upload } from 'lucide-react-native';
import { StatusBadge } from '../common/StatusBadge';
import { VerificationStatus } from '../../types/rider';

interface DocumentCardProps {
  title: string;
  documentNumber?: string;
  expiryDate?: string;
  status: VerificationStatus;
  onUpload?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  documentNumber,
  expiryDate,
  status,
  onUpload,
}) => {
  const getBadgeType = () => {
    switch (status) {
      case 'APPROVED':
      case 'VERIFIED':
        return 'success';
      case 'NEEDS_CORRECTION':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <FileText size={20} color={Colors.yellowPrimary} />
          <View>
            <Text style={styles.title}>{title}</Text>
            {documentNumber && <Text style={styles.docNum}>{documentNumber}</Text>}
          </View>
        </View>
        <StatusBadge label={status} type={getBadgeType()} />
      </View>

      {expiryDate && <Text style={styles.expiry}>Expiry Date: {expiryDate}</Text>}

      {onUpload && (
        <TouchableOpacity activeOpacity={0.8} style={styles.uploadBtn} onPress={onUpload}>
          <Upload size={16} color={Colors.yellowPrimary} />
          <Text style={styles.uploadText}>
            {status === 'NEEDS_CORRECTION' ? 'Re-upload Document' : 'Update Photo / Copy'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadiusMd,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  docNum: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  expiry: {
    color: Colors.textMuted,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.sm,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.yellowSoft,
    borderColor: Colors.yellowPrimary,
    borderWidth: 1,
    borderRadius: Spacing.borderRadiusSm,
    paddingVertical: Spacing.xs + 2,
    marginTop: Spacing.md,
  },
  uploadText: {
    color: Colors.yellowPrimary,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
});
