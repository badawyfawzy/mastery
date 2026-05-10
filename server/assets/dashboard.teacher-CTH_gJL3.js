import { r as reactExports, T as jsxRuntimeExports, Z as Outlet } from "./worker-entry-CKK1s15-.js";
import { s as supabase, N as Navigate } from "./router-Ck0CG9hO.js";
import { u as useAuth } from "./useAuth-bOlZeoRX.js";
import { D as DashboardLayout } from "./DashboardLayout-CndbN4i_.js";
import { L as LoaderCircle } from "./loader-circle-DUr8rRIh.js";
import { L as LayoutDashboard } from "./layout-dashboard-B3gWJpj_.js";
import { B as BookOpen } from "./book-open-cOI2Sqm0.js";
import { C as ClipboardList } from "./clipboard-list-CEZdVuGF.js";
import { B as BrainCircuit } from "./brain-circuit-65aDG6LW.js";
import { U as Users } from "./users-DgtFckfF.js";
import { F as FileText } from "./file-text-BbmvqJuQ.js";
import { M as Megaphone } from "./megaphone-C1QAHj0O.js";
import { M as MessageCircle } from "./message-circle-DWK8yFuC.js";
import { c as createLucideIcon } from "./createLucideIcon-CtMxt8QD.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-B6C1Fcum.js";
import "./useStudentAuth-xxGXW9Gd.js";
import "./graduation-cap-C9rEQOFH.js";
import "./log-out-V1G052s1.js";
import "./x-DTk0BGto.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
];
const CircleUser = createLucideIcon("circle-user", __iconNode);
function TeacherLayoutRoute() {
  const {
    user,
    role,
    loading
  } = useAuth();
  const [academyName, setAcademyName] = reactExports.useState("");
  const [academyId, setAcademyId] = reactExports.useState(null);
  const [unread, setUnread] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!user || role !== "teacher") return;
    void (async () => {
      const {
        data
      } = await supabase.from("academies").select("id, name").eq("teacher_id", user.id).maybeSingle();
      if (data) {
        setAcademyName(data.name);
        setAcademyId(data.id);
      }
    })();
  }, [user, role]);
  reactExports.useEffect(() => {
    if (!academyId) return;
    let active = true;
    async function load() {
      const {
        count
      } = await supabase.from("messages").select("id", {
        count: "exact",
        head: true
      }).eq("academy_id", academyId).eq("sender_role", "student").eq("is_read", false);
      if (active) setUnread(count ?? 0);
    }
    void load();
    const ch = supabase.channel(`teacher-unread-${academyId}`).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "messages",
      filter: `academy_id=eq.${academyId}`
    }, () => void load()).subscribe();
    return () => {
      active = false;
      void supabase.removeChannel(ch);
    };
  }, [academyId]);
  const teacherNav = [{
    to: "/dashboard/teacher",
    label: "الرئيسية",
    icon: LayoutDashboard,
    exact: true
  }, {
    to: "/dashboard/teacher/courses",
    label: "الكورسات",
    icon: BookOpen
  }, {
    to: "/dashboard/teacher/quizzes",
    label: "الاختبارات",
    icon: ClipboardList
  }, {
    to: "/dashboard/teacher/question-bank",
    label: "بنك الأسئلة",
    icon: BrainCircuit
  }, {
    to: "/dashboard/teacher/students",
    label: "الطلاب",
    icon: Users
  }, {
    to: "/dashboard/teacher/articles",
    label: "المقالات",
    icon: FileText
  }, {
    to: "/dashboard/teacher/announcements",
    label: "الإعلانات",
    icon: Megaphone
  }, {
    to: "/dashboard/teacher/messages",
    label: "المراسلة",
    icon: MessageCircle,
    badge: unread
  }, {
    to: "/dashboard/teacher/profile",
    label: "الملف الشخصي",
    icon: CircleUser
  }];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-primary" }) });
  }
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (role !== "teacher") return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/dashboard" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { roleLabel: academyName ? `معلم · ${academyName}` : "معلم", navItems: teacherNav, userName: user.email ?? void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  TeacherLayoutRoute as component
};
