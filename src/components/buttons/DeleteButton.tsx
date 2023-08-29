import React, { useState } from "react";
import ServerWrapper from "@server/ServerWrapper";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "@contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const ID = import.meta.env.VITE_SUPABASE_ID;
const DeleteButton: React.FC = () => {
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => setShowDialog(true);
  const cancelDelete = () => setShowDialog(false);
  const confirmDelete = async () => {
    setShowDialog(false);
    const server = new ServerWrapper(session.access_token);
    await server.delete();
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <>
      {!showDialog ? (
        <button onClick={handleDelete}>Delete my account</button>
      ) : (
        <div>
          Are you sure want to delete your account?
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
