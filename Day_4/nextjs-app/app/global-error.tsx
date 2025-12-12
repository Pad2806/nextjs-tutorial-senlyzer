"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Application Error</h1>
          <button onClick={() => reset()}>Reload</button>
        </div>
      </body>
    </html>
  );
}
