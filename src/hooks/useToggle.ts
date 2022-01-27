import { useState } from "react";

export default (defaultState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(defaultState);

  const handleToggle = () => setState((p) => !p);

  return [state, handleToggle];
};
