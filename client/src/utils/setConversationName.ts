import { PersonType } from "../types";

const setConversationName = (participants: Array<string>, user: any, people: Array<PersonType>) => {
  let recipients = participants.filter(
    (participant) => participant !== user._id
  );
  recipients = recipients.map((participant) => {
    return people.find((person) => participant === person._id)!.username;
  });

  const recipientUsers = recipients.join(", ");

  return recipientUsers
};

export default setConversationName;
