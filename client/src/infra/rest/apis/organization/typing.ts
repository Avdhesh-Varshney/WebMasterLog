export interface RequestOrganizationPayload {
  name: string;
  slug: string;
  requested_by_email: string;
  requested_by_name?: string;
}

export interface RequestOrganizationResponseData {
  org_id: string;
}
