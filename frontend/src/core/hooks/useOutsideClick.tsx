import { type RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClick;
