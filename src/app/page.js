import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-32 p-24">
      <h1 className="text-4xl font-bold">Assignments</h1>
      <div className="flex justify-center gap-8">
        <Link href="/form-validation" className="bg-white p-20 shadow-md rounded-2xl">
          <div>
            <h2 className="text-xl font-bold">Form Validation</h2>
          </div>
        </Link>
        <Link href="#" className="bg-white p-20 shadow-md rounded-2xl">
          <div>
            <h2 className="text-xl font-bold">Google Maps</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
