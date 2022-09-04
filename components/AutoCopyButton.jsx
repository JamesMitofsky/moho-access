import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function AutoCopyButton({ copyItem }) {
  function handleCopy() {
    navigator.clipboard.writeText(copyItem);
    alert("Copied to clipboard!");
  }

  return (
    <Button endIcon={<ContentCopyIcon />} onClick={handleCopy}>
      Copy Link
    </Button>
  );
}
