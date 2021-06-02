import fetch from 'auth/FetchInterceptor'

const apiService = {}

apiService.login = function (url, data) {
  return fetch({
    url: url,
    method: 'post',
    headers: {
      'public-request': 'true'
    },
    data: data
  })
}

apiService.refreshToken = function (url, data) {
  return fetch({
    url: url,
    method: 'post',
    headers: {
      'public-request': 'true'
    },
    data: data
  })
}

apiService.getPost = function (url, params) {

  console.log(url);

  return fetch({
    url: url,
    method: 'get',
    params
  })
}

apiService.setPost = function (url, data) {
  return fetch({
    url: url,
    method: 'post',
    data: data
  })
}

export default apiService