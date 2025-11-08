
/*
  # Create Builds Storage Bucket
  
  Creates a public storage bucket for build artifacts and allows anyone to read files.
*/

INSERT INTO storage.buckets (id, name, owner, public, created_at, updated_at)
VALUES ('builds', 'builds', '00000000-0000-0000-0000-000000000000', true, now(), now())
ON CONFLICT DO NOTHING;

CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'builds');

CREATE POLICY "Service Role Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'builds');
