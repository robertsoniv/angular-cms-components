import { HeadStartSDK } from '@ordercloud/headstart-sdk';

export default function cmsUploadCommand(
  ignorethisparam,
  { blobInfo, successCallback, errorCallback }
) {
  console.log(ignorethisparam);
  const filename = blobInfo.filename();
  HeadStartSDK.Upload.UploadAsset({
    Active: true,
    File: blobInfo.blob(),
    Type: 'Image',
    FileName: filename,
    Title: filename.split('.')[0],
  })
    .then((response) => {
      successCallback(response.Url);
    })
    .catch((err) => {
      console.log(err);
      errorCallback((e) => {
        console.log(e);
        alert('There was an error uploading image');
      });
    });
}
