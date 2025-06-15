import { createContext } from 'react';

export const LayoutContext = createContext<{
  isSidemenuOpen: boolean;
  setIsSidemenuOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
}>({
  isSidemenuOpen: false,
  setIsSidemenuOpen: () => {},
  isMobile: undefined,
});
