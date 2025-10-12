import { Button } from "../ui/button";

export function TopBar() {
  return (
    <header className="w-full h-14 border-b bg-white shadow-sm flex items-center justify-between px-4">
      <h1 className="text-xl font-semibold text-gray-800">Notebook</h1>
      <Button variant="outline" size="sm">Login</Button>
    </header>
  );
}