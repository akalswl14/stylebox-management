import React, { useState } from "react";
import QuestionPresenter from "./QuestionPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { QUESTION_QUERY, QUESTION_MUTATION } from "./QuestionQueries";
import { toast } from "react-toastify";

export default () => {
  const { loading, data } = useQuery(QUESTION_QUERY);
  const [
    updateAdminInfo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(QUESTION_MUTATION);

  const [adminState, setAdminState] = useState({
    email: "",
    pw: "",
  });
  const [questionState, setQuestionState] = useState([
    {
      id: 1,
      order: 1,
      questionType: "",
    },
  ]);
  const [isDataState, setIsDataState] = useState(false);

  const { email, pw } = adminState;

  const addRow = (e) => {
    e.preventDefault();
    const newData = {
      id: questionState.length + 1,
      order: questionState.length + 1,
      questionType: "",
    };
    setQuestionState((prevData) => [...prevData, newData]);
  };

  const deleteRow = (e, id) => {
    e.preventDefault();
    setQuestionState(questionState.filter((eachRow) => eachRow.id !== id));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAdminState({
      ...adminState,
      [name]: value,
    });
  };

  const onOrderChange = (id, e) => {
    const { value } = e.target;
    setQuestionState(
      questionState.map((option) =>
        option.id === id ? { ...option, order: Number(value) } : option
      )
    );
  };

  const onTypeChange = (id, e) => {
    const { value } = e.target;
    setQuestionState(
      questionState.map((option) =>
        option.id === id ? { ...option, questionType: value } : option
      )
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let orderArr = [];
    let questionStateArr = [];

    if (questionState.length < 1) {
      toast.error("Question Page : Please write questionType.");
      return;
    }

    for (const question of questionState) {
      if (orderArr.includes(question.order)) {
        toast.error("Question Page : Order values should not be the same.");
        return;
      }
      if (question.order === 0) {
        toast.error("Question Page : Order values should be bigger than 0.");
        return;
      }
      if (isNaN(question.order)) {
        toast.error("Invalid Price Value.");
        return;
      }
      if (question.questionType === "") {
        toast.error("Question Page : Please write questionType.");
        return;
      }
      orderArr.push(question.order);
      questionStateArr.push({
        order: question.order,
        questionType: question.questionType,
      });
    }

    if (adminState.email === "") {
      toast.error("Question Page : please write email");
      return;
    }

    if (adminState.pw === "") {
      toast.error("Question Page : please write password");
      return;
    }

    const {
      data: { updateSettingQuestion },
    } = await updateAdminInfo({
      variables: {
        email: adminState.email,
        pw: adminState.pw,
        questionTypes: questionStateArr,
      },
    });

    if (!updateSettingQuestion || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateSettingQuestion) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <QuestionPresenter
      loading={loading}
      data={data}
      onChange={onChange}
      onOrderChange={onOrderChange}
      onTypeChange={onTypeChange}
      email={email}
      pw={pw}
      setAdminState={setAdminState}
      setQuestionState={setQuestionState}
      questionState={questionState}
      mutationLoading={mutationLoading}
      mutationError={mutationError}
      onSubmit={onSubmit}
      addRow={addRow}
      deleteRow={deleteRow}
      isDataState={isDataState}
      setIsDataState={setIsDataState}
    />
  );
};
