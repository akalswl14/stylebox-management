import { gql } from "apollo-boost";

export const GET_EVENTLIST = gql`
  query GET_EVENTLIST(
    $pageNum: Int
    $eventId: Int
    $eventTitle: String
    $eventIdAsc: Boolean
    $eventTitleAsc: Boolean
    $eventStartAsc: Boolean
    $eventEndAsc: Boolean
  ) {
    getEventManageList(
      pageNum: $pageNum
      eventId: $eventId
      eventTitle: $eventTitle
      eventIdAsc: $eventIdAsc
      eventTitleAsc: $eventTitleAsc
      eventStartAsc: $eventStartAsc
      eventEndAsc: $eventEndAsc
    ) {
      events {
        eventId
        eventTitle
        eventStart
        eventEnd
        isOnList
        link
        likesNum
        viewsNum
      }
      totalEventNum
    }
  }
`;

export const DELETE_EVENTS = gql`
  mutation DELETE_EVENTS($eventIds: [Int!]!) {
    deleteEventList(eventIds: $eventIds)
  }
`;

export const UPDATE_EVENTS = gql`
  mutation UPDATE_EVENTS($events: [EventListInputType!]!) {
    updateEventList(events: $events)
  }
`;
