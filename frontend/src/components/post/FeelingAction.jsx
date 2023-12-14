import PropTypes from "prop-types";
import EmojiPicker from "emoji-picker-react";
import ActiveFeelingSvg from "../svg/interactions/ActiveFeelingSvg";
import FeelingSvg from "../svg/interactions/FeelingSvg";
import { useThemeContext } from "../../contexts/ThemeContext";
import APIService from "../../services/APIService";
import { notifyError } from "../toasts/CustomToasts";
import { useUserContext } from "../../contexts/UserContext";

export default function FeelingAction({
  post,
  feelings,
  setSendFeeling,
  showEmojis,
  setShowEmojis,
  gifRef,
  headerRef,
}) {
  const { user } = useUserContext();
  const { theme } = useThemeContext();

  // If This emoji is already used by user, nothing happened
  // Else POST a new Feeling
  const handleSelectedEmoji = (emojiData) => {
    if (
      feelings.some(
        (el) => el.emoji === emojiData.unified && el.user_id === user.id
      )
    ) {
      setShowEmojis(false);
      return null;
    }
    APIService.post(`/feelings`, {
      name: emojiData.names[0],
      emoji: emojiData.unified,
      post_id: post.id,
      user_id: user.id,
    })
      .then(() => {
        setSendFeeling(true);
        setShowEmojis(false);
      })
      .catch((err) => {
        if (err.request?.status === 404 || err.request?.status === 500) {
          notifyError("Oops, something went wrong.");
        }
      });
    return null;
  };

  const handleEmojisPanel = () => {
    setShowEmojis(!showEmojis);
    if (!showEmojis && window.innerWidth < 785) {
      headerRef.current?.scrollIntoView({ behovior: "smooth" });
    } else if (!showEmojis && window.innerWidth > 785) {
      gifRef.current?.scrollIntoView({
        behovior: "smooth",
        inline: "start",
      });
    } else
      gifRef.current?.scrollIntoView({
        behovior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };

  return (
    <>
      <button
        type="button"
        aria-label="emoji panel"
        className="relative flex h-fit w-fit items-center gap-1 rounded-md bg-sand-0 p-2 outline outline-1 outline-sand-0 hover:text-granite-0 dark:bg-granite-0 dark:text-sand-0"
        onClick={() => handleEmojisPanel()}
      >
        {showEmojis ? <ActiveFeelingSvg /> : <FeelingSvg />}
        <p className="text-xs font-medium">+</p>
      </button>
      {showEmojis && (
        <div className="fixed bottom-0 left-0 z-30 text-xs lg:left-auto lg:right-2 lg:top-4 lg:w-fit">
          <EmojiPicker
            autoFocusSearch={false}
            emojiStyle="twitter"
            onEmojiClick={(emojiData) => handleSelectedEmoji(emojiData)}
            lazyLoadEmojis
            previewConfig={{
              defaultCaption: "Pick one!",
              defaultEmoji: "1f92a",
              showPreview: true,
            }}
            searchPlaceHolder="How do you feel ?"
            skinTonesDisabled
            suggestedEmojisMode="recent"
            theme={theme === "dark" ? "dark" : "light"}
            height={`${window.innerWidth < 785 ? "82dvh" : "95dvh"}`}
            width={`${window.innerWidth < 785 ? "100dvw" : "23dvw"}`}
          />
        </div>
      )}
    </>
  );
}

FeelingAction.propTypes = {
  post: PropTypes.shape().isRequired,
  feelings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSendFeeling: PropTypes.func.isRequired,
  showEmojis: PropTypes.bool.isRequired,
  setShowEmojis: PropTypes.func.isRequired,
  gifRef: PropTypes.shape().isRequired,
  headerRef: PropTypes.shape().isRequired,
};
