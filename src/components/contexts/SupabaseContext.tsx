import { createContext, useContext } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

const defaultValue: SupabaseClient<any, "public", any> | any = {};
const SupabaseClientContext = createContext(defaultValue); // TODO: should it really be {};

export const useSupabaseClient = () => {
  return useContext(SupabaseClientContext);
};

export default SupabaseClientContext;
