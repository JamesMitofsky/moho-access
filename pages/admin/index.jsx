import { Link, Typography, Button } from "@mui/material";
import AdminLayout from "../../components/layouts/AdminLayout";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import KeyIcon from "@mui/icons-material/Key";

export default function AdminLanding() {
  return (
    <AdminLayout>
      <Grid container spacing={5}>
        <Grid>
          <Typography variant="h1">Maison d’Administration</Typography>
          <Typography variant="body1">
            De là, vous pouvez mettre à jour les deux façons d’accéder à
            l’espace résident : les personnes individuelles (appelés
            utilisateurs) et clés globales qui fonctionnent comme un chèque en
            blanc pour toute personne qui connaît le code.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">Les Utilisateurs</Typography>
          <Typography variant="body1">
            Ici, vous pouvez autoriser les personnes qui se sont inscrites
            (elles doivent visiter la page d’inscription) et mettre à jour
            l’accès des personnes existantes.
          </Typography>
          <Link href="/admin/users">
            <Button
              startIcon={<SupervisorAccountIcon />}
              fullWidth
              variant="outlined"
            >
              Gérer les Utilisateurs
            </Button>
          </Link>
        </Grid>
        <Grid>
          <Typography variant="h2">Les Clés Globales</Typography>
          <Typography variant="body1">
            Cette section est un bon choix si une entreprise loue l’espace
            résident pour une journée. Beaucoup de gens peuvent accéder à
            l’espace avec la même clé. Par exemple, si Quonto organisait un
            grand événement à Moho, c’est le moment idéal pour créer une clé
            mondiale que n’importe qui peut utiliser pendant son séjour ici.
            Envoyez-leur un lien, et ils pourront le distribuer entre eux.
          </Typography>
          <Link href="/admin/keys">
            <Button startIcon={<KeyIcon />} fullWidth variant="outlined">
              Gérer les Clés
            </Button>
          </Link>
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
