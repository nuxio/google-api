<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>Upload</title>
  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
  <fieldset style="margin: 20px; padding: 20px;">
  <legend>单文件，Ajax</legend>
  <form id="form3">
    <div>
      <input type="text" id="customName" placeholder="自定义文件名" />
    </div>
    <div>
      <input type="file" class="file" />
    </div>
    <div>
      <input type="submit" value="上传">
    </div>
  </form>
</fieldset>

<fieldset style="margin: 20px; padding: 20px;">
  <legend>多文件，Ajax</legend>
  <form id="form4">
    <div>
      <input type="file" class="file" multiple />
    </div>
    <div>
      <input type="submit" value="上传" />
    </div>
  </form>
</fieldset>
<script>
  $(function () {
    const _csrf = "{{ ctx.csrf | safe }}";
    $('form').submit(function (e) {
      e.preventDefault();
      const formData = new FormData();
      const fileList = $(this).find('.file')[0].files;
      let index = 0;
      for (let key of fileList) {
        formData.append('file' + index, key);
        index++
      }
      formData.append('isAjax', 'yes');
      formData.append('customName', $(this).find('#customName').val() || '');
      $.ajax({
        url: '/upload/upload?_csrf=' + _csrf,
        data: formData,
        method: 'POST',
        contentType: false,
        processData: false,
        success: function (result) {

        },
        error: function (responseStr) {
          alert("error", responseStr);
        }
      });
    });
  });
</script>
</body>
</html>
