import type {
  CreateOrganizationPayload,
  Organization,
} from '@/domain/organizations';
import { supabase } from '@/supabaseClient';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getUserOrganizations(
  userId: string
): Promise<Organization[] | null> {
  // Step 1: get organization ids from membership table
  const { data: memberships, error: memError } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', userId);

  if (memError) {
    console.error('Error fetching organization memberships:', memError);
    return null;
  }

  const ids: string[] = Array.isArray(memberships)
    ? (memberships
        .map((r: unknown) =>
          r && typeof r === 'object'
            ? (r as Record<string, unknown>)['organization_id']
            : null
        )
        .filter(Boolean) as string[])
    : [];

  if (ids.length === 0) return [];

  // Step 2: fetch organizations by ids
  const { data: orgsData, error: orgsError } = await supabase
    .from('organizations')
    .select('id, name, created_at, updated_at')
    .in('id', ids as unknown as string[]);

  if (orgsError) {
    console.error('Error fetching organizations:', orgsError);
    return null;
  }

  return (orgsData as Organization[]) || [];
}

export async function createOrganization(
  org: CreateOrganizationPayload,
  userId: string
): Promise<{ data: Organization | null; error: PostgrestError | null }> {
  const { data: createdOrg, error: orgError } = await supabase
    .from('organizations')
    .insert([
      {
        name: org.name,
        slug: org.slug,
        type: org.type,
      },
    ])
    .select('*')
    .single();

  if (orgError || !createdOrg) {
    console.error('Error creating organization:', orgError);
    return { data: null, error: orgError };
  }

  const { error: membershipError } = await supabase
    .from('organization_members')
    .insert([
      {
        organization_id: createdOrg.id,
        user_id: userId,
        role: 'owner',
        is_default: true,
      },
    ]);

  if (membershipError) {
    console.error('Error creating organization membership:', membershipError);
    return { data: null, error: membershipError };
  }

  return { data: createdOrg, error: null };
}
