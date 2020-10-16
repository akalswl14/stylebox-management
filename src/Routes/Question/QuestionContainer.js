import React, { useState } from "react";
import QuestionPresenter from "./QuestionPresenter";
import { useQuery } from "react-apollo-hooks";
import { QUESTION_QUERY } from "./QuestionQueries";

export default () => {
  const { loading, data } = useQuery(QUESTION_QUERY);
  const [adminState, setAdminState] = useState({
    email: "",
    pw: "",
  });
  const [questionState, setQuestionState] = useState([
    {
      order: "",
      questionType: "",
    },
  ]);
  const [alreadyGetData, setalreadyGetData] = useState(false);
  const { email, pw } = adminState;

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email" || name === "pw") {
      setAdminState({
        ...adminState,
        [name]: value,
      });
    }
    if (name === "order") {
      setQuestionState(questionState.map());
    }
    if (name === "questionType") {
    }
  };

  return (
    <QuestionPresenter
      loading={loading}
      data={data}
      onChange={onChange}
      email={email}
      pw={pw}
      setAdminState={setAdminState}
      setQuestionState={setQuestionState}
      questionState={questionState}
      alreadyGetData={alreadyGetData}
      setalreadyGetData={setalreadyGetData}
    />
  );
};
