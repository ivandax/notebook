export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  type: string;
  created_by: string;
}

export interface CreateOrganizationPayload {
  name: string;
  slug: string;
  type: string;
  created_by: string;
}
