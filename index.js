const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NzYyYWVhZS02NDE0LTRkOWYtYjU1Mi1mNTYzYjRmYTNlZjAiLCJlbWFpbCI6Im1hbm9uLmdhcmRpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGY0MjdhMWYxYmE4MDE2NTg1ZGUiLCJzY29wZWRLZXlTZWNyZXQiOiJiZmRjOGYxOTBmZmQ3ZDRmYWY1MTM3N2M4MmJjNTA2Mjg0OGQ4YzNjNzhiNmQ0NDM0YzA2NzYzMDcxOTIzZmQxIiwiaWF0IjoxNzA3MjQ0MTM0fQ.YwDIqoSBdVByB58Lucm7AYYc2_UmoCTlYBFkA4ebMLY'

const pinFileToIPFS = async ()=> {
    const formData = new FormData();
    const src = "Chaton.jpeg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'Chaton',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    //formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS()