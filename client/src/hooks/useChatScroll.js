import { useEffect, useState } from "react";

export const useChatScroll = ({
  bottomRef,
  chatRef,
  count,
  loadMore,
  shouldLoadMore,
}) => {
  const [hasInitialized, setHashInitialized] = useState(false);
  useEffect(() => {
    const topDiv = chatRef?.current;
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const topDiv = chatRef?.current;
    const bottoDiv = bottomRef?.current;

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottoDiv) {
        setHashInitialized(true);
      }

      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [shouldLoadMore, count, bottomRef, chatRef, hasInitialized]);
};
