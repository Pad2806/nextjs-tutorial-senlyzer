// export default function Loading() {
//   return <p>Loading feed...</p>;
// }

export default function Loading() {
  return (
    <div style={{ padding: 16 }}>
      <div
        style={{ height: 16, width: 220, background: "#eee", marginBottom: 12 }}
      />
      <div
        style={{ height: 12, width: 320, background: "#eee", marginBottom: 8 }}
      />
      <div style={{ height: 12, width: 280, background: "#eee" }} />
    </div>
  );
}
