import LoginForm from "../../components/Form/LoginForm";
import { handleLogin } from "../../api/firebase";
import { useNavigate, useActionData, useNavigation } from "react-router-dom";
import useQuestionStore from "../../store/zustand";
import { useEffect } from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";

function LoginPage() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { authUser } = useQuestionStore();

  useEffect(() => {
    if (data?.type === "SUCCESS") {
      authUser({ email: data.email, id: data.id });
      navigate("/");
    }
  }, [data]);

  return (
    <AnimateProvider>
      {data?.type === "ERROR" && (
        <p className="text-rose-700 text-xs font-bold mb-3">
          {" "}
          Error : {data.message.split("(")[1].replace(")", "")}
        </p>
      )}
      <LoginForm loading={navigation.state === "submitting"} />
    </AnimateProvider>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  try {
    const user = await handleLogin(email, password);

    return {
      type: "SUCCESS",
      email: user.email,
      id: user.uid,
    };
  } catch (error) {
    return {
      type: "ERROR",
      message: error.message,
    };
  }
}

export default LoginPage;
