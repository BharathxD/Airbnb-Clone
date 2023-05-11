import Container from "../UI/Container";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]F">
        <Container>
            
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
