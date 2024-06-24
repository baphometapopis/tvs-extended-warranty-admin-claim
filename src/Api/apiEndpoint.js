// export const url = 'http://localhost:7781/api/v1'; //demo
export const url = 'https://103.193.75.198:8881/api/v1'; //live

export const Api_Endpoints = {
  login_Endpoint: `${url}/login`,
  dashboard_count: `${url}/dashboard_count`,
  top5PartsforClaimAPi: `${url}/admin/claims/top_5_parts_of_claim`,


  getUserPrivilage: `${url}/admin/getUserByPrivilage`,
  allWarantyHolderData: `${url}/admin/all_warranty_holder_data`,
  getClaimedPolicy: `${url}/admin/claims/get_claimed_policy`,
  getClaimDetails: `${url}/admin/claims/get_claim_details`,
  getModel: `${url}/admin/model`,
  getState: `${url}/admin/states`,
  getCity: `${url}/admin/city`,
  getPdf: `${url}/get_pdf`,
  getStatus: `${url}/admin/status`,
  getInvoices: `${url}/admin/invoices`,

  




  getDealerList: `${url}/admin/dealer_list`,










};