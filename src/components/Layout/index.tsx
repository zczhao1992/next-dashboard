import Sidebar from "./Sidebar";
import Header from "./navHeader";
import Footer from "./Footer";
import { getMenuList } from "./config";

type CommonLayoutProps = {
  curActive: string;
  children: React.ReactNode;
};

export default function CommonLayout({
  curActive,
  children,
}: CommonLayoutProps) {
  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" menuList={getMenuList} />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <Header />

            <div className="hidden flex-col md:flex">{children}</div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
