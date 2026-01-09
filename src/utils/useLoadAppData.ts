import { useEffect, useRef } from "react";
import { bootstrapAppData, useAppDispatch } from "../store";

export const useLoadAppData = () => {
  const dispatch = useAppDispatch();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    // Prevent double bootstrap in React Strict Mode
    if (hasBootstrapped.current) {
      return;
    }
    hasBootstrapped.current = true;

    dispatch(bootstrapAppData());
  }, [dispatch]);
};
