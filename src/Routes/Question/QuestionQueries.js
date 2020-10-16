import { gql } from 'apollo-boost';

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
