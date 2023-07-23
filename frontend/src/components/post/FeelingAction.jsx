import PropTypes from "prop-types";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import ActiveFeelingSvg from "../svg/interactions/ActiveFeelingSvg";
import FeelingSvg from "../svg/interactions/FeelingSvg";
import { useThemeContext } from "../../contexts/ThemeContext";
import APIService from "../../services/APIService";
import { notifyError } from "../../services/toasts";
import { useUserContext } from "../../contexts/UserContext";

export default function FeelingAction({ data, setSendFeelings }) {
  const { user } = useUserContext();
  const { theme } = useThemeContext();
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSelectedEmoji = (emojiData) => {
    APIService.post(`/feelings`, {
      name: emojiData.names[0],
      emoji: emojiData.unified,
      post_id: data.post_id,
      user_id: user.id,
    })
      .then(() => {
        setSendFeelings(true);
        setShowEmojis(false);
      })
      .catch((err) => {
        if (err.request.status === 404 || err.request.status === 500) {
          notifyError("Error, please try later.");
        }
      });
  };

  return (
    <>
      <button
        type="button"
        className="relative h-fit w-fit rounded-md bg-sand-0 p-2 hover:text-granite-0 dark:bg-granite-0 dark:text-sand-0"
        onClick={() => setShowEmojis(!showEmojis)}
      >
        {showEmojis ? <ActiveFeelingSvg /> : <FeelingSvg />}
      </button>
      {showEmojis && (
        <div className="fixed bottom-12 left-0 z-30 lg:left-12">
          <EmojiPicker
            autoFocusSearch={false}
            emojiStyle="twitter"
            onEmojiClick={(emojiData) => handleSelectedEmoji(emojiData)}
            searchPlaceHolder="How do you feel ?"
            previewConfig={{ showPreview: true }}
            skinTonesDisabled
            suggestedEmojisMode="recent"
            theme={theme === "dark" ? "dark" : "light"}
            width="100%"
          />
        </div>
      )}
    </>
  );
}

FeelingAction.propTypes = {
  data: PropTypes.shape().isRequired,
  setSendFeelings: PropTypes.func.isRequired,
};
