import { r as reactExports } from "./worker-entry-CKK1s15-.js";
import { s as supabase } from "./router-Ck0CG9hO.js";
const KEY = "eduverse_student_session";
function getStoredStudentToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
}
function setStoredStudentToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, token);
}
function clearStudentSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
function useStudentAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const token = getStoredStudentToken();
    if (!token) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase.rpc("validate_student_session", { _token: token });
      if (error || !data || data.length === 0) {
        clearStudentSession();
        setSession(null);
      } else {
        const row = data[0];
        setSession({
          student_id: row.student_id,
          academy_id: row.academy_id,
          full_name: row.full_name,
          student_code: row.student_code,
          academy_slug: row.academy_slug,
          academy_name: row.academy_name,
          token
        });
      }
      setLoading(false);
    })();
  }, []);
  function logout() {
    clearStudentSession();
    setSession(null);
  }
  return { session, loading, logout };
}
export {
  clearStudentSession as c,
  getStoredStudentToken as g,
  setStoredStudentToken as s,
  useStudentAuth as u
};
