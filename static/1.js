// XMLHttpRequest Level 1
function level1(url, responseType) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log('xhr.readyState =>', xhr.readyState);
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('success', xhr);
    }
  };
  xhr.open('GET', url);
  xhr.responseType = responseType ? responseType : 'text';
  xhr.send();
}
// arraybuffer
// response 是一个包含二进制数据的 JavaScript ArrayBuffer。
// blob
// response 是一个包含二进制数据的 Blob 对象 。
// document
// response 是一个 HTML Document 或 XML XMLDocument，这取决于接收到的数据的 MIME 类型。请参阅 XMLHttpRequest 中的 HTML 以了解使用 XHR 获取 HTML 内容的更多信息。
// json
// response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
// text
// response 是一个以 DOMString 对象表示的文本。

// XMLHttpRequest Level 2
function level2(url) {
  var xhr = new XMLHttpRequest();
  // xhr.timeout = 2000; // IE11 不支持
  xhr.open('GET', url);
  xhr.onloadstart = function () {
    // onloadstart readyState => 1
    // 开始发送请求的时候触发
    console.log('onloadstart ', this.readyState)
  }
  xhr.onprogress = function () {
    // onprogress readyState => 3
    // 只在请求进行中触发
    console.log('onprogress ', this.readyState)
  }
  xhr.onload = function () {
    // onload readyState => 4
    // 只在请求完成时触发
    console.log('onload ', this.readyState)
    console.log('xhr ', xhr)
  }
  xhr.onloadend = function () {
    // onloadend readyState => 4
    // 请求响应过程结束的时候触发
    console.log('onloadend ', this.readyState)
  }
  xhr.ontimeout = function () {
    // ontimeout
    console.log('ontimeout ', this.readyState)
  }
  xhr.onerror = function () {
    // ontimeout
    console.log('onerror ', this.readyState)
  }
  xhr.onabort = function () {
    // ontimeout
    console.log('onabort ', this.readyState)
  }
  
  xhr.send();
}