import { Link, Typography, Button } from "@mui/material";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function AdminLanding() {
  return (
    <AdminLayout>
      <Typography variant="h1">Manage Access</Typography>
      <Link href="/admin/users">
        <Button variant="outlined">Users</Button>
      </Link>
      <Link href="/admin/keys">
        <Button variant="outlined">Global Keys</Button>
      </Link>
    </AdminLayout>
  );
}
