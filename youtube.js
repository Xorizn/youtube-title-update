function updateTitle() {
  
  var videoID = '8VfDrmu4Izg'; //https://youtu.be/8VfDrmu4Izg
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