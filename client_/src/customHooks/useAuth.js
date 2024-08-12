import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/userReducer";
function useAuth() {
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => checkUser, [navigate]);
  const checkUser = async () => {
    console.log("checkUser initiated");
    try {
      if (localStorage.getItem("authtoken") === null) return navigate("/login");
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/auth/protected",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        if (!data.valid) {
          toast.error("Please login again");
          return navigate("/login");
        } else if (data.valid) {
          console.log(data);
          setValid(true);
          dispatch(setUser(data.userObject));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return;
}

export default useAuth;
