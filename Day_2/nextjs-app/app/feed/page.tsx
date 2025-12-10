async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function FeedPage() {
  await sleep(2000); // giả lập fetch chậm 2s
  return <div>Feed content loaded</div>;
}
