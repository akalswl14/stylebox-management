import { gql } from "apollo-boost";

export const GET_BANNERS = gql`
  query getBanner {
    getSettingEventBanner {
      title
      order
      eventId
      bannerImage
    }
  }
`;

export const UPDATE_BANNERS = gql`
  mutation updateBanner($events: [IdOrderInputType!]!) {
    updateSettingEventBanner(events: $events)
  }
`;

export const SEARCH_EVENT = gql`
  query searchEvent($eventTitle: String!) {
    searchEvent(eventTitle: $eventTitle) {
      id
      bannerImage
      title
    }
  }
`;
