<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>Upload</title>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
  <fieldset style="margin: 20px; padding: 20px;">
  <legend>用户注册</legend>
  <form id="form" action="/user/register" method="POST">
    <div>
      <input type="text" name="openId" placeholder="openId" />
    </div>
    <div>
      <input type="text" name="nickName" placeholder="nickName" />
    </div>
    <div>
      <input type="text" name="gender" placeholder="gender" />
    </div>
    <div>
      <input type="text" name="avatarUrl" placeholder="avatarUrl" />
    </div>
    <div>
      <input type="text" name="city" placeholder="city" />
    </div>
    <div>
      <input type="text" name="province" placeholder="province" />
    </div>
    <div>
      <input type="text" name="country" placeholder="country" />
    </div>
    <div>
      <input type="text" name="createTime" placeholder="createTime" />
    </div>
    <div>
      <input type="text" name="latestTime" placeholder="latestTime" />
    </div>
    <div>
      <input type="submit" value="注册">
    </div>
  </form>
</fieldset>
</body>
</html>
