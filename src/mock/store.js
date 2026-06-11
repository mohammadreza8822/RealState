import { hash } from "bcryptjs";
import {
  createSeedProfiles,
  DEMO_ACCOUNTS,
  MOCK_USER_IDS,
} from "./seed";

let idCounter = 100;

function nextId(prefix) {
  idCounter += 1;
  return `${prefix}${idCounter.toString(16).padStart(20, "0")}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function createInitialStore() {
  const hashedUsers = await Promise.all(
    DEMO_ACCOUNTS.map(async (user) => ({
      ...user,
      password: await hash(user.password, 12),
      agentRequestedAt: null,
      createdAt: new Date(),
      favorites: [...(user.favorites || [])],
    }))
  );

  const pendingAgent = {
    _id: "674e00000000000000000001",
    email: "agent@demo.com",
    password: await hash("agent123", 12),
    role: "USER",
    agentStatus: "pending",
    agentRequestedAt: new Date(),
    favorites: [],
    createdAt: new Date(),
  };

  return {
    users: [...hashedUsers, pendingAgent],
    profiles: createSeedProfiles(),
    contactMessages: [
      {
        _id: "674c00000000000000000001",
        name: "Sarah Mitchell",
        email: "sarah.mitchell@example.com",
        phone: "+1 (647) 555-0198",
        subject: "Mortgage pre-approval question",
        message:
          "Hi, I'm interested in the Yorkville condo listing. Do you work with buyers who are pre-approved through Canadian lenders?",
        createdAt: new Date(),
      },
    ],
    visitRequests: [
      {
        _id: "674d00000000000000000001",
        listingId: "674b00000000000000000001",
        listingTitle: "Modern 2-Bed Condo in Yorkville",
        location: "Toronto, ON — Yorkville",
        userName: "James Carter",
        userPhone: "09123456789",
        userEmail: "james.carter@example.com",
        preferredDate: new Date(Date.now() + 3 * 86400000),
        preferredTime: "",
        message: "I'd like to schedule a private showing this weekend if possible.",
        status: "pending",
        notified: false,
        adminSeen: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
}

function getStoreInstance() {
  if (!global.__mockStore) {
    throw new Error("Mock store is not initialized");
  }
  return global.__mockStore;
}

const MOCK_STORE_VERSION = 2;

export async function initMockStore() {
  if (!global.__mockStore || global.__mockStoreVersion !== MOCK_STORE_VERSION) {
    global.__mockStore = await createInitialStore();
    global.__mockStoreVersion = MOCK_STORE_VERSION;
  }
  return global.__mockStore;
}

export async function getMockStore() {
  return initMockStore();
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function mockFindUserByEmail(email) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u.email === email);
  return user ? clone(user) : null;
}

export async function mockFindUserById(id) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u._id === id);
  return user ? clone(user) : null;
}

export async function mockCreateUser(data) {
  const store = getStoreInstance();
  const existing = store.users.find((u) => u.email === data.email);
  if (existing) return null;

  const user = {
    _id: nextId("674f"),
    email: data.email,
    password: data.password,
    role: data.role || "USER",
    agentStatus: data.agentStatus || "none",
    agentRequestedAt: data.agentRequestedAt || null,
    favorites: [],
    createdAt: new Date(),
  };
  store.users.push(user);
  return clone(user);
}

export async function mockUpdateUser(email, updates) {
  const store = getStoreInstance();
  const index = store.users.findIndex((u) => u.email === email);
  if (index === -1) return null;
  store.users[index] = { ...store.users[index], ...updates };
  return clone(store.users[index]);
}

export async function mockUpdateUserById(id, updates) {
  const store = getStoreInstance();
  const index = store.users.findIndex((u) => u._id === id);
  if (index === -1) return null;
  store.users[index] = { ...store.users[index], ...updates };
  return clone(store.users[index]);
}

export async function mockGetUsersExcludingSuperadmin() {
  const store = getStoreInstance();
  return clone(
    store.users
      .filter((u) => u.role !== "SUPERADMIN")
      .map(({ password, ...rest }) => rest)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
}

export async function mockGetUserWithProfiles(email) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u.email === email);
  if (!user) return null;
  const profiles = store.profiles.filter((p) => p.userId === user._id);
  return clone({ ...user, profiles });
}

export async function mockToggleFavorite(email, profileId) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u.email === email);
  if (!user) return null;

  const index = user.favorites.indexOf(profileId);
  if (index === -1) {
    user.favorites.push(profileId);
    return { isFavorite: true };
  }
  user.favorites.splice(index, 1);
  return { isFavorite: false };
}

export async function mockIsFavorite(email, profileId) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u.email === email);
  if (!user) return false;
  return user.favorites.includes(profileId);
}

export async function mockGetFavoriteCount(email) {
  const store = getStoreInstance();
  const user = store.users.find((u) => u.email === email);
  return user?.favorites?.length || 0;
}

export async function mockGetAgentRequests() {
  const store = getStoreInstance();
  const pending = store.users.filter((u) => u.agentStatus === "pending");
  const approved = store.users.filter((u) => u.agentStatus === "approved" && u.role === "USER");
  const rejected = store.users.filter((u) => u.agentStatus === "rejected");
  return clone({
    pending: pending.map(({ password, ...u }) => u),
    approved: approved.map(({ password, ...u }) => u),
    rejected: rejected.map(({ password, ...u }) => u),
  });
}

// ─── Profiles ────────────────────────────────────────────────────────────────

export async function mockGetPublishedProfiles() {
  const store = getStoreInstance();
  return clone(
    store.profiles
      .filter((p) => p.published)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
}

export async function mockGetProfileById(id) {
  const store = getStoreInstance();
  const profile = store.profiles.find((p) => p._id === id);
  return profile ? clone(profile) : null;
}

export async function mockGetUnpublishedProfiles() {
  const store = getStoreInstance();
  return clone(store.profiles.filter((p) => !p.published));
}

export async function mockGetProfilesByIds(ids) {
  const store = getStoreInstance();
  return clone(
    store.profiles.filter((p) => ids.includes(p._id) && p.published)
  );
}

export async function mockCreateProfile(data) {
  const store = getStoreInstance();
  const profile = {
    _id: nextId("674b"),
    ...data,
    published: data.published ?? true,
    visitAvailability: data.visitAvailability || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  store.profiles.push(profile);
  return clone(profile);
}

export async function mockUpdateProfile(id, updates) {
  const store = getStoreInstance();
  const index = store.profiles.findIndex((p) => p._id === id);
  if (index === -1) return null;
  store.profiles[index] = {
    ...store.profiles[index],
    ...updates,
    updatedAt: new Date(),
  };
  return clone(store.profiles[index]);
}

export async function mockDeleteProfile(id) {
  const store = getStoreInstance();
  const index = store.profiles.findIndex((p) => p._id === id);
  if (index === -1) return false;
  store.profiles.splice(index, 1);
  return true;
}

export async function mockSearchProfiles({ q, transaction, type }) {
  let results = await mockGetPublishedProfiles();

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.realState.toLowerCase().includes(query)
    );
  }

  const categoryMap = {
    "آپارتمان مسکونی": "apartment",
    "خانه ویلایی": "villa",
    "مغازه و تجاری": "store",
    "دفتر اداری": "office",
  };

  if (type && type !== "همه املاک") {
    const category = categoryMap[type] || type;
    results = results.filter((p) => p.category === category);
  }

  if (transaction && transaction !== "خرید") {
    if (transaction.includes("اجاره") || transaction.includes("رهن")) {
      results = results.filter((p) => p.price < 1_000_000_000);
    }
  }

  return results.slice(0, 50);
}

export async function mockAddVisitAvailability(listingId, date, timeSlots) {
  const store = getStoreInstance();
  const profile = store.profiles.find((p) => p._id === listingId);
  if (!profile) return null;
  profile.visitAvailability.push({ date, timeSlots });
  return clone(profile);
}

export async function mockRemoveVisitAvailability(listingId, date) {
  const store = getStoreInstance();
  const profile = store.profiles.find((p) => p._id === listingId);
  if (!profile) return null;
  profile.visitAvailability = profile.visitAvailability.filter(
    (v) => String(v.date) !== String(date)
  );
  return clone(profile);
}

// ─── Contact & Visit Requests ────────────────────────────────────────────────

export async function mockCreateContactMessage(data) {
  const store = getStoreInstance();
  const message = { _id: nextId("674c"), ...data, createdAt: new Date() };
  store.contactMessages.push(message);
  return clone(message);
}

export async function mockGetContactMessages() {
  const store = getStoreInstance();
  return clone(
    store.contactMessages.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );
}

export async function mockCreateVisitRequest(data) {
  const store = getStoreInstance();
  const request = {
    _id: nextId("674d"),
    ...data,
    status: "pending",
    notified: false,
    adminSeen: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  store.visitRequests.push(request);
  return clone(request);
}

export async function mockGetVisitRequests() {
  const store = getStoreInstance();
  return clone(
    store.visitRequests.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  );
}

export async function mockUpdateVisitRequestStatus(requestId, status) {
  const store = getStoreInstance();
  const index = store.visitRequests.findIndex((r) => r._id === requestId);
  if (index === -1) return null;
  store.visitRequests[index].status = status;
  store.visitRequests[index].updatedAt = new Date();
  return clone(store.visitRequests[index]);
}

export { MOCK_USER_IDS };
