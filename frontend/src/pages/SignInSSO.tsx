import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { signInSSO } from "../store/user/user.middleware";

export const SignInSSO = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signInSSO());
    navigate("/");
  }, []);

  return <></>;
};
