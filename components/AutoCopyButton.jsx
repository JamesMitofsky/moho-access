import { Button } from "@mui/material";

export default function AutoCopyButton({ copyItem }) {
  function handleCopy() {
    navigator.clipboard.writeText(copyItem);
    alert("Copied to clipboard!");
  }

  return <Button onClick={handleCopy}>Copy Access Link</Button>;
}
