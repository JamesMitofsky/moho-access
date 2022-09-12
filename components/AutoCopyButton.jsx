import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function AutoCopyButton({ copyItem }) {
  function handleCopy() {
    navigator.clipboard.writeText(copyItem);
  }

  return (
    <Button endIcon={<ContentCopyIcon />} onClick={handleCopy}>
      Copier le Lien
    </Button>
  );
}
