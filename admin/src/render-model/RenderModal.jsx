import { useCallback, useContext } from "react";
import SignupModal from "../Modals/SignupModal";
import { ActiveModal } from "../main";
import ProfileView from "../Modals/ProfileView";
import ConnectionProfileView from "../Pages/Connections/ConnectionProfileView";
import SendMailTo from "../Modals/SendMailTo";
import EditProfile from "../Pages/Profile/EditProfile";
import SignUp from "../Modals/SignUp";
import PostAjob from "../Pages/Jobs/PostAjob";
import EditJob from "../Pages/Jobs/EditJob";

const RenderModal = ({}) => {
  const [activeModalState, setActiveModalState] = useContext(ActiveModal);

  const onClose = useCallback(() => {
    setActiveModalState("");
  }, []);
  switch (activeModalState) {
    case "form":
      return <SignupModal onClose={onClose} />;
    case "profileView":
      return <ProfileView onClose={onClose} />;
    case "sendMail":
      return <SendMailTo onClose={onClose} />;
    case "editprofile":
      return <EditProfile onClose={onClose} />;
    case "editjob":
      return <EditJob onClose={onClose} />;
    case "postajob":
      return <PostAjob onClose={onClose} />;
    case "newcompany":
      return <SignUp onClose={onClose} />;
    case "sendmail":
      return <SendMailTo onClose={onClose} />;
    case "profileViewOfConnections":
      return <ConnectionProfileView onClose={onClose} />;
    default:
      return;
  }
};

export default RenderModal;
