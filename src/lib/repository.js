import connectDB from "@/utils/connectDB";
import { isMockMode } from "@/utils/mockMode";
import User from "@/models/User";
import Profile from "@/models/Profile";
import ContactUs from "@/models/ContactUs";
import VisitRequest from "@/models/VisitRequest";
import * as mockStore from "@/mock/store";

async function ensureDb() {
  if (isMockMode()) {
    await mockStore.initMockStore();
    return;
  }
  await connectDB();
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function findUserByEmail(email) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockFindUserByEmail(email);
  return User.findOne({ email }).lean();
}

export async function findUserById(id) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockFindUserById(id);
  return User.findById(id).lean();
}

export async function createUser(data) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockCreateUser(data);
  return User.create(data);
}

export async function updateUserByEmail(email, updates) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockUpdateUser(email, updates);

  const user = await User.findOne({ email });
  if (!user) return null;
  Object.assign(user, updates);
  await user.save();
  return user.toObject();
}

export async function updateUserById(id, updates) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockUpdateUserById(id, updates);
  return User.findByIdAndUpdate(id, updates, { new: true }).lean();
}

export async function getUsersExcludingSuperadmin() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetUsersExcludingSuperadmin();
  return User.find({ role: { $ne: "SUPERADMIN" } }, { password: 0 })
    .sort({ createdAt: -1 })
    .lean();
}

export async function getUserWithProfiles(email) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetUserWithProfiles(email);

  const [user] = await User.aggregate([
    { $match: { email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      },
    },
  ]);
  return user || null;
}

export async function toggleFavorite(email, profileId) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockToggleFavorite(email, profileId);

  const user = await User.findOne({ email });
  if (!user) return null;
  if (!user.favorites) user.favorites = [];

  const index = user.favorites.findIndex(
    (f) => f.toString() === profileId.toString()
  );
  if (index === -1) {
    user.favorites.push(profileId);
    await user.save();
    return { isFavorite: true };
  }
  user.favorites.splice(index, 1);
  await user.save();
  return { isFavorite: false };
}

export async function isFavorite(email, profileId) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockIsFavorite(email, profileId);

  const user = await User.findOne({ email }).select("favorites").lean();
  if (!user?.favorites) return false;
  return user.favorites.some((f) => f.toString() === profileId.toString());
}

export async function getFavoriteCount(email) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetFavoriteCount(email);

  const user = await User.findOne({ email }).select("favorites").lean();
  return user?.favorites?.length || 0;
}

export async function getAgentRequests() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetAgentRequests();

  const [pending, approved, rejected] = await Promise.all([
    User.find({ agentStatus: "pending" }).select("-password").lean(),
    User.find({ agentStatus: "approved", role: "USER" }).select("-password").lean(),
    User.find({ agentStatus: "rejected" }).select("-password").lean(),
  ]);
  return { pending, approved, rejected };
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export async function getPublishedProfiles() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetPublishedProfiles();
  return Profile.find({ published: true })
    .select("-userId -__v")
    .sort({ createdAt: -1 })
    .lean();
}

export async function getProfileById(id) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetProfileById(id);
  const profile = await Profile.findOne({ _id: id });
  return profile ? JSON.parse(JSON.stringify(profile)) : null;
}

export async function getUnpublishedProfiles() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetUnpublishedProfiles();
  return Profile.find({ published: false }).lean();
}

export async function getFavoriteProfiles(email) {
  await ensureDb();
  if (isMockMode()) {
    const user = await mockStore.mockFindUserByEmail(email);
    if (!user?.favorites?.length) return [];
    return mockStore.mockGetProfilesByIds(user.favorites);
  }

  const user = await User.findOne({ email });
  if (!user?.favorites?.length) return [];
  return Profile.find({ _id: { $in: user.favorites }, published: true }).lean();
}

export async function createProfile(data) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockCreateProfile(data);
  return Profile.create(data);
}

export async function updateProfile(id, updates) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockUpdateProfile(id, updates);

  const profile = await Profile.findOne({ _id: id });
  if (!profile) return null;
  Object.assign(profile, updates);
  await profile.save();
  return profile.toObject();
}

export async function publishProfile(id) {
  return updateProfile(id, { published: true });
}

export async function deleteProfile(id) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockDeleteProfile(id);
  await Profile.deleteOne({ _id: id });
  return true;
}

export async function searchProfiles(params) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockSearchProfiles(params);

  const { q, transaction, type } = params;
  const filter = { published: true };

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { realState: { $regex: q, $options: "i" } },
    ];
  }

  if (type && type !== "همه املاک") {
    const categoryMap = {
      "آپارتمان مسکونی": "apartment",
      "خانه ویلایی": "villa",
      "مغازه و تجاری": "store",
      "دفتر اداری": "office",
    };
    filter.category = categoryMap[type] || type;
  }

  if (transaction && transaction !== "خرید") {
    if (transaction.includes("اجاره") || transaction.includes("رهن")) {
      filter.price = { $lt: 1_000_000_000 };
    }
  }

  return Profile.find(filter)
    .select(
      "title location phone realState price category constructionDate amenities image published createdAt"
    )
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
}

export async function addVisitAvailability(listingId, date, timeSlots) {
  await ensureDb();
  if (isMockMode())
    return mockStore.mockAddVisitAvailability(listingId, date, timeSlots);

  await Profile.findByIdAndUpdate(listingId, {
    $push: { visitAvailability: { date, timeSlots } },
  });
  return true;
}

export async function removeVisitAvailability(listingId, date) {
  await ensureDb();
  if (isMockMode())
    return mockStore.mockRemoveVisitAvailability(listingId, date);

  await Profile.findByIdAndUpdate(listingId, {
    $pull: { visitAvailability: { date } },
  });
  return true;
}

// ─── Contact & Visit Requests ────────────────────────────────────────────────

export async function createContactMessage(data) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockCreateContactMessage(data);
  const msg = new ContactUs(data);
  await msg.save();
  return msg.toObject();
}

export async function getContactMessages() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetContactMessages();
  return ContactUs.find({}).sort({ createdAt: -1 }).lean();
}

export async function createVisitRequest(data) {
  await ensureDb();
  if (isMockMode()) return mockStore.mockCreateVisitRequest(data);
  return VisitRequest.create(data);
}

export async function getVisitRequests() {
  await ensureDb();
  if (isMockMode()) return mockStore.mockGetVisitRequests();
  return VisitRequest.find({}).sort({ createdAt: -1 }).lean();
}

export async function updateVisitRequestStatus(requestId, status) {
  await ensureDb();
  if (isMockMode())
    return mockStore.mockUpdateVisitRequestStatus(requestId, status);
  return VisitRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  ).lean();
}
