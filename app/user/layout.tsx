import DashboardHeader from "../components/DashboardHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <DashboardHeader/>
      {children}
    </main>
  );
}