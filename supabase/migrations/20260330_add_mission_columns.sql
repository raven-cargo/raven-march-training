-- Add mission_id and mission_title columns to submissions table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/ogtulwwnerdgnsdabmcb/sql/new

ALTER TABLE raven_course_submissions
  ADD COLUMN IF NOT EXISTS mission_id text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS mission_title text DEFAULT '';
