export default function App() {
  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
      <section className="flex gap-8 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-32 h-32 bg-amber-100">
            {i}
          </div>
        ))}
      </section>
    </div>
  );
}
