import { useEffect } from "react";
import { stickyNav } from "../../utils";
import Default from "./Default";
import Header1 from "./Header1";
import Header3 from "./Header3";
const Header = ({ header }) => {
  useEffect(() => {
    stickyNav();
  }, []);

  if (header === 1) {
    return <Header1 />;
  } else if (header === 2) {
    return <Default />;
  } else if (header === 3) {
    return <Header3 />;
  } else {
    return <Default />;
  }
  
};
export default Header;
