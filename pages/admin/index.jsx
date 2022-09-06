import { Link, Typography, Button } from "@mui/material";
import AdminLayout from "../../components/layouts/AdminLayout";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function AdminLanding() {
  return (
    <AdminLayout>
      <Grid container spacing={5}>
        <Grid>
          <Typography variant="h1">Admin Home</Typography>
          <Typography variant="body1">
            From here you can update the two ways of accessing the resident
            space: individual people (called users) and global eys that work
            like a blank check for anyone who knows the code.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">Authorized Users</Typography>
          <Typography variant="body1">
            Here, you can authorize individual people who have registered
            themselves (they need to visit the registration page) & update the
            access of existing individuals.
          </Typography>
          <Link href="/admin/users">
            <Button variant="outlined">Manage Users</Button>
          </Link>
        </Grid>
        <Grid>
          <Typography variant="h2">Global Keys</Typography>
          <Typography variant="body1">
            This section is a good choice if an enterprise is renting the
            resident space for a day. Many people can access the space with the
            same key. For example, if Quonto was holding a big event at Moho,
            this is a great time to create a global key which anyone can use
            during their time here. Send them one link, and they can distribute
            it among themselves.
          </Typography>
          <Link href="/admin/keys">
            <Button variant="outlined">Manage Keys</Button>
          </Link>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
