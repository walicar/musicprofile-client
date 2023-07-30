import React, {createContext, useContext} from 'react';
import { SupabaseClient, createClient } from "@supabase/supabase-js";
const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;

const defaultValue: SupabaseClient<any, "public", any> | any = {};
const SupabaseClientContext = createContext(defaultValue); // TODO: should it really be {};

export const useSupabaseClient = () => {
    return useContext(SupabaseClientContext);
}

export default SupabaseClientContext;