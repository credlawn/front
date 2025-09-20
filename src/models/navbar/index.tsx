import { getMenuList } from "./navbarApi";
import Navbar from "./navbar";

export default async function NavbarContainer() {
  const menuData = await getMenuList();

  return <Navbar menuData={menuData} />;
}
