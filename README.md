# API YOUTUBE
<a href="https://youtube.com/c/YuzzuKamiyaka"><img align="center" height="auto" src="https://www.labnol.org/static/19650a181bb2b847809cd42266bdcc17/607b4/youtube-video-views-title.png"/></a>


How to make such a video, with javascript
<br>Little wonder, the world of YouTube is fascinated with this “magic” title and the video has garnered over 20 million views so far.

If you are left wondering how this is done, here’s the secret sauce - the YouTube API. We create a background cron job that runs, say, every 5 minutes and gets the current number of views for the specified video. If the number of views has increased since the last run, we update the video title with, you got it right, the YouTube API.
## How to make
Like to build something similar for a video on your own YouTube channel? Well, there’s always <a href="https://www.labnol.org/topic/google-apps-script">Google Apps Script</a> to the rescue.

<p>1. Make a copy of this <a href="https://script.google.com/d/1BdIVA7grLIpTCndhAM1wRV7bD1Ix8X5WvIWD1nT1A99jrcxW3ZEwPw4C/edit?newcopy=true" >Google Script</a> in your Google Drive.
<br>
2. Replace videoID with the video id of the YouTube video that you would like to use for this experiment. If the video URL is youtube.com/watch?v=abc, the video id is abc.
<br>
3. Go to the Run menu inside the Apps Script editor, choose Run and select updateYouTubeVideo. Allow the script to manage your YouTube account and that’s it.</p>
<h6><a href="https://youtu.be/78CqjS38uk0">SEE TUTORIAL</a></h6>


## SCRIPT 1
```js
function updateTitle() {
  
  var videoID = 'fzsipgNXKzg'; //https://youtu.be/fzsipgNXKzg
  var part = 'snippet,statistics';
  var params = {'id': videoID};
  
  var response = YouTube.Videos.list(part, params);
  var video = response.items[0];
  var videoViewsCount = video.statistics.viewCount;
  var videoLikeCount = video.statistics.likeCount;
  var videoDislikeCount = video.statistics.dislikeCount;
  var videoCommentCount = video.statistics.commentCount;
  var videoTitle = 'Video ini ditonton oleh ' + videoViewsCount + ' orang dan ' + videoLikeCount + ' like';
  
  video.snippet.title = videoTitle;
  
  try{
    YouTube.Videos.update(video, part);
    
  }catch(e){
    
  
  }
  
}
```
## SCRIPT 2

```js
const updateYouTubeVideo = (e = null) => {
  const id = 'ABCDEFG'; //https://youtu.be/ABCDEFG
  const template = 'This video has VIEWCOUNT views and COMMENTCOUNT comments';

  // The cron job is created only when the script is run manually
  if (e === null) {
    const triggerName = 'updateYouTubeVideo';
    const triggers = ScriptApp.getProjectTriggers().filter((trigger) => {
      return trigger.getHandlerFunction() === triggerName;
    });

    // If time based trigger doesn't exist, create one that runs every 5 minutes
    if (triggers.length === 0) {
      ScriptApp.newTrigger(triggerName).timeBased().everyMinutes(5).create();
    }
  }

  // Get the watch statistics of the video
  const { items: [video = {}] = [] } = YouTube.Videos.list(
    'snippet,statistics',
    { id }
  );

  // Parse the YouTube API response to get views and comment count
  const {
    snippet: { title: oldTitle, categoryId } = {},
    statistics: { viewCount, commentCount } = {},
  } = video;

  if (viewCount && commentCount) {
    const newTitle = template
      .replace('VIEWCOUNT', viewCount)
      .replace('COMMENTCOUNT', commentCount);

    // If the video title has not changed, skip this step
    if (oldTitle !== newTitle) {
      YouTube.Videos.update(
        { id, snippet: { title: newTitle, categoryId } },
        'snippet'
      );
    }
  }
};
```
