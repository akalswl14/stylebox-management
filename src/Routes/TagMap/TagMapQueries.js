import { gql } from "apollo-boost";

export const GET_TAGDATA = gql`
  query GET_TAGDATA {
    getLocationTagList {
      classId
      className
      tags {
        tagId
        tagName
        postNum
      }
    }
    getStyleTagList {
      classId
      className
      tags {
        tagId
        tagName
        postNum
      }
    }
    getProductClassTagList {
      classId
      className
      tags {
        tagId
        tagName
        postNum
      }
    }
    getFeatureTagList {
      classId
      className
      tags {
        tagId
        tagName
        postNum
      }
    }
    getPriceTagList {
      classId
      className
      tags {
        tagId
        tagName
        postNum
      }
    }
  }
`;
