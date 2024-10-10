import Image from "next/image";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-end">
            <Image src="/logo.svg" height={30} width={30} alt="Logo" />
            <span className="text-xl ml-2 font-semibold tracking-tight">
              Next-Dashboard
            </span>
          </div>

          <Button variant="secondary">注册</Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
