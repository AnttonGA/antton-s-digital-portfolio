-- Add reasoning field to social_posts table
ALTER TABLE public.social_posts 
ADD COLUMN reasoning text;