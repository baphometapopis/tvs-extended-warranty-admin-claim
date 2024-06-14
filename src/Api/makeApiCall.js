import { getUserSession } from "../utils/auth";

const baseUrl = process.env.REACT_APP_BASE_URL;
const user_data=getUserSession()
const AUTH_TOKEN = user_data?.loginUserData?.Token
const DEFAULT_BODY_PARAMS = { BusinessPartnerId:user_data?.loginUserData?.BusinessPartnerId ,RoleId:user_data?.loginUserData?.RoleId};

const serializeToQueryParams = (obj) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      let encodedValue = encodeURIComponent(obj[p]);
      // Replace any encoded "/" (%2F) with "/"
      encodedValue = encodedValue.replace(/%2F/g, "/");
      str.push(encodeURIComponent(p) + "=" + encodedValue);
    }
  }
  return str.join("&");
};

// Function to make API calls with fetch
export const makeApiCall = async (url, method, data = {}) => {
  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add authorization token to the request headers
      'auth': `${AUTH_TOKEN}`,
    },

    
  };

  if (method === 'GET') {
    console.log(data,'awsdasd')
    const queryParams = serializeToQueryParams({ ...DEFAULT_BODY_PARAMS, ...data });
    url += `?${queryParams}`;
  } else {
    requestOptions.body = JSON.stringify({ ...DEFAULT_BODY_PARAMS, ...data });
  }




  try {
    const response = await fetch(`${url}`, requestOptions);
   
    return await response.json();
  } catch (error) {
    console.log(`API call failed for ${url}: ${error.message}`);
  }
};
