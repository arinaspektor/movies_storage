import { useCallback } from 'react';

export const useToast = () => {
  return useCallback((text, success=false) => {
    if (window.M && text) {
      return window.M.toast({ html: text, classes: success ? "green darken-2" : "red lighten-2"})
    }
  }, []);
}