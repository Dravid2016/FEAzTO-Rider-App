import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { Typography } from '../../src/constants/typography';
import { Spacing } from '../../src/constants/spacing';
import { useRiderStore } from '../../src/store/riderStore';
import { useOrderStore } from '../../src/store/orderStore';
import { useUiStore } from '../../src/store/uiStore';
import { useSlotStore } from '../../src/store/slotStore';
import { useIncentiveStore } from '../../src/store/incentiveStore';
import { useRouter } from 'expo-router';
import { WeatherCard } from '../../src/components/rider/WeatherCard';
import { SafetyCard } from '../../src/components/rider/SafetyCard';
import { IncentiveCard } from '../../src/components/rider/IncentiveCard';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';
import {
  Menu,
  Bell,
  MapPin,
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle2,
  CheckCircle,
  TrendingUp,
  Flame,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  User,
  Sliders,
  Check,
  Zap,
} from 'lucide-react-native';

export default function RiderHomeScreen() {
  const router = useRouter();
  const {
    profile,
    status,
    goOnline,
    goOffline,
    shiftMinutesCount,
    startBreak,
    endBreak,
    helmetVerified,
    raincoatVerified,
    vehicleReadyVerified,
    toggleHelmetCheck,
    toggleRaincoatCheck,
    toggleVehicleCheck,
    triggerSos,
    sosActive,
    cancelSos,
  } = useRiderStore();

  const { activeOrder, hasIncomingOffer, incomingOffer, acceptOffer, declineOffer, triggerMockOffer } = useOrderStore();
  const { weather, toggleRainMode } = useUiStore();

  const [safetyModalVisible, setSafetyModalVisible] = useState(false);

  const isOnline = status === 'ONLINE' || status === 'ON_DELIVERY';
  const isOnBreak = status === 'ON_BREAK';

  const handleToggleOnline = () => {
    if (isOnline) {
      goOffline();
    } else {
      const success = goOnline();
      if (!success) {
        setSafetyModalVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Main Navigation Bar matching screenshot */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => router.push('/(tabs)/profile')}>
            <Menu size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.logoGroup}>
            <Text style={styles.logoText}>FEAzTO</Text>
            <Text style={styles.divider}>|</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {profile.personalDetails.fullName || 'Lakshmi Kitchen'}
            </Text>
          </View>
        </View>

        <View style={styles.topRight}>
          <TouchableOpacity style={styles.iconCircleBtn} onPress={() => router.push('/safety')}>
            <ShieldCheck size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircleBtn} onPress={() => router.push('/support')}>
            <Bell size={20} color={Colors.textPrimary} />
            <View style={styles.badgeRedDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCircleBtn} onPress={() => router.push('/(tabs)/profile')}>
            <User size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile & Location Banner Card matching screenshot */}
        <View style={styles.profileBannerCard}>
          <View style={styles.profileInfoColumn}>
            <Text style={styles.profileTitle}>{profile.personalDetails.fullName || 'Lakshmi Kitchen'}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#C49000" />
              <Text style={styles.locationText}>{profile.personalDetails.address || 'Anna Nagar, Chennai'}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleToggleOnline}
            style={[styles.statusTogglePill, isOnline ? styles.onlinePill : styles.offlinePill]}
          >
            <View style={[styles.statusDot, isOnline ? styles.onlineDot : styles.offlineDot]} />
            <Text style={styles.statusPillText}>{isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
          </TouchableOpacity>
        </View>

        {/* SOS Alert Banner if Active */}
        {sosActive && (
          <View style={styles.sosAlertBox}>
            <ShieldAlert size={24} color="#FFFFFF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.sosTitle}>EMERGENCY SOS SIGNAL ACTIVATED</Text>
              <Text style={styles.sosSub}>Dispatch center & Emergency contact alerted.</Text>
            </View>
            <TouchableOpacity style={styles.cancelSosBtn} onPress={cancelSos}>
              <Text style={styles.cancelSosText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ✨ TODAY'S SUMMARY Section Header */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Sparkles size={16} color="#B88600" />
            <Text style={styles.sectionTitle}>TODAY'S SUMMARY</Text>
          </View>
          <View style={styles.liveIndicatorRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* 2x2 Metric Cards Grid (Matching screenshot layout) */}
        <View style={styles.metricGrid}>
          {/* 1. New Orders */}
          <TouchableOpacity style={styles.metricCard} activeOpacity={0.7} onPress={() => router.push('/(tabs)/orders')}>
            <View style={styles.metricCardHeader}>
              <Text style={styles.metricCardLabel}>NEW ORDERS</Text>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.badgeYellowBg }]}>
                <ShoppingBag size={18} color={Colors.badgeYellowText} />
              </View>
            </View>
            <View style={styles.metricCardFooter}>
              <Text style={styles.metricValue}>01</Text>
              <View style={styles.metricLinkRow}>
                <Text style={[styles.metricLinkText, { color: Colors.badgeYellowText }]}>View</Text>
                <ArrowRight size={12} color={Colors.badgeYellowText} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 2. Preparing */}
          <TouchableOpacity style={styles.metricCard} activeOpacity={0.7} onPress={() => router.push('/(tabs)/orders')}>
            <View style={styles.metricCardHeader}>
              <Text style={styles.metricCardLabel}>PREPARING</Text>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.badgeBlueBg }]}>
                <Clock size={18} color={Colors.badgeBlueText} />
              </View>
            </View>
            <View style={styles.metricCardFooter}>
              <Text style={styles.metricValue}>01</Text>
              <View style={styles.metricLinkRow}>
                <Text style={[styles.metricLinkText, { color: Colors.badgeBlueText }]}>In Kitchen</Text>
                <ArrowRight size={12} color={Colors.badgeBlueText} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 3. Ready Pickup */}
          <TouchableOpacity style={styles.metricCard} activeOpacity={0.7} onPress={() => router.push('/(tabs)/orders')}>
            <View style={styles.metricCardHeader}>
              <Text style={styles.metricCardLabel}>READY PICKUP</Text>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.badgeGreenBg }]}>
                <CheckCircle2 size={18} color={Colors.badgeGreenText} />
              </View>
            </View>
            <View style={styles.metricCardFooter}>
              <Text style={styles.metricValue}>01</Text>
              <View style={styles.metricLinkRow}>
                <Text style={[styles.metricLinkText, { color: Colors.badgeGreenText }]}>Ready</Text>
                <ArrowRight size={12} color={Colors.badgeGreenText} />
              </View>
            </View>
          </TouchableOpacity>

          {/* 4. Completed */}
          <TouchableOpacity style={styles.metricCard} activeOpacity={0.7} onPress={() => router.push('/(tabs)/earnings')}>
            <View style={styles.metricCardHeader}>
              <Text style={styles.metricCardLabel}>COMPLETED</Text>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.badgeGreyBg }]}>
                <CheckCircle size={18} color={Colors.badgeGreyText} />
              </View>
            </View>
            <View style={styles.metricCardFooter}>
              <Text style={styles.metricValue}>01</Text>
              <View style={styles.metricLinkRow}>
                <Text style={[styles.metricLinkText, { color: Colors.badgeGreyText }]}>Done</Text>
                <ArrowRight size={12} color={Colors.badgeGreyText} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* TODAY'S GROSS REVENUE Banner Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/earnings')}
          style={styles.revenueBannerCard}
        >
          <View style={styles.revenueLeft}>
            <View style={styles.revenueIconCircle}>
              <TrendingUp size={22} color="#111111" />
            </View>
            <View>
              <Text style={styles.revenueLabel}>TODAY'S GROSS REVENUE</Text>
              <Text style={styles.revenueValue}>₹3,440</Text>
            </View>
          </View>

          <View style={styles.analyticsBtn}>
            <Zap size={14} color="#9C6B00" />
            <Text style={styles.analyticsText}>Analytics</Text>
          </View>
        </TouchableOpacity>

        {/* 🔥 ACTIVE KITCHEN / RIDER ORDERS Section Header */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Flame size={18} color="#E65100" />
            <Text style={styles.sectionTitle}>ACTIVE RIDER ORDERS (3)</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/orders')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Active Order Card matching screenshot design */}
        {activeOrder ? (
          <View style={styles.orderCardContainer}>
            <View style={styles.orderHeaderRow}>
              <View style={styles.orderBadgeAndName}>
                <View style={styles.orderBadgeCircle}>
                  <Text style={styles.orderBadgeText}>{(activeOrder.id || '#1024').slice(-5)}</Text>
                </View>
                <View>
                  <Text style={styles.customerName}>{activeOrder.customer?.name || 'Ranjith'}</Text>
                  <Text style={styles.orderTimestamp}>10:30 AM</Text>
                </View>
              </View>

              <View style={styles.statusOutlinePill}>
                <Text style={styles.statusOutlineText}>{(activeOrder.state || 'NEW').replace(/_/g, ' ')}</Text>
              </View>
            </View>

            {/* Inset items list container */}
            <View style={styles.insetItemsBox}>
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>1 × Masala Dosa</Text>
                <Text style={styles.itemPrice}>₹120</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>1 × Idli Sambar</Text>
                <Text style={styles.itemPrice}>₹80</Text>
              </View>
            </View>

            <View style={styles.orderFooterRow}>
              <Text style={styles.totalPriceText}>Total: ₹{activeOrder.earnings?.totalEarnings || 220}</Text>

              <View style={styles.orderActionButtons}>
                <TouchableOpacity
                  style={styles.primaryAcceptBtn}
                  onPress={() => router.push('/delivery')}
                  activeOpacity={0.8}
                >
                  <Check size={16} color={Colors.yellowPrimary} />
                  <Text style={styles.primaryAcceptText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryDetailsBtn}
                  onPress={() => router.push('/delivery')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryDetailsText}>Details ➔</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noOrderBox}>
            <Text style={styles.noOrderTitle}>Searching for nearby deliveries...</Text>
            <Text style={styles.noOrderSub}>Stay near high-demand cloud kitchens in Anna Nagar.</Text>
            <PrimaryButton
              title="Simulate Incoming Order (#FA2841)"
              onPress={() => triggerMockOffer()}
              variant="outline"
              style={styles.simBtn}
            />
          </View>
        )}

        {/* Live Weather & Safety Card */}
        <View style={styles.sectionMarginTop}>
          <WeatherCard weather={weather} onToggleRainMode={toggleRainMode} />
        </View>

        <View style={styles.sectionMarginTop}>
          <SafetyCard
            helmetVerified={helmetVerified}
            raincoatVerified={raincoatVerified}
            vehicleVerified={vehicleReadyVerified}
            shiftMinutesCount={shiftMinutesCount}
            onToggleHelmet={toggleHelmetCheck}
            onToggleRaincoat={toggleRaincoatCheck}
            onToggleVehicle={toggleVehicleCheck}
            onTakeBreak={startBreak}
            onTriggerSos={triggerSos}
          />
        </View>
      </ScrollView>

      {/* Safety Modal */}
      <Modal visible={safetyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <ShieldAlert size={28} color={Colors.yellowPrimary} />
              <Text style={styles.modalTitle}>Safety Check Required</Text>
            </View>
            <Text style={styles.modalSub}>
              Please verify your Helmet and Vehicle Readiness before going Online.
            </Text>

            <TouchableOpacity style={styles.modalCheckItem} onPress={toggleHelmetCheck}>
              <CheckCircle2 size={20} color={helmetVerified ? Colors.success : Colors.textMuted} />
              <Text style={styles.modalCheckText}>Helmet Buckled & Verified</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCheckItem} onPress={toggleVehicleCheck}>
              <CheckCircle2 size={20} color={vehicleReadyVerified ? Colors.success : Colors.textMuted} />
              <Text style={styles.modalCheckText}>Vehicle Brake & Light Readiness</Text>
            </TouchableOpacity>

            <PrimaryButton
              title="Confirm & Go Online"
              onPress={() => {
                setSafetyModalVisible(false);
                goOnline();
              }}
              style={styles.modalBtn}
            />
          </View>
        </View>
      </Modal>

      {/* Incoming Delivery Modal */}
      <Modal visible={hasIncomingOffer} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.offerCard}>
            <Text style={styles.offerBadge}>NEW DELIVERY OFFER</Text>
            <Text style={styles.offerOrderId}>{incomingOffer?.id || '#FA2841'}</Text>

            <View style={styles.offerSection}>
              <Text style={styles.offerLabel}>Pickup from:</Text>
              <Text style={styles.offerVal}>{incomingOffer?.kitchen.name || 'Lakshmi Kitchen'}</Text>
              <Text style={styles.offerSub}>{incomingOffer?.kitchen.address} (2.4 km)</Text>
            </View>

            <View style={styles.offerSection}>
              <Text style={styles.offerLabel}>Deliver to:</Text>
              <Text style={styles.offerVal}>{incomingOffer?.customer.name || 'Ranjith'}</Text>
              <Text style={styles.offerSub}>{incomingOffer?.customer.address} (5.8 km)</Text>
            </View>

            <View style={styles.offerActionRow}>
              <TouchableOpacity style={styles.declineBtn} onPress={declineOffer}>
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>
              <PrimaryButton
                title="ACCEPT DELIVERY"
                onPress={() => {
                  acceptOffer();
                  router.push('/delivery');
                }}
                style={styles.acceptBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F2',
  },
  topBar: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAE5D8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuBtn: {
    padding: 4,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoText: {
    color: '#111111',
    fontSize: 20,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -0.5,
  },
  divider: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  headerSubtitle: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '600',
    maxWidth: 140,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFDF5',
    borderWidth: 1,
    borderColor: '#FFE8A3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeRedDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 100,
  },
  profileBannerCard: {
    backgroundColor: '#FFF9E6',
    borderWidth: 1.5,
    borderColor: '#FFE082',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfoColumn: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  statusTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  onlinePill: {
    backgroundColor: '#00C853',
  },
  offlinePill: {
    backgroundColor: '#78909C',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  onlineDot: {
    backgroundColor: '#FFFFFF',
  },
  offlineDot: {
    backgroundColor: '#E0E0E0',
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#666666',
    letterSpacing: 0.8,
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00C853',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00C853',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  metricCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFE8A3',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'space-between',
  },
  metricCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricCardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#666666',
    letterSpacing: 0.5,
  },
  badgeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
  },
  metricLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metricLinkText: {
    fontSize: 11,
    fontWeight: '700',
  },
  revenueBannerCard: {
    backgroundColor: '#FFFDF2',
    borderWidth: 1.5,
    borderColor: '#FFE599',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  revenueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F5B700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#777777',
    letterSpacing: 0.5,
  },
  revenueValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    marginTop: 2,
  },
  analyticsBtn: {
    backgroundColor: '#FFF3CC',
    borderWidth: 1,
    borderColor: '#FFE082',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  analyticsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111111',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6F00',
  },
  orderCardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFE599',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderBadgeAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  orderBadgeCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#F5B700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBadgeText: {
    color: '#F5B700',
    fontSize: 11,
    fontWeight: '900',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },
  orderTimestamp: {
    fontSize: 11,
    color: '#888888',
  },
  statusOutlinePill: {
    borderWidth: 1.5,
    borderColor: '#111111',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusOutlineText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#111111',
  },
  insetItemsBox: {
    backgroundColor: '#FFFDF0',
    borderWidth: 1,
    borderColor: '#FFF0C2',
    borderRadius: 12,
    padding: 10,
    gap: 4,
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  orderFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111111',
  },
  orderActionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryAcceptBtn: {
    backgroundColor: '#111111',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  primaryAcceptText: {
    color: '#F5B700',
    fontSize: 12,
    fontWeight: '800',
  },
  secondaryDetailsBtn: {
    backgroundColor: '#F0ECE1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  secondaryDetailsText: {
    color: '#555555',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionMarginTop: {
    marginTop: 8,
  },
  noOrderBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFE8A3',
    alignItems: 'center',
    marginBottom: 16,
  },
  noOrderTitle: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },
  noOrderSub: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  simBtn: {
    marginTop: 12,
    height: 40,
  },
  sosAlertBox: {
    backgroundColor: Colors.error,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sosTitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  sosSub: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.9,
  },
  cancelSosBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cancelSosText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#FFE599',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '800',
  },
  modalSub: {
    color: '#666666',
    fontSize: 12,
    marginVertical: 12,
  },
  modalCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  modalCheckText: {
    color: '#111111',
    fontSize: 13,
  },
  modalBtn: {
    marginTop: 16,
  },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.yellowPrimary,
  },
  offerBadge: {
    color: Colors.yellowPrimary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  offerOrderId: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 4,
  },
  offerSection: {
    marginVertical: 4,
  },
  offerLabel: {
    color: '#888888',
    fontSize: 10,
    fontWeight: '700',
  },
  offerVal: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '700',
  },
  offerSub: {
    color: '#666666',
    fontSize: 11,
  },
  offerActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  declineBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F2EB',
    borderWidth: 1,
    borderColor: '#EAE5D8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  declineText: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '700',
  },
  acceptBtn: {
    flex: 1,
  },
});

