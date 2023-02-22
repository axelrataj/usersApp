import Surface from "components/Surface/Surface";
import Detail from "components/Detail/Detail";
import MainTemplate from "templates/MainTemplate";
import List from "components/List/List";
import { useSelector } from "react-redux";
import { selectActiveView, selectActiveMessage } from "store/features/users/usersSlice";
import Message from "components/Message/Message";
import { MessageInterface } from "types/types";

const Root = () => {
  const activeView: string = useSelector(selectActiveView);
  const activeMessage: MessageInterface = useSelector(selectActiveMessage);

  return (
    <>
      <MainTemplate>
        {activeView === "list" ? (
          <Surface>
            <List />
          </Surface>
        ) : null}

        {activeView === "detail" ? (
          <Surface type="full">
            <Detail />
          </Surface>
        ) : null}

        {activeMessage.type ? (
          <Message type={activeMessage.type} content={activeMessage.content} />
        ) : null}
      </MainTemplate>
    </>
  );
};

export default Root;
