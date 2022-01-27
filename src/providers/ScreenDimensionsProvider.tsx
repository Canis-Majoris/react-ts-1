import { createContext } from 'react';
import useResize from '../hooks/useResize';

export const ScreenDimensionsContext = createContext({
  screenDimensions: {
    screenWidth: '',
    screenHeight: '',
  },
});

const ScreenDimensionsProvider = ({ children }: any) => {
  const values: any = useResize();

  return (
    <ScreenDimensionsContext.Provider value={values}>
      {children}
    </ScreenDimensionsContext.Provider>
  );
};

export default ScreenDimensionsProvider;
