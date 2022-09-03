import MarginProvider from "./MarginProvider";
import AdminNav from "../AdminNav";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNav />
      <MarginProvider>{children}</MarginProvider>
    </>
  );
}
