// export const url = 'http://localhost:7781/api/v1'; //demo
export const url = 'http://103.193.75.198:8881/api/v1'; //live
// http://103.193.75.198:8882/api/v1/new_pdf/PL174b934308e-8a
// export const url = '/api/';
// export const url1 = '/api/';



export const Api_Endpoints = {
  login_Endpoint: `${url}/login`,
  dashboard_count: `${url}/dashboard_count`,
  top5PartsforClaimAPi: `${url}/admin/claims/top_5_parts_of_claim`,
  getUserPrivilage: `${url}/admin/getUserByPrivilage`,
  allWarantyHolderData: `${url}/admin/all_warranty_holder_data`,
  getClaimedPolicy: `${url}/admin/claims/get_claimed_policy`,
  getClaimDetails: `${url}/admin/claims/get_claim_details`,
  getInvoiceList: `${url}/admin/invoice_list`,
  getModel: `${url}/admin/model`,
  getState: `${url}/admin/states`,
  getCity: `${url}/admin/city`,
  getPdf: `http://103.193.75.198:8882/api/v1/new_pdf`,


  // export const url = 'http://103.193.75.198:8881/api/v1'; //live

  getStatus: `${url}/admin/status`,
  updateStatus: `${url}/admin/update_claim_status`,
  updateEstimation: `${url}/admin/update_claim_estimation`,
  getInvoices: `${url}/admin/invoice`,
  updateUTR: `${url}/admin/update_utr`,
  getBankList: `${url}/admin/bank_list`,
  getDealerList: `${url}/admin/dealer_list`,
  getAttachment: `${url}/admin/get_claims_file`,

};