export interface FisioOrganizationClient {
  id: string;
  organization_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateFisioOrganizationClientPayload {
  organization_id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}
