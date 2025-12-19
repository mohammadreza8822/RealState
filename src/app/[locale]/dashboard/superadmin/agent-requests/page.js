"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function AgentRequestsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن همه داده‌ها
  const loadData = async () => {
    setLoading(true);
    const res = await fetch("/api/superadmin/get-agent-requests");
    const data = await res.json();

    setPending(data.pending || []);
    setApproved(data.approved || []);
    setRejected(data.rejected || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const approveAgent = async (userId) => {
    if (!confirm(t("superadmin.confirmApprove"))) return;

    const res = await fetch("/api/superadmin/approve-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      alert(t("superadmin.approveSuccess"));
      loadData(); // دوباره لیست‌ها رو آپدیت کن
    } else {
      const data = await res.json();
      alert(data.error || t("superadmin.error"));
    }
  };

  const rejectAgent = async (userId) => {
    if (!confirm(t("superadmin.confirmReject"))) return;

    const res = await fetch("/api/superadmin/reject-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      alert(t("superadmin.rejectSuccess"));
      loadData();
    } else {
      alert(t("superadmin.error"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">{t("common.loading")}</p>
      </div>
    );
  }

  const dateLocale = locale === 'fa' ? 'fa-IR' : locale === 'ar' ? 'ar-SA' : 'en-US';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* بخش درخواست‌های در انتظار */}
        <section>
          <h1 className="text-4xl font-black text-center text-gray-800 mb-8">
            {t("superadmin.pendingRequests")}
          </h1>

          {pending.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
              <p className="text-xl text-gray-500">
                {t("superadmin.noRequests")}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pending.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 border border-amber-100"
                >
                  <div className="text-center md:text-right">
                    <p className="text-2xl font-bold text-gray-800">
                      {user.email}
                    </p>
                    <p className="text-amber-600 font-bold mt-2">
                      {t("superadmin.requestAt")}{" "}
                      {new Date(user.agentRequestedAt).toLocaleDateString(
                        dateLocale
                      )}{" "}
                      —{" "}
                      {new Date(user.agentRequestedAt).toLocaleTimeString(
                        dateLocale,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => approveAgent(user._id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all"
                    >
                      {t("superadmin.approveAndActivate")}
                    </button>
                    <button
                      onClick={() => rejectAgent(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all"
                    >
                      {t("superadmin.rejectRequest")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* بخش مشاوران تأیید شده */}
        {approved.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-green-700 mb-6 text-center">
              {t("superadmin.approvedAgents")} ({approved.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approved.map((user) => (
                <div
                  key={user._id}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 text-center shadow-md"
                >
                  <p className="font-bold text-lg text-green-800">
                    {user.email}
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    {t("superadmin.approvedAt")}{" "}
                    {new Date(user.agentApprovedAt).toLocaleDateString(dateLocale)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* بخش درخواست‌های رد شده */}
        {rejected.length > 0 && (
          <section>
            <h2 className="text-3xl font-black text-red-700 mb-6 text-center">
              {t("superadmin.rejectedRequests")} ({rejected.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rejected.map((user) => (
                <div
                  key={user._id}
                  className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-6 text-center shadow-md"
                >
                  <p className="font-bold text-lg text-red-800">{user.email}</p>
                  <p className="text-sm text-red-600 mt-2">
                    {t("superadmin.rejectedAt")}{" "}
                    {new Date(user.agentRequestedAt).toLocaleDateString(
                      dateLocale
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
