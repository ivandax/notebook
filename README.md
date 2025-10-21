## Notes of setup

Installed the CLI
`NODE_OPTIONS=--no-experimental-fetch yarn add supabase --dev`

See more: https://supabase.com/docs/guides/local-development?queryGroups=package-manager&package-manager=yarn#quickstart

To develop locally, start Docker desktop first then `yarn supabase start`

Create migration file `yarn supabase migration new init_saas_schema`

Apply migration `yarn supabase db reset`

Get the project id from settings page: Project ID

Linking and pushing changes (using project id)
`yarn supabase link --project-ref synkxqhdhympybroqyyn`
`yarn supabase db push`

Adding more migrations

`yarn supabase migration new add_profile_trigger`

## PENDING

 - Fields for organization-slug and is_main (boolean)
 - Fields for profile: organization_role (string)