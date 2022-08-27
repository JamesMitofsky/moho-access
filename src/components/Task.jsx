export default function Task({ id, title, description }) {
  return (
    <div key={id}>
      <div>{id}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}
