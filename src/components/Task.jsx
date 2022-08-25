export default function Task({ id, key, title, description }) {
  return (
    <div>
      <div>{id}</div>
      <div>{key}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}
