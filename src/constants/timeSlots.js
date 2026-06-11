export const TIME_SLOT_KEYS = ["morning", "midday", "afternoon", "evening"];

export const TIME_SLOT_LEGACY_MAP = {
  "۹ تا ۱۲ صبح": "morning",
  "۱۲ تا ۳ بعدازظهر": "midday",
  "۳ تا ۶ عصر": "afternoon",
  "۶ تا ۸ شب": "evening",
};

export function getTimeSlotKey(slot) {
  return TIME_SLOT_LEGACY_MAP[slot] || slot;
}

export function formatTimeSlot(slot, t) {
  const key = getTimeSlotKey(slot);
  if (TIME_SLOT_KEYS.includes(key)) {
    return t(`visitScheduler.timeSlots.${key}`);
  }
  return slot;
}
