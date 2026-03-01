export const getRelativeTime = (timestamp: string | number | Date): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = (now.getTime() - time.getTime()) / 1000;

  if (diff < 60) return `${Math.floor(diff)}s${diff >= 2 ? "" : ""}`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)}m${diff >= 120 ? "" : ""}`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)}h${diff >= 7200 ? "" : ""}`;
  if (diff < 604800)
    return `${Math.floor(diff / 86400)}D${diff >= 172800 ? "" : ""}`;
  if (diff < 2592000)
    return `${Math.floor(diff / 604800)}W${diff >= 1209600 ? "" : ""}`;
  if (diff < 31536000)
    return `${Math.floor(diff / 2592000)}M${
      diff >= 5184000 ? "" : ""
    }`;

  return `${Math.floor(diff / 31536000)}Y${
    diff >= 63072000 ? "" : ""
  }`;
};
