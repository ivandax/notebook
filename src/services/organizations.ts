import type { Organization } from '@/domain/organizations';
import { supabase } from '@/supabaseClient';

export const getUserOrganizations = async (userId: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select(
      `
      organization:organizations ( id, name, created_at, updated_at )
    `
    )
    .eq('user_id', userId);

  if (error) throw error;
  const orgs: Organization[] = data?.map((item) => item.organization[0]) || [];
  return orgs;
};
