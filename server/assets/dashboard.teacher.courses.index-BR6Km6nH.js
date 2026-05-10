import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CKK1s15-.js";
import { u as useNavigate, s as supabase, L as Link } from "./router-Ck0CG9hO.js";
import { u as useAuth } from "./useAuth-bOlZeoRX.js";
import { P as PageContainer, a as PageHeader } from "./DashboardLayout-CndbN4i_.js";
import { P as Plus, T as Trash2 } from "./trash-2-CG_oaOWZ.js";
import { B as BookOpen } from "./book-open-cOI2Sqm0.js";
import { E as EyeOff, a as Eye } from "./eye-1p_zbpTJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-B6C1Fcum.js";
import "./useStudentAuth-xxGXW9Gd.js";
import "./graduation-cap-C9rEQOFH.js";
import "./createLucideIcon-CtMxt8QD.js";
import "./log-out-V1G052s1.js";
import "./x-DTk0BGto.js";
function TeacherCoursesPage() {
  const {
    user,
    role
  } = useAuth();
  const navigate = useNavigate();
  const [academyId, setAcademyId] = reactExports.useState(null);
  const [courses, setCourses] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!user || role !== "teacher") return;
    loadAcademy(user.id);
  }, [user, role]);
  async function loadAcademy(teacherId) {
    const {
      data
    } = await supabase.from("academies").select("id").eq("teacher_id", teacherId).single();
    if (!data) return;
    setAcademyId(data.id);
    loadCourses(data.id);
  }
  async function loadCourses(aId) {
    const {
      data
    } = await supabase.from("courses").select("*").eq("academy_id", aId).order("created_at", {
      ascending: false
    });
    setCourses(data || []);
  }
  function handleCreate() {
    navigate({
      to: "/dashboard/teacher/courses/$courseId",
      params: {
        courseId: "new"
      }
    });
  }
  async function togglePublish(course) {
    await supabase.from("courses").update({
      is_published: !course.is_published
    }).eq("id", course.id);
    if (academyId) {
      loadCourses(academyId);
    }
  }
  async function deleteCourse(id) {
    const ok = confirm("هل أنت متأكد من حذف الكورس ؟");
    if (!ok) return;
    await supabase.from("courses").delete().eq("id", id);
    if (academyId) {
      loadCourses(academyId);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "إدارة الكورسات", description: "إدارة جميع الكورسات الخاصة بك", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCreate, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
      "كورس جديد"
    ] }) }),
    courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-2xl p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-12 mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "لا يوجد كورسات بعد" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-primary text-white flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-3 py-1 rounded-full ${course.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`, children: course.is_published ? "منشور" : "مسودة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-2", children: course.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 line-clamp-2", children: course.description || "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/teacher/courses/$courseId", params: {
          courseId: course.id
        }, className: "flex-1 text-center border rounded-lg py-2", children: "إدارة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublish(course), className: "size-10 border rounded-lg flex items-center justify-center", children: course.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteCourse(course.id), className: "size-10 border rounded-lg flex items-center justify-center text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] })
    ] }, course.id)) })
  ] });
}
export {
  TeacherCoursesPage as component
};
