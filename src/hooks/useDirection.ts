import useLocalStorage from "./useLocalStorage";

const useDirection = () => {
  const [direction, setDirection] = useLocalStorage("app-direction", "ltr");
  return { direction, setDirection };
};

export default useDirection;
