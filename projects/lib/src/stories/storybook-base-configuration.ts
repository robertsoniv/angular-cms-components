import 'tinymce/tinymce';
import '../../../../plugin/dist/plugin.min.js';
import { HeadStartSDK } from '@ordercloud/headstart-sdk';
import * as HeadStartSDKInstance from '@ordercloud/headstart-sdk';

HeadStartSDKInstance.Configuration.Set({
  baseApiUrl: 'https://marketplace-middleware-test.azurewebsites.net',
});
HeadStartSDK.Tokens.SetAccessToken(
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJhcmFyaWNrXzJAZm91cjUxLmNvbSIsImNpZCI6ImNlMDk1YTMwLWJlZmYtNGVkYy1iOTYwLTZiMDhmZjg4NDNmZSIsInUiOiIxMTgxMjQ3IiwidXNydHlwZSI6ImFkbWluIiwicm9sZSI6WyJBZGRyZXNzQWRtaW4iLCJNZUFkbWluIiwiT3JkZXJBZG1pbiIsIk92ZXJyaWRlU2hpcHBpbmciLCJPdmVycmlkZVRheCIsIk92ZXJyaWRlVW5pdFByaWNlIiwiUHJvZHVjdEFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlNldFNlY3VyaXR5UHJvZmlsZSIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlN1cHBsaWVyQWRtaW4iLCJTdXBwbGllclVzZXJBZG1pbiIsIlN1cHBsaWVyQWRkcmVzc0FkbWluIiwiU2hvcHBlciIsIlNoaXBtZW50QWRtaW4iLCJTdXBwbGllclJlYWRlciIsIlByb21vdGlvbkFkbWluIiwiQnV5ZXJSZWFkZXIiLCJCdXllckFkbWluIiwiQWRtaW5Vc2VyQWRtaW4iLCJEb2N1bWVudEFkbWluIiwiU2NoZW1hQWRtaW4iLCJBc3NldEFkbWluIl0sImlzcyI6Imh0dHBzOi8vc2FuZGJveGF1dGgub3JkZXJjbG91ZC5pbyIsImF1ZCI6Imh0dHBzOi8vc2FuZGJveGFwaS5vcmRlcmNsb3VkLmlvIiwiZXhwIjoxNjAwNDcwMzc3LCJuYmYiOjE2MDA0NDAzNzd9.sP77S_ZAw6o-KLInntZJosLDVeoS4ioKymRzSpp-RTM'
);
