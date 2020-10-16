import { gql } from "apollo-boost";

export const QUESTION_QUERY = gql`
  query adminInfo {
    getSettingAdminEmail {
      email
      pw
    }
    getSettingQuestionOption {
      order
      questionType
    }
  }
`;

export const QUESTION_MUTATION = gql`
  mutation updateAdminInfo(
    $email: String
    $pw: String
    $questionTypes: [QuestionInputType!]
  ) {
    updateSettingQuestion(email: $email, pw: $pw, questionTypes: $questionTypes)
  }
`;
