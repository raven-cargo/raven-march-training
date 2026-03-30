-- Create evaluations table for course feedback
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ogtulwwnerdgnsdabmcb/sql/new

CREATE TABLE IF NOT EXISTS raven_course_evaluations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text DEFAULT 'Anonymous',
  rating_instructor integer CHECK (rating_instructor BETWEEN 1 AND 5),
  rating_relevance integer CHECK (rating_relevance BETWEEN 1 AND 5),
  rating_materials integer CHECK (rating_materials BETWEEN 1 AND 5),
  instructor_comments text DEFAULT '',
  relevance_comments text DEFAULT '',
  materials_comments text DEFAULT '',
  overall_comments text DEFAULT '',
  recommend text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE raven_course_evaluations ENABLE ROW LEVEL SECURITY;

-- Students can INSERT evaluations (anyone with anon or service key)
CREATE POLICY "Anyone can submit evaluations"
  ON raven_course_evaluations
  FOR INSERT
  WITH CHECK (true);

-- Only service_role can SELECT (instructor reads via API with token)
-- No anon SELECT policy = students cannot see each other's evaluations
-- The API endpoint (evaluations.js) uses the service_role key and gates
-- reads behind RAVEN_EVAL_READ_TOKEN for instructor-only access.
