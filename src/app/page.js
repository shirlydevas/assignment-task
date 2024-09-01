import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-32 sm:p-24 p-10">
      <h1 className="text-4xl font-bold">Assignments</h1>
      <div className="flex justify-center gap-8 sm:flex-row flex-col">
        <Link href="/form-validation" className="bg-white sm:p-20 py-20 px-10 text-center shadow-md rounded-2xl" title="Form Validation">
          <div>
            <h2 className="text-xl font-bold">Form Validation</h2>
          </div>
        </Link>
        <Link href="/google-map" className="bg-white sm:p-20 py-20 px-10 text-center shadow-md rounded-2xl" title="Google Maps">
          <div>
            <h2 className="text-xl font-bold">Google Maps</h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
