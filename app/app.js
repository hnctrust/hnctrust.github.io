var server = {};
var postsBaseUrl= 'https://www.googleapis.com/blogger/v2/blogs/3755930048376008407/posts';
var keyStr = '?key=AIzaSyACx3txhC4FQl_GDuYSrIyDmbpNi-_MbQY';

server.getData=function(httpVerb,url,cb){
  $.ajax({
      url: url,
      cache: true,
      type: httpVerb,
      success: function(data){
        cb.call(this,data);
      },
      error: function(data) {
        cb.call(this,data);
      }
    });
};

var app = {};

app.getRecentPosts=function(cb){
  server.getData('GET',postsBaseUrl+keyStr,function(data){
    cb.call(this,data);
  });
};

app.getPost=function(postId,cb){
  server.getData('GET',postsBaseUrl+'/'+postId+keyStr,function(data){
    cb.call(this,data);
  });
};

app.getRecentComments=function(postId,cb){
  server.getData('GET',postsBaseUrl+'/'+postId+'/comments'+keyStr,function(data){
    cb.call(this,data);
  });
};
