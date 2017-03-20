/**
 * Created by fluxa on 5/3/16.
 */

/*
 Function to get the temporary signed request from the app.
 If request successful, continue to upload the file using this signed
 request.
 */
function getSignedRequest(file_name, file_type, folder_name, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/s3/sign?file_name=" + file_name + "&file_type=" + file_type + "&folder_name=" + folder_name);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                cb(null, response);
            }
            else {
                cb('Could not get signed URL');
            }
        }
    };
    xhr.send();
}

/*
 Function to carry out the actual PUT request to S3 using the signed request from the app.
 */
function uploadFile(file, signed_request, url, progressCb, finalCb) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.upload.onprogress = progressCb;
    xhr.onload = function () {
        if (xhr.status === 200) {
            finalCb();
        }
    };
    xhr.onerror = function () {
        finalCb('Could not upload file.')
    };
    xhr.send(file);
}
