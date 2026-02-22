import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RefRedirect = () => {
  const { refCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (refCode) {
      sessionStorage.setItem("ref", refCode);
    }
    navigate("/", { replace: true });
  }, [refCode, navigate]);

  return null;
};

export default RefRedirect;
