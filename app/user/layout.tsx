import DashboardHeader from "../components/DashboardHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardHeader/>
      {children}
    </main>
  );
}