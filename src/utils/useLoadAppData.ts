import { useEffect } from "react";
import { bootstrapAppData, useAppDispatch } from "../store";

export const useLoadAppData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(bootstrapAppData());
  }, [dispatch]);
};
