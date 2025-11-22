import type {
  CreateFisioOrganizationClientPayload,
  FisioOrganizationClient,
} from '@/domain/fisio-organization-client';
import type { Result } from '@/domain/result';
import { supabase } from '@/supabaseClient'; // or wherever you store them

/**
 * Fetch all clients for a given organization.
 */
export async function getFisioOrganizationClients(
  organizationId: string
): Promise<FisioOrganizationClient[] | null> {
  const { data, error } = await supabase
    .from('fisio_organization_clients')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching Fisio organization clients:', error);
    return null;
  }

  return data as FisioOrganizationClient[];
}

/**
 * Create a new client within an organization.
 */
export async function createFisioOrganizationClient(
  payload: CreateFisioOrganizationClientPayload
): Promise<Result<FisioOrganizationClient>> {
  const { data, error } = await supabase
    .from('fisio_organization_clients')
    .insert([payload])
    .select('*')
    .single();

  if (error || !data) {
    console.error('Error creating Fisio organization client:', error);
    return { data: null, error };
  }

  return { data: data as FisioOrganizationClient, error: null };
}
