import { Post } from '../request';

// 登录接口
export function login (data) {
  return Post('/mp/v1_0/authorizations', data);
}
