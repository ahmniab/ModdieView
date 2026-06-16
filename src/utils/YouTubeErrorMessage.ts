export const getYouTubeErrorMessage = (code: number) => {
  switch (code) {
    case 2:
      return "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.";
    case 5:
      return "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.";
    case 100:
      return "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.";
    case 101:
    case 150:
      return "The owner of the requested video does not allow it to be played in embedded players.";
    case 153:
      return "The request does not include the HTTP Referer header or equivalent API Client identification. See API Client Identity and Credentials for more information.";
    default:
      return "Invalid YouTube video. Please check the URL and try again.";
  }
};