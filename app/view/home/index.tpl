<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>Upload</title>
  <script src="https://unpkg.com/qiniu-js@2.2.2/dist/qiniu.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    <div>
      <input type="file" @change="changeHandler" ref="file" />
      <progress :value="percent" max="100" v-if="uploading">
        {{loaded}} / {{total}}
      </progress>
      <button @click="reset">重置</button>
    </div>
    <div class="error" v-if="err">
      {{err}}
    </div>
    <img :src="src" v-if="src" />

    <code v-if="result">
      {{result}}
    </code>
  </div>

  <script>
    const config = {
      useCdnDomain: false, // 是否使用 cdn 加速域名
      retryCount: 2,
      region: qiniu.region.z0, // 华东地区，和bucket所在地区对应
    };
    const putExtra = {
      mimeType: ["image/png", "image/jpg", "image/jpeg", "image/gif"], // 用来限制上传文件类型，为 null 时表示不对文件类型限制
    };

    function postData(url, data) {
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      .then(response => response.json()) // parses response to JSON
    }

    const app = new Vue({
      el: '#app',
      data: {
        uploading: false,
        loaded: 0,
        total: 0,
        percent: 0,
        src: '',
        err: '',
        observer: null,
        result: '',
      },
      created() {
        this.observer = {
          next: this.next.bind(this),
          error: this.error.bind(this),
          complete: this.complete.bind(this),
        };
      },
      methods: {
        changeHandler(e) {
          const file = e.target.files && e.target.files[0];
          if (!file) {
            return;
          }
          this.uploading = true;

          fetch('/upload/token')
            .then(res => res.json())
            .then(res => {
              const observable = qiniu.upload(file, file.name, res.token, putExtra, config);

              const subscription = observable.subscribe(this.observer); // 上传开始
            });
        },
        next(res) {
          this.loaded = res.total.loaded;
          this.total = res.total.total;
          this.percent = res.total.percent;
        },
        error(res) {
          this.err = `上传失败：${res.message}`;
          this.percent = 0;
          this.uploading = false;
        },
        complete(res) {
          this.src = `http://p1501d1m6.bkt.clouddn.com/${res.key}`;
          this.percent = 0;
          this.uploading = false;
          this.fuckGoogle();
        },
        reset() {
          this.err = '';
          this.src = '';
          this.percent = 0;
          this.uploading = false;
          this.result = '';
          this.$refs.file.value = '';
        },
        fuckGoogle() {
          const data = {
            image: {
              source: {
                imageUri: this.src,
              },
            },
            features: {
              type: 'LABEL_DETECTION'
            },
          };
          const url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCLCJfd5AKZdEmKNoFurBtzx-PI0kV17c0';

          postData(url, data)
            .then(res => {
              this.result = JSON.stringify(res);
            })
            .catch(err => {
              this.result = JSON.stringify(err);
            });
        },
      },
    });
  </script>
</body>
</html>
