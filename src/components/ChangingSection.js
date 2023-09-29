import { useEffect, useState } from "react";

function ChangingSection({ children, changeRate }) {
  const [child, setChild] = useState(0);
  const updateChild = () => {
    setChild((c) => (c + 1 === children.length ? 0 : c + 1));
  };
  useEffect(() => {
    const interval = setInterval(updateChild, changeRate);
    return () => clearInterval(interval);
  }, []);
  return <>{children[child]}</>;
}

export default ChangingSection;
