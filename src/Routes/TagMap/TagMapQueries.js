import { gql } from "apollo-boost";

export const GET_TAGDATA = gql`
	query GET_TAGDATA {
		getLocationTagList {
			className
			tags {
				tagId
				tagName
				postNum
			}
		}
		getStyleTagList {
			tagId
			tagName
			postNum
		}
		getProductClassTagList {
			className
			tags {
				tagId
				tagName
				postNum
			}
		}
		getFeatureTagList {
			tagId
			tagName
			postNum
		}
		getPriceTagList {
			tagId
			tagName
			postNum
		}
	}
`;
