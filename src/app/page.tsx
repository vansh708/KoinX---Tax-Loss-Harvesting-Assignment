import { Header } from "@/components/Header";
import { Dashboard } from "@/components/tax-harvesting/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark font-sans flex flex-col">
      <Header />
      <div className="flex-1">
        <Dashboard />
      </div>
    </main>
  );
}
